# FEAT-010 — Tone data & prompt building

| Field | Value |
|---|---|
| Feature | FEAT-010 — Tone data & prompt building |
| FEAT ID | FEAT-010 |
| Purpose | Turn persona data + conversation into the exact instruction text sent to the LLM; this module is what makes the two personas sound different. |
| User | Indirect — every chat user; directly usable by a developer adding personas |
| Entry Point | `src/lib/prompt.js` `buildPrompt(persona, userMessage, displayName, history, cookies, workingLinks)`; data in `data/hitesh-tone.json`, `data/piyush-tone.json` |
| Dependencies | Node `fs`/`path` (server-only), cookie map passed by the route, tone JSON schema |
| Inputs | persona key (`hitesh`/`piyush`/`both`/slug), user message, history array, parsed cookies |
| Outputs | A single prompt string (≈7.9 KB per built-in persona, ≈14 KB for HiPi) |
| Business Rules | BR-001, BR-002, BR-008, BR-009, BR-010 |
| Expected Behavior | Use `systemPrompt` from the tone JSON for built-in personas; merge both for HiPi; serialise history as `User:`/`<Persona>:`; inject exact links; forbid greeting openers; fall back to a generic template for unknown personas. |
| Error Handling | Unreadable/invalid tone JSON throws (no try/catch) → the route returns 500. Missing arrays are tolerated (`|| []`). |
| Permissions | Server-only module (uses `fs`); not importable from the browser. |
| Related APIs | Consumed by `POST /api/chat` (and conceptually by `/api/create-persona` for tone generation). |
| Related Database Tables | None — the "schema" is the JSON files in `data/` |
| Related UI | `PromptDisplay.tsx` is meant to show this output (BUG-004). |
| Existing Tests | `automation/utilities/prompt-builder.test.mjs` — TC-027 … TC-038 (15 pass, 4 documented gaps) |
| Missing Tests | Token-count limits, prompt content for `@handle` personas with working links, tone JSON schema validation. |
| Known Issues | Custom tone ignored (BUG-006), `@handle` lookup mismatch (BUG-007), dead link-verification branch (BUG-009), tone JSON not served to the browser (BUG-005), module-level random state (RISK-008). |

## Related documents
[`requirements.md`](requirements.md) · [`behavior.md`](behavior.md) · [`acceptance-criteria.md`](acceptance-criteria.md) ·
[`test-scenarios.md`](test-scenarios.md) · [`test-cases.md`](test-cases.md) · [`test-data.md`](test-data.md) · [`known-issues.md`](known-issues.md)
