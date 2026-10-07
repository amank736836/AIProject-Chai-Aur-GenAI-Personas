# Security / VAPT scenarios

Scope: the app's own surface. No penetration test against third parties, no fuzzing infrastructure, no
deployment-level access. Findings are tracked as `BUG-*`, accepted posture items as `RISK-*`
([`../bugs/known-issues.md`](../bugs/known-issues.md)).

| SCN | Scenario | Class | Cases | Status |
|---|---|---|---|---|
| SCN-083 | Authentication: every API route is anonymously reachable and there is no login to bypass. | AuthN | TC-064 | PASS (documents RISK-001) |
| SCN-084 | Authorization/IDOR: no ownership model exists — a caller only ever reads/writes their own cookies. Persona slug collisions could let one persona's cookie shadow another's (local only). | AuthZ/IDOR | TC-064, TC-021 | PASS with observation |
| SCN-085 | Cookie & token handling: server cookies are `HttpOnly`/`SameSite=Lax` but not `Secure`; client cookies are JS-readable by design; no tokens exist. | Session | TC-074, TC-055 | PASS with observation |
| SCN-086 | Sensitive data exposure: 500 bodies leak provider error text including env-var names (`BUG-013`); no stack traces observed; no secrets in the repo or client bundle. | Disclosure | TC-068, TC-069 | FAIL (BUG-013) |
| SCN-087 | Injection: prompt injection from user text is unfiltered (LLM-level); persona names reach cookie names (`BUG-015`) and a `RegExp` (`BUG-016`); React escapes rendered text (no XSS observed). | Injection | TC-071, TC-019, TC-070 | PARTIAL |
| SCN-088 | Input validation: only a truthiness check for `message`/`name`; malformed JSON and whitespace-only payloads are mishandled (`BUG-010`, `BUG-011`). | Validation | TC-002, TC-003 | FAIL |
| SCN-089 | CORS: no `Access-Control-Allow-Origin` is returned, so browsers block cross-origin reads/writes. | CORS | TC-066, TC-067 | PASS |
| SCN-090 | CSP/security headers: none configured (`next.config.ts` is empty) → no CSP, HSTS, X-Content-Type-Options, Referrer-Policy. | Headers | TC-075 | FAIL (RISK-003) |
| SCN-091 | Secrets management: `.env*` ignored, no keys in the tree, keys used server-side only. | Secrets | TC-069, TC-082 | PASS |
| SCN-092 | API abuse: no rate limiting, no auth, no payload cap → quota exhaustion and DoS on the owner's provider account. | Abuse/DoS | TC-065, TC-064, TC-006 | FAIL (RISK-001/002) |
| SCN-093 | Vulnerable dependencies: `npm audit` → 28 advisories (1 critical in production `next@15.4.10`), fix available in `next@15.5.27`. | Supply chain | TC-072, TC-073 | FAIL (BUG-017) |
| SCN-094 | Server-side request forgery surface: user input builds outbound URLs for avatar resolution and 10 profile scrapes (fixed host templates, unvalidated `username` inserted into the path). | SSRF | TC-070 | NOT_EXECUTED (code review only) |
