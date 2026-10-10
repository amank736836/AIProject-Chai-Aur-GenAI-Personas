# Functional Requirements

Reverse-engineered from the codebase at commit `d24eb41`. `Source` cites the implementation that proves the
requirement exists; `Status` is derived from [`../reports/coverage.md`](../reports/coverage.md).

## Persona selection & modes

| ID | Requirement | Source | Feature | Status |
|---|---|---|---|---|
| REQ-001 | The app serves a single chat page at `/` with four selectable modes — HiPi (both), Hitesh, Piyush, Custom — and starts in **HiPi** mode. | `src/app/page.tsx` (`useState<'both'…>('both')`), `PersonaSelector.tsx` | FEAT-001 | COVERED |
| REQ-002 | Selecting a persona resets the visible chat transcript; Custom input is disabled until the persona is created/ready. | `page.tsx` `setPersona()` → `setChat([])`; `MessageInput.tsx` `disabled` | FEAT-001, FEAT-004 | PARTIAL |
| REQ-003 | Built-in persona tone/style data is read from `data/<persona>-tone.json` on the server. | `src/lib/prompt.js` (`fs.readFileSync(process.cwd()/data/…)`) | FEAT-010 | COVERED |
| REQ-004 | A custom persona is addressable by free-text name or `@handle`. | `CustomPersonaInput.tsx` placeholder, `create-persona/route.ts` | FEAT-004 | COVERED |

## Chat

| ID | Requirement | Source | Feature | Status |
|---|---|---|---|---|
| REQ-005 | `POST /api/chat` accepts `{message, persona, customName}` and answers with the persona reply/replies plus the updated history. | `api/chat/route.ts` | FEAT-003 | BLOCKED (credentials) |
| REQ-006 | A request without a `message` is rejected with `400 {"error":"Message required"}` before any LLM call. | `chat/route.ts:33-35` | FEAT-012 | COVERED |
| REQ-007 | When `persona` is omitted it defaults to `hitesh`. | `chat/route.ts:31` (`= "hitesh"`) | FEAT-003 | PARTIAL |
| REQ-008 | `persona=both` returns both `hitesh` and `piyush` replies; `hitesh`/`piyush` return only their own (the other is `null`). | `chat/route.ts:48-91` | FEAT-002, FEAT-003 | BLOCKED (credentials) |
| REQ-009 | Replies are generated with Groq `llama-3.3-70b-versatile`; when the Groq error looks like a rate limit/quota/429/TPD, the call is transparently retried with Google `gemini-1.5-flash`. | `src/lib/llm.js:4-31` | FEAT-011 | BLOCKED (credentials) |
| REQ-010 | Provider failure/rate-limit is reported to the caller as JSON (`429 + rateLimit:true`, otherwise `500`) and rendered inside the chat transcript rather than as a browser alert. | `chat/route.ts:163-189`, `page.tsx` error branches | FEAT-012 | PARTIAL (500 path verified) |
| REQ-011 | Built-in persona conversations persist in a `chatHistory-<persona>` cookie (and `chatHistory-both` for HiPi) with `HttpOnly; SameSite=Lax; Max-Age=2592000`, and are replayed as prompt context. | `chat/route.ts:79-91,146-160` | FEAT-006 | PARTIAL |
| REQ-012 | Every prompt ends with an instruction to answer directly, in the persona's tone, **without** starting with a greeting. | `src/lib/prompt.js` (both `systemPrompt` and generic branches) | FEAT-010 | COVERED |

## Custom persona creation & enrichment

| ID | Requirement | Source | Feature | Status |
|---|---|---|---|---|
| REQ-013 | `POST /api/create-persona` accepts `{name}` and returns `{success:true, tone}`. | `create-persona/route.ts:36-79` | FEAT-004 | PARTIAL (bug BUG-012) |
| REQ-014 | A request without `name` is rejected with `400 {"error":"Name required"}`. | `create-persona/route.ts:38-39` | FEAT-012 | COVERED |
| REQ-015 | When `name` starts with `@`, ten public profile URLs (Instagram, YouTube, Twitter, X, GitHub, Facebook, Hashnode, Medium, Peerlist, Reddit) are fetched and their `<meta name="description">` is appended to the persona-analysis prompt. | `create-persona/route.ts:4-33` | FEAT-004 | BLOCKED (network+credentials) |
| REQ-016 | The generated tone is stored in the cookie `personaData-<slug>` and re-used on later calls, so a persona is described once per browser. | `create-persona/route.ts:44-79` | FEAT-004 | PARTIAL |
| REQ-017 | Chatting with a custom persona must use its stored tone as the persona style. | intended by `prompt.js` `getCookiePersonaTone()` | FEAT-004, FEAT-010 | FAIL (BUG-006, BUG-007) |
| REQ-018 | Custom persona conversations persist in `chatHistory-<slug>` and are replayed as context. | `chat/route.ts:158-160` (write), `5-25` (read) | FEAT-006 | FAIL (BUG-008 read-side) |
| REQ-019 | The backend keeps no user state: no database, no file writes, all persistence in cookies. | README "Deployment", no `fs.writeFile` anywhere | FEAT-004 | COVERED |

## Avatar images

| ID | Requirement | Source | Feature | Status |
|---|---|---|---|---|
| REQ-020 | `POST /api/fetch-image` accepts `{name}` and returns `{image}`; missing `name` → `400 {"error":"Name required"}`. | `fetch-image/route.ts` | FEAT-005 | COVERED |
| REQ-021 | Avatar resolution tries `https://source.unsplash.com/128x128/?face,portrait,person,<name>` first and falls back to a randomised `ui-avatars.com` URL when it fails or 404-redirects. | `fetch-image/route.ts:7-57` | FEAT-005 | PARTIAL (BUG-018: primary retired) |
| REQ-022 | The browser falls back to `/file.svg` if the avatar fails to load or the HEAD probe reports ≥500 000 bytes. | `page.tsx:170-186`, `PersonaSelector.tsx` `onError` | FEAT-005 | PARTIAL (manual only) |

## Prompt transparency

| ID | Requirement | Source | Feature | Status |
|---|---|---|---|---|
| REQ-023 | The UI shows the exact prompt sent to the model in a collapsible "Prompt sent to AI" panel; the client requests it with `debugPrompt:true`. | `PromptDisplay.tsx`, `page.tsx:219,241` | FEAT-007 | FAIL (BUG-004) |
| REQ-032 | The prompt panel can be collapsed/expanded with `aria-expanded` reflecting state. | `PromptDisplay.tsx` | FEAT-007 | NOT_EXECUTED (manual) |

## Links in replies

| ID | Requirement | Source | Feature | Status |
|---|---|---|---|---|
| REQ-024 | URLs in replies render as clickable links plus a copy button ("Copied!") and a "Visit" button; external links use `target="_blank"` with `rel="noopener noreferrer"`. | `ChatArea.tsx` (`renderTextWithLinks`, `CopyableLink`, `VisitButton`) | FEAT-008 | PARTIAL |
| REQ-025 | For built-in personas, every entry of `links` in the tone JSON becomes an instruction to answer with the exact URL when the user asks for that platform. | `prompt.js` `getLinkInstructions()` | FEAT-010 | COVERED |
| REQ-026 | For custom personas only links verified as reachable may be offered (README claim "only working/authentic links"). | `chat/route.ts:110-138` | FEAT-004 | FAIL (BUG-009: branch unreachable) |

## Interaction & UX

| ID | Requirement | Source | Feature | Status |
|---|---|---|---|---|
| REQ-027 | While a request is in flight the input and Send button are disabled and the button shows a waiting state. | `MessageInput.tsx` | FEAT-014 | NOT_EXECUTED (manual) |
| REQ-028 | Pressing Enter (without Shift) sends the message when the request is not already running. | `MessageInput.tsx` `onKeyDown` | FEAT-014 | NOT_EXECUTED (manual) |
| REQ-029 | The chat area shows "Start the conversation!" when empty and per-persona animated "is thinking…" indicators while waiting; messages scroll into view as they arrive. | `ChatArea.tsx`, `page.tsx:120-131` | FEAT-014 | PARTIAL (SSR verified) |
| REQ-030 | Scroll helpers (scroll up, scroll down, jump to latest) appear based on the chat scroll position and move the container by 200 px. | `page.tsx` `useScrollHelpers()`, `ChatArea.tsx` | FEAT-009 | NOT_EXECUTED (manual) |
| REQ-031 | On page unload the client sends a `navigator.sendBeacon('/api/clear-history', {persona:"all"})` so the transcript is cleared. | `page.tsx:134-153` | FEAT-013 | FAIL (BUG-001: route missing) |
| REQ-033 | A persona value that is neither `hitesh`/`piyush`/`both` nor a known custom slug must not crash the request; it falls back to the generic persona template. | `prompt.js` last branch | FEAT-003 | COVERED |
| REQ-034 | An API request with a malformed JSON body must produce a 4xx JSON error, not an unhandled 5xx. | not implemented | FEAT-012 | FAIL (BUG-010) |
