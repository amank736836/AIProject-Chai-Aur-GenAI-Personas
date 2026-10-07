# FEAT-004 — Custom persona creation & `@handle` enrichment

| Field | Value |
|---|---|
| Feature | FEAT-004 — Custom persona creation & `@handle` enrichment |
| FEAT ID | FEAT-004 |
| Purpose | Let a visitor invent a persona from any name or `@handle`; the app describes that person's tone with the LLM (optionally enriched from public profiles) and reuses it for the conversation. |
| User | Demo visitor (e.g. wants to chat with their own mentor's style) |
| Entry Point | `src/app/components/CustomPersonaInput.tsx` → `page.tsx:createCustomPersona()` → `POST /api/create-persona` (`src/app/api/create-persona/route.ts`) |
| Dependencies | `src/lib/llm.js`, cookie storage (`personaData-<slug>`), `/api/fetch-image`, `src/lib/prompt.js` (tone consumption) |
| Inputs | `{name}` — free text name or `@username` |
| Outputs | `{success:true, tone}` + `Set-Cookie personaData-<slug>`; UI shows a persona card and enables chat |
| Business Rules | BR-003, BR-004, BR-007, BR-010 |
| Expected Behavior | Name → cookie slug; `@handle` → scrape public bios → LLM tone description → store tone once per browser → chat uses that tone and does not invent links. |
| Error Handling | Missing `name` → 400. Provider failure is **swallowed** and reported as `success:true, tone:""` (BUG-012). Profile scraping errors are ignored per platform (`catch {}`). |
| Permissions | None (anonymous). The server performs outbound fetches to public pages on behalf of any caller (`RISK-004`). |
| Related APIs | `POST /api/create-persona`, `POST /api/fetch-image`, `POST /api/chat` (consumes the tone) |
| Related Database Tables | None — the "record" is the `personaData-<slug>` cookie |
| Related UI | `CustomPersonaInput.tsx`, `PersonaSelector.tsx` (custom avatar), `ChatArea.tsx` (custom card), `page.tsx` 2-second ready timer |
| Existing Tests | TC-015, TC-016, TC-017, TC-018, TC-019, TC-021 (executed); TC-020 (blocked); TC-033 (unit, fails) |
| Missing Tests | End-to-end custom chat with a real provider (TC-012), enrichment content quality, persona restore after reload, persona name collision/overwrite. |
| Known Issues | Tone string ignored by the prompt builder (BUG-006), `@handle` tone key mismatch (BUG-007), silent success on provider failure (BUG-012), unsanitised cookie name (BUG-015), link verification dead code (BUG-009). |

## Related documents
[`requirements.md`](requirements.md) · [`behavior.md`](behavior.md) · [`acceptance-criteria.md`](acceptance-criteria.md) ·
[`test-scenarios.md`](test-scenarios.md) · [`test-cases.md`](test-cases.md) · [`test-data.md`](test-data.md) · [`known-issues.md`](known-issues.md)
