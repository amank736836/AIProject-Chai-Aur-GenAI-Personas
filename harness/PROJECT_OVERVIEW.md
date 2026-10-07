# Project Overview — Persona LLM Chat

Source of truth: repository files at commit `d24eb41` (`README.md`, `package.json`, `src/**`, `data/**`).
Anything not derivable from the repository is explicitly marked `UNKNOWN / REQUIRES VALIDATION`.

## Purpose

"Persona LLM Chat" (`package.json` name: `next-llm-personas`, version `0.1.0`) is a Next.js single-page chat
application that lets a user talk to large-language-model personas: two built-in personalities inspired by
**Hitesh Choudhary** ("Chai aur Code") and **Piyush Garg**, a side-by-side "**HiPi**" comparison mode, and
**custom personas** created from an arbitrary name or `@handle`. Persona behaviour (tone, style, signature
phrases, links) is supplied as prompt text, not fine-tuning.

The repository also serves as a learning/portfolio demo: it is deployed publicly on Vercel and the README is
written for both end users and testers.

## Main users

| User | Goal | Evidence |
|---|---|---|
| Demo visitor / learner | Chat with the personas, compare Hitesh vs Piyush side by side, inspect the prompt used | `src/app/page.tsx`, `PromptDisplay.tsx`, README "Usage Guide" |
| Developer / maintainer | Add personas, change tone data, extend enrichment, adjust UI | README "Customization", `data/*.json`, `src/lib/*` |
| Tester / AI agent | Exercise deterministic flows without provider keys; verify API contracts | this harness |
| Future contributor of a custom persona | Type a name/`@handle` and get an enriched persona | `src/app/api/create-persona/route.ts` |

There is **no end-user account model**: no signup, no login, no roles. Everything is anonymous and per-browser.

## Main workflows

1. **Built-in chat (Hitesh / Piyush / HiPi)** — user opens `/`, picks a persona, types a message; the browser
   POSTs `/api/chat`; the server builds a prompt from `data/<persona>-tone.json`, calls Groq (with Gemini as
   fallback) and returns replies plus an updated `chatHistory-<persona>` cookie.
2. **Custom persona creation** — user picks "Custom", enters a name or `@handle`, clicks *Create Persona*;
   `/api/create-persona` optionally scrapes public profile meta descriptions, asks the LLM to describe the
   person's tone, and stores `personaData-<slug>` in a cookie; `/api/fetch-image` supplies an avatar.
3. **Custom persona chat** — `/api/chat` with `persona: "<slug>"`; the prompt is expected to use the stored
   tone (currently dropped, see `BUG-006`/`BUG-007`).
4. **Prompt inspection** — the UI renders the exact prompt sent to the model (currently never populated,
   `BUG-004`).
5. **History handling** — chat is kept in React state, mirrored to a `chatHistory` browser cookie, and the
   server returns history in `chatHistory-<persona>`; on unload the page beacons `/api/clear-history`
   (endpoint does not exist, `BUG-001`).

## Technology stack

| Layer | Technology | Version / evidence |
|---|---|---|
| Framework | Next.js App Router (React Server Components + route handlers) | `next@15.4.10` (`package.json`, `package-lock.json`) |
| UI library | React | `react@19.1.0`, `react-dom@19.1.0` |
| Language | TypeScript (mixed with JavaScript modules) | `typescript@^5`, `tsconfig.json` `strict: true`, `allowJs: true` |
| Styling | Tailwind CSS v4 via PostCSS plugin + hand-written CSS animations | `tailwindcss@^4`, `@tailwindcss/postcss@^4`, `src/app/globals.css` (246 lines) |
| LLM SDK | Vercel AI SDK v5 (`generateText`) | `ai@^5.0.14` |
| LLM providers | Groq `llama-3.3-70b-versatile` (primary), Google `gemini-1.5-flash` (fallback) | `src/lib/llm.js` |
| Linting | ESLint 9 flat config, `next/core-web-vitals` + `next/typescript` | `eslint.config.mjs` |
| Fonts | `next/font/google` (Geist, Geist Mono) | `src/app/layout.tsx` |
| Hosting | Vercel (3 demo URLs in README) / any serverless host | README "Deployment" |

## Frontend

* Single route: `/` (`src/app/page.tsx`, 362 lines, `"use client"`). All chat state lives in React hooks.
* Components (`src/app/components/`): `PersonaSelector.tsx` (4 persona buttons, remote avatar URLs),
  `ChatArea.tsx` (message list, thinking dots, link rendering, scroll buttons), `MessageInput.tsx`
  (input + Send, Enter-to-send, disabled while thinking), `CustomPersonaInput.tsx` (name/`@handle` form),
  `PromptDisplay.tsx` (collapsible "Prompt sent to AI"), `CookieManager.ts` (cookie read/write helpers).
* Styling: glassmorphism, animated gradient blobs, floating/typing animations in `globals.css`; responsive
  Tailwind utility classes; dark-mode variants present.
* Accessibility present: `aria-expanded` on the prompt toggle, `aria-hidden` on decorative dots,
  `focus-visible:ring-*` on persona buttons, `alt` text on avatars, `title` on icon buttons.
* No routing beyond `/`, no state library, no service worker, no i18n framework.

## Backend

Three Next.js route handlers (Node runtime, serverless-friendly):

| Route | Method | Purpose | Source |
|---|---|---|---|
| `/api/chat` | POST | Build persona prompt, call LLM, return replies + history cookie | `src/app/api/chat/route.ts` (191 lines) |
| `/api/create-persona` | POST | Enrich `@handle` via public profiles, generate tone text, store in cookie | `src/app/api/create-persona/route.ts` (81 lines) |
| `/api/fetch-image` | POST | Resolve an avatar URL (Unsplash → ui-avatars fallback) | `src/app/api/fetch-image/route.ts` (59 lines) |
| `/api/clear-history` | — | **Not implemented**; the client beacons it on unload → 404 | referenced in `src/app/page.tsx:136` |

Server-side libraries: `src/lib/llm.js` (provider calls + rate-limit detection + fallback) and
`src/lib/prompt.js` (prompt construction, tone loading, link instructions, random signature selection).

## Database

**None.** There is no database, ORM, migration or server-side persistence. The README states this explicitly
("No file writes on the backend; all storage is client-side"). Consequences:

* all durable state lives in browser cookies (`chatHistory`, `chatHistory-<persona>`, `personaData`,
  `personaData-<slug>`) → ~4 KB per cookie limit applies;
* the server is fully stateless → horizontal scaling is trivial, but chat context disappears if cookies are
  cleared or the browser rejects the payload.

Database tests therefore do not exist; see [`test-scenarios/database.md`](test-scenarios/database.md) for the
substitute checks (cookie/storage validation).

## External services

| Service | Used for | Notes |
|---|---|---|
| Groq API (`api.groq.com`) | Primary LLM (`llama-3.3-70b-versatile`) | requires `GROQ_API_KEY` (name confirmed by the runtime error message) |
| Google Gemini API | Fallback LLM (`gemini-1.5-flash`) when Groq is rate-limited | key name `GOOGLE_GENERATIVE_AI_API_KEY` is **INFERRED** from `@ai-sdk/google` conventions — `UNKNOWN / REQUIRES VALIDATION` |
| `source.unsplash.com` | Primary avatar source (HEAD probe) | retired by Unsplash in 2024 (see `BUG-018`) |
| `ui-avatars.com` | Avatar fallback (initials + random colour/font) | works without a key |
| Instagram / YouTube / Twitter / X / GitHub / Facebook / Hashnode / Medium / Peerlist / Reddit | `@handle` enrichment (GET + `<meta name="description">` parse) | only when a custom persona starts with `@` |
| Google Fonts | Geist / Geist Mono via `next/font/google` | fetched at build time — required network access (`KI-003`) |

## Authentication & authorization

* **None.** No login, no sessions, no tokens, no roles, no ownership checks on cookies.
* All three API routes are anonymous, unauthenticated and unthrottled (`RISK-001`, `RISK-002`); the only
  guard is a "field must be present" check returning HTTP 400.
* Cookies written by the server are `HttpOnly; SameSite=Lax; Path=/; Max-Age=2592000` but are **not**
  `Secure`-flag marked at the app level. Cookies written by the browser (`chatHistory`, `personaData`) are
  deliberately readable by JavaScript.
* Provider keys stay server-side; no key is exposed to the client bundle (verified by `TC-069` secret scan).

## APIs

All endpoints accept and return JSON with `Content-Type: application/json`.

| Endpoint | Request | Success | Errors observed/handled |
|---|---|---|---|
| `POST /api/chat` | `{message, persona?, customName?, debugPrompt?}` | `200 {hitesh?, piyush?, custom?, history}` + `Set-Cookie` | `400 {"error":"Message required"}`; `429 {error, rateLimit:true}` on provider rate limit; `500 {error}` for provider failures |
| `POST /api/create-persona` | `{name, ...rest}` | `200 {success:true, tone}` + `Set-Cookie personaData-<slug>` | `400 {"error":"Name required"}`; provider failure is swallowed and still returns `200` with `tone:""` (`BUG-012`) |
| `POST /api/fetch-image` | `{name}` | `200 {image}` | `400 {"error":"Name required"}`; 500 on malformed JSON (`BUG-010`) |
| `GET /api/chat` | — | — | `405` (Next.js method guard) |

Full field-level detail: [`ARCHITECTURE.md`](ARCHITECTURE.md).

## Important modules & business logic

| Module | Responsibility | Risk notes |
|---|---|---|
| `src/lib/prompt.js` | Reads `data/<persona>-tone.json`, merges both personas in HiPi mode, serialises history, injects link instructions, avoids repeating signature lines | custom-persona tone only honoured as an object with `systemPrompt` (`BUG-006`); `@handle` cookie key mismatch (`BUG-007`) |
| `src/lib/llm.js` | `generateText` against Groq, fallback to Gemini on rate-limit-style errors | error classification is string-matching (fragile); other failures rethrow |
| `src/app/api/chat/route.ts` | Persona routing, history cookie read/write, working-link verification, error mapping | history cookie regex uses an unescaped cookie name (`BUG-016`); dead link-verification branch (`BUG-009`) |
| `src/app/api/create-persona/route.ts` | Public-profile scraping + tone generation + cookie storage | silently swallows LLM errors (`BUG-012`); unsanitised cookie name (`BUG-015`) |
| `src/app/components/CookieManager.ts` | Client cookie helpers | write/read formats do not match (`BUG-002`); `btoa` breaks on non-Latin1 text (`BUG-003`) |
| `src/app/page.tsx` | Orchestrates state, persona switching, message sending, error rendering | prompt-transparency contract not fulfilled (`BUG-004`) |
| `data/hitesh-tone.json`, `data/piyush-tone.json` | Persona source data: `systemPrompt`, `signature_phrases`, `links`, language markers | never served to the browser (`BUG-005`) |

## Deployment architecture

* **Target:** Vercel (README lists `persona-genai.vercel.app`, `personas-amank736836.vercel.app`,
  `amank736836-personas.vercel.app`); any serverless Node host works because there are no file writes.
* **Build:** `npm run build` (`next build`) — needs network access for Google Fonts; verified as BLOCKED in the
  offline sandbox (`KI-003`).
* **Runtime:** `npm run start` (production) or `next dev --turbopack` (local, used by this harness).
* **Config:** `next.config.ts` is the default export with **no** custom options — no headers, no redirects, no
  image domains, no CSP (`RISK-003`).
* **CI/CD:** none in the repository (no `.github/workflows`). Two Dependabot/security PRs exist upstream
  (PR #1 dependency bump — open; PR #2 RSC CVE fix — merged).

## Environments

| Environment | URL | Notes |
|---|---|---|
| Local dev | `http://localhost:3000` (`npm run dev -- -H 0.0.0.0`) | used for all executable tests in this harness |
| Production | 3 Vercel URLs from the README | **NOT_EXECUTED** — no deployment from this harness; provider keys are configured there (values unknown) |
| Preview | Vercel per-PR previews (assumed from the platform) | `UNKNOWN / REQUIRES VALIDATION` |

## Known dependencies

* Node.js 18+ (README) — harness executed on **Node v22.22.3 / npm 10.9.8**.
* Internet access for: provider calls, `@handle` enrichment, avatar resolution, Google Fonts at build time.
* Provider credentials: `GROQ_API_KEY` (required) and the Gemini fallback key name
  (`GOOGLE_GENERATIVE_AI_API_KEY` — INFERRED). Neither is committed; `.gitignore` excludes `.env*`.
* Runtime dependencies pinned by `package-lock.json`: `next@15.4.10`, `sharp@0.34.3`, `postcss@8.4.31` etc.
  (see `NFR-013` — 10 production advisories incl. 1 critical are open, fix available in `next@15.5.27`).

## What this project is *not*

Confirmed absent from the repository (so it must not be assumed by tests):

* No database, ORM, migrations or file-based storage.
* No authentication/authorisation, no user accounts, no admin area.
* No streaming responses (the LLM reply is awaited in full before responding).
* No analytics, no logging framework, no error-tracking integration.
* No automated tests, no test framework, no CI pipeline, no Docker/Kubernetes manifests.
* No `/api/clear-history` route despite the client calling it.
