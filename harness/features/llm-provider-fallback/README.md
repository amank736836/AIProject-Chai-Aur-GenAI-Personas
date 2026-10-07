# FEAT-011 — LLM providers & fallback

*Documentation depth: condensed (README + test-cases).*

| Field | Value |
|---|---|
| Feature | FEAT-011 — LLM providers & fallback |
| Purpose | Produce the persona replies, staying available when the primary provider is throttled. |
| User | Every chat user (invisible unless it fails) |
| Entry Point | `src/lib/llm.js` `getLLMResponse(prompt)` |
| Dependencies | `ai@^5` (`generateText`), `@ai-sdk/groq` (`llama-3.3-70b-versatile`), `@ai-sdk/google` (`gemini-1.5-flash`), env vars `GROQ_API_KEY`, `GOOGLE_GENERATIVE_AI_API_KEY` (inferred) |
| Inputs | Prompt string |
| Outputs | Reply text; throws `"All LLM providers failed: …"` / the original error |
| Business Rules | — (availability rule implied by README "Groq (Llama-3) and Google Gemini (fallback)") |
| Expected Behavior | Try Groq; if the error looks like a rate limit/quota/429/TPD, retry once with Gemini; otherwise rethrow. |
| Error Handling | `isRateLimitError()` string-matches the error message. Non-matching errors (missing key, network) are rethrown immediately → `500` (this is exactly what happens without credentials: observed `"Groq API key is missing…"`). |
| Permissions | Server-side only; keys never reach the browser. |
| Related APIs | `/api/chat`, `/api/create-persona` |
| Related Database Tables | None — the project has no database ([database scenarios](../../test-scenarios/database.md)) |
| Related UI | Indirect (`page.tsx` error placeholders) |
| Existing Tests | TC-005 (executed, provider-down path), TC-010/TC-025 (blocked) |
| Missing Tests | Real fallback trigger (needs a throttled Groq key), Gemini-only configuration, timeout behaviour, token-limit handling for 14 KB HiPi prompts. |
| Known Issues | Error classification by substring is brittle (a Gemini-side `429` arriving during the fallback is wrapped as "All LLM providers failed" → `500` instead of `429`, because the outer classifier does not re-check the wrapped message). No timeout/abort, no retry count, no cost/latency telemetry. |

**Requirement status:** REQ-009 BLOCKED (no credentials in the test environment).

**Verification performed instead:** the whole provider-down path was exercised (TC-005) — proving the
request fails fast and deterministically when keys are absent, which is the precondition for every other
provider test.
