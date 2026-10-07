# FEAT-004 — Known issues

| Ref | Issue | Severity | Status |
|---|---|---|---|
| BUG-006 | Tone string produced by `create-persona` is ignored by `buildPrompt` (expects `tone.systemPrompt`). **The headline custom-persona feature degrades to an empty template.** | High | Open |
| BUG-007 | `@handle` tone is never found: cookie key is `personaData-@handle`, lookup uses the stripped slug. | High | Open |
| BUG-012 | Provider failure returns `200 {success:true, tone:""}` — a hollow persona is created silently. | High | Open |
| BUG-009 | Reachability verification for custom links is unreachable code; README promise not delivered. | Medium | Open |
| BUG-015 | Cookie name derived from unsanitised input (semicolon becomes a bogus attribute). | Medium | Open |
| BUG-016 | User-controlled name is interpolated into a `RegExp` for history lookup. | Low | Open |
| KI-008 | Persona creation has a fixed 2 s "ready" delay independent of the API response. | Medium | Open |
| KI-009 | Profiles are scraped sequentially (10 requests) inline in the request; no timeout, no user-agent, ToS/rate-limit risk (`RISK-004`). | Medium | Open |
| KI-010 | Creating a persona does not validate the returned `tone`; a persona with `tone:""` looks ready. | Medium | Open |
