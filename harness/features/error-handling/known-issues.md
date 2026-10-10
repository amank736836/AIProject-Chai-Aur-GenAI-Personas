# FEAT-012 — Known issues

| Ref | Issue | Severity | Status |
|---|---|---|---|
| BUG-010 | Malformed JSON produces an unhandled 500 (empty body) on all three routes instead of a 400 JSON error. | Medium | Open |
| BUG-011 | Whitespace-only messages pass validation and are forwarded to the provider (client-side `trim()` is the only guard). | Low | Open |
| BUG-013 | `500` payloads contain raw provider text including environment-variable names. | Medium | Open |
| BUG-012 | Persona creation hides provider failures behind `200 {success:true, tone:""}`. | High | Open |
| — | No request timeout: a stalled provider keeps the HTTP request open until the platform kills it. | Medium | Open (observation) |
| — | No error-id/log correlation; `console.error` output is the only trace (`UNKNOWN / REQUIRES VALIDATION`: log retention on Vercel). | Low | Open |
| — | No body-size limit; >50 KB payloads are accepted (TC-006). | Low | Open (DoS-ish, `RISK-002`) |
