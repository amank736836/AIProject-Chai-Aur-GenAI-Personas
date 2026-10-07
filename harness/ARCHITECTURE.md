# Architecture — Persona LLM Chat

Derived from `src/**`, `data/**`, `package.json`, `next.config.ts`, `tsconfig.json`. Line references are to
commit `d24eb41`.

## 1. System context

```text
        ┌──────────────────────────────────────────────┐
        │  Browser (single page, React 19, "use client")│
        │  /  →  page.tsx (state, fetch, cookies)       │
        │       ├─ PersonaSelector  ├─ ChatArea         │
        │       ├─ MessageInput     ├─ PromptDisplay    │
        │       └─ CookieManager (document.cookie)      │
        └───────┬───────────────────────────┬──────────┘
                │ POST /api/chat            │ POST /api/create-persona
                │ POST /api/fetch-image     │ (also: HEAD/GET to public profiles)
                ▼                           ▼
        ┌─────────────────────────────────────────────────────────────┐
        │ Next.js route handlers (Node runtime, stateless, serverless)│
        │  api/chat ──► lib/prompt.js (reads data/*.json via fs)      │
        │           └─► lib/llm.js ─► Groq ──(rate limit)──► Gemini   │
        │  api/create-persona ─► public profile scrape ─► lib/llm.js  │
        │  api/fetch-image ─► source.unsplash.com ─(fail)─► ui-avatars │
        └─────────────────────────────────────────────────────────────┘
                                 │
                    No database, no server storage
                    State = browser cookies only
```

## 2. Components

| Component | File | Responsibility | Inputs | Outputs |
|---|---|---|---|---|
| Page shell | `src/app/page.tsx` | persona/mode state, chat state, thinking state, message sending, error rendering, scroll helpers, persona creation flow, unload beacon | user events, API responses, cookies | rendered UI, `fetch` calls, cookies |
| Layout | `src/app/layout.tsx` | HTML shell, metadata (title/description), Geist fonts | children | `<html lang="en">`, font CSS variables |
| Persona selector | `src/app/components/PersonaSelector.tsx` | 4 buttons (HiPi / Hitesh / Piyush / Custom) with hover/active animations | `persona`, `setPersona`, `customImage` | click events, selection highlight |
| Chat area | `src/app/components/ChatArea.tsx` | message list, "thinking" dots, URL detection + copy/visit, scroll buttons, empty state | `chat[]`, `persona`, refs, scroll flags | rendered transcript |
| Message input | `src/app/components/MessageInput.tsx` | text input + Send, Enter-to-send, disabled while thinking/creating | `message`, `thinking`, `persona` | `sendMessage()` |
| Custom persona input | `src/app/components/CustomPersonaInput.tsx` | name/`@handle` field + *Create Persona* | `customName`, `creatingPersona` | `createCustomPersona()` |
| Prompt display | `src/app/components/PromptDisplay.tsx` | collapsible block showing the last prompt | `lastPrompt` | nullable UI block |
| Cookie manager | `src/app/components/CookieManager.ts` | `setCookie`/`getCookie`, (unused) SHA-256 helper, chat save/load | chat array | `document.cookie` writes |
| LLM client | `src/lib/llm.js` | Groq call + Gemini fallback, rate-limit detection | prompt string | reply text or throw |
| Prompt builder | `src/lib/prompt.js` | tone loading, HiPi merge, history serialisation, link instructions, random signature pick | persona, message, history, cookies, working links | prompt string |
| Persona data | `data/hitesh-tone.json`, `data/piyush-tone.json` | `systemPrompt`, `name`, `description`, `intro`, `signature_phrases`, `vocab`, `links`, `language` | — | tone config read from disk at request time |

## 3. Request flows

### 3.1 Built-in persona chat (`persona ∈ {hitesh, piyush, both}`)

1. Browser POSTs `/api/chat` `{message, persona, customName, debugPrompt:true}` (`page.tsx:219`).
2. Route reads the cookie `chatHistory-<persona>` via a regex on the raw `cookie` header (`route.ts:5-27`).
3. `buildPrompt()` reads `data/<persona>-tone.json` with `fs.readFileSync` and returns
   `systemPrompt + link instructions + history + "User: …" + direct-answer instruction`.
4. In `both` mode two prompts are built and two LLM calls run in parallel (`Promise.all`).
5. `getLLMResponse()` calls Groq `llama-3.3-70b-versatile`; if the error text matches
   `rate limit|quota|429|TPD`, it retries with Google `gemini-1.5-flash`.
6. Response: `{hitesh, piyush, history}` plus `Set-Cookie chatHistory-<persona>` (or `chatHistory-both`),
   `HttpOnly; SameSite=Lax; Max-Age=2592000`.
7. Client replaces the "thinking" placeholder with the reply and persists the transcript to the
   `chatHistory` browser cookie.

### 3.2 Custom persona creation

1. User enters a name/`@handle`; browser POSTs `/api/create-persona` `{name}` (`page.tsx:163`).
2. If `name` starts with `@`, `fetchPublicProfile()` sequentially GETs 10 platform URLs and extracts
   `<meta name="description">` into a text blob.
3. If no tone cookie exists, an "analyse this persona" prompt is sent to the LLM (same provider logic).
4. `personaData-<slug>` cookie is set (`slug = name.toLowerCase().replace(/\s+/g,"-")`).
5. Browser then POSTs `/api/fetch-image` `{name}`, probes the candidate with HEAD, rejects >500 KB, and
   falls back to `/file.svg`. A fixed 2-second `setTimeout` marks the persona "ready" (`page.tsx:184-187`).

### 3.3 Custom persona chat

1. Browser POSTs `/api/chat` with `persona = <slug of customName>` (not the literal string `custom`).
2. Route strips a leading `@`, reads the `personaData-<slug>` cookie, and appends the persona's bio-focused
   prompt; when the message looks like a link request it should offer verified platform URLs.
3. Reply is returned as `{custom, history}` and the transcript is stored under `chatHistory-<slug>`.

### 3.4 Failure paths

| Failure | Server behaviour | Client behaviour |
|---|---|---|
| Missing `message`/`name` | `400` with a JSON error | placeholder text replaced |
| Malformed JSON body | unhandled exception → `500` (`BUG-010`) | generic error placeholder |
| Provider rate-limited | `429 {error, rateLimit:true}` | message shown in both persona bubbles |
| Provider unavailable/misconfigured | `500 {error}` raw provider text (`BUG-013`) | "Sorry, something went wrong." |
| Non-JSON response | — | "Sorry, there was a problem with the response." |
| Network failure | — | "Network error." |

## 4. Data model (cookies only)

| Cookie | Written by | Flags | Payload | Purpose | Status |
|---|---|---|---|---|---|
| `chatHistory-<persona>` | server (`/api/chat`) | `HttpOnly; SameSite=Lax; Max-Age=2592000` | URL-encoded JSON array of `{role,content}` | LLM context for built-in personas | works (size-limited) |
| `chatHistory-both` | server | as above | same | HiPi context | works |
| `chatHistory-<slug>` | server | as above | same | custom persona context | written but never read back (`BUG-008`) |
| `chatHistory` | client (`CookieManager`) | none (JS-readable) | base64 JSON (writer) vs `hash\|base64` (reader) | local transcript restore | broken (`BUG-002`, `BUG-003`) |
| `personaData-<slug>` | server (`/api/create-persona`) | `HttpOnly; SameSite=Lax; Max-Age=2592000` | `{name, tone, ...rest}` | custom persona tone | written; tone ignored (`BUG-006`) |
| `personaData` | client (`page.tsx:168`) | none | `{name}` | unused legacy stub | unused |

No server-side storage, no database, no cache layer, no message queue.

## 5. API contracts (verified against `route.ts` and runtime probes)

```jsonc
// POST /api/chat
// request
{ "message": "string (required)", "persona": "hitesh|piyush|both|<slug>", "customName": "string?", "debugPrompt": true }
// 200 (built-in)                     // 200 (custom)                // 400
{ "hitesh": "…", "piyush": null,     { "custom": "…",               { "error": "Message required" }
  "history": [{ "role": "user",        "history": [...] }
               "content": "…" }] }
// 429
{ "error": "All LLM providers are currently rate-limited or overloaded. Please try again in a few minutes.", "rateLimit": true }
```

```jsonc
// POST /api/create-persona          // POST /api/fetch-image
{ "name": "string (required)", ... } { "name": "string (required)" }
// 200                               // 200
{ "success": true, "tone": "…" }     { "image": "https://…" }
// 400                                // 400
{ "error": "Name required" }          { "error": "Name required" }
```

Headers observed at runtime: no CORS header on responses, `OPTIONS` → `204` with `allow: OPTIONS, POST`,
`GET` on a POST-only route → `405`.

## 6. Deployment & configuration

* `next.config.ts` contains no options → default behaviour; no image domains, no custom headers, no rewrites.
* Route handlers run on the default Node.js runtime and use `fs.readFileSync` for tone data, which is bundled
  into the deployment (works on Vercel because the files are traced at build time).
* `data/` is **not** in `public/`, therefore the browser cannot fetch `/data/<persona>-tone.json` (`BUG-005`).
* Environment variables (server-side only): `GROQ_API_KEY` (confirmed by runtime error text),
  `GOOGLE_GENERATIVE_AI_API_KEY` (inferred for `@ai-sdk/google`; `UNKNOWN / REQUIRES VALIDATION`).
* No `.env*` file is committed (`.gitignore` block `# env files (can opt-in for committing if needed)`).

## 7. Architectural risks & observations

| ID | Observation | Impact |
|---|---|---|
| RISK-001 | All API routes are anonymous | anyone can spend the owner's LLM quota |
| RISK-002 | No rate limiting or abuse protection | quota exhaustion / DoS on the provider account |
| RISK-003 | No security headers configured (no CSP/HSTS/X-Content-Type-Options) | reduced browser-side hardening |
| RISK-004 | Public profile scraping (10 sequential GETs) runs inline in the request | slow creation, possibly blocked/ToS-sensitive |
| RISK-005 | `fs.readFileSync` per request for tone data | small but avoidable per-request I/O on serverless |
| RISK-006 | Cookie-only persistence with a ~4 KB limit | long conversations silently lose context |
| RISK-007 | Two critical Next.js advisories + 4 high production advisories (see `BUG-017`) | patching required before production |
| RISK-008 | Random signature selection uses module-level mutable state | not concurrency-safe across concurrent requests in a long-lived process |
