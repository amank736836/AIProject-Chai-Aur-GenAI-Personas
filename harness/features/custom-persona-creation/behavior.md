# FEAT-004 — Behaviour

## Creation flow (as implemented)

1. `createCustomPersona()` guards `customName.trim()` and starts the creating state (avatar reset to `/file.svg`).
2. `POST /api/create-persona {name}`:
   * `name` missing → `400 {"error":"Name required"}`.
   * slug = `name.toLowerCase().replace(/\s+/g,"-")`; cookie `personaData-<slug>` is read; an existing non-empty
     `tone` short-circuits everything (BR-004).
   * If `name` starts with `@`: `fetchPublicProfile()` sequentially GETs 10 platform URLs, extracting
     `<meta name="description">` (or noting "profile found") into a text blob. Failures are silently ignored.
   * An LLM prompt asks for a detailed tone/personality description; the reply text becomes `tone`.
   * `Set-Cookie personaData-<slug>={name,tone,...rest}` (`HttpOnly; SameSite=Lax; Max-Age=2592000`).
3. Client immediately stores a *separate* plain cookie `personaData` (`{name}`) that nothing reads.
4. Client calls `/api/fetch-image`, HEAD-probes the candidate URL and rejects ≥500 000-byte images.
5. After a fixed 2 s `setTimeout`, `creatingPersona=false` and `customReady=true` → the chat input unlocks.

## Consumption flow (as implemented)

* `page.tsx` sends `persona = slug` and `customName` to `/api/chat`.
* `chat/route.ts` strips a leading `@`, reads the `personaData-<slug>` cookie, and calls
  `buildPrompt(personaKey, message, customName, prevHistory, cookies, workingLinks)`.
* `prompt.js` looks up `personaData-<persona>`; only an **object** `tone` with `systemPrompt`/`styleNotes`
  affects the prompt — the **string** produced by `create-persona` is dropped (BUG-006).
* For `@handle` personas the lookup key never matches the created cookie name (BUG-007).
* The "verify links" branch compares `personaKey.startsWith("@")` *after* the `@` was stripped
  (`route.ts:29-31` vs `:110`), so `workingLinks` is always `undefined` (BUG-009).

## Edge behaviour observed

* Duplicate creation for the same name reuses the stored tone (no second LLM call) — verified by TC-021.
* Empty tone (`""`) is stored anyway and makes `create-persona` return `success:true` with a hollow persona.
* Names with `;`, `=`, `*` or `.` flow into cookie names unescaped (BUG-015) and into a `RegExp` in the chat
  route (BUG-016).
