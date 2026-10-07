# Security / VAPT tools

## Scope of what was actually done (RUN-2026-001)

| Activity | How | Cases | Result |
|---|---|---|---|
| Anonymous access review | unauthenticated requests to all routes | TC-064 | no auth exists (RISK-001) |
| Abuse/rate-limit check | 20 rapid requests | TC-065 | no throttling (RISK-002) |
| CORS review | `Origin` header + preflight | TC-066, TC-067 | no wildcard ACAO |
| Response-header review | `curl -si` on `/` | TC-075 | no CSP/HSTS/XCTO (RISK-003) |
| Error-disclosure review | forced provider failure | TC-068, TC-005 | provider text + env-var names leaked (BUG-013) |
| Secret scan | repo walk for `.env*`/key patterns | TC-069, TC-082 | clean |
| Injection review | cookie-name construction, regex interpolation, prompt concatenation | TC-019, TC-070, TC-071 | 2 injection surfaces (BUG-015, BUG-016), prompt-injection documented |
| Dependency review | `npm audit`, `npm audit --omit=dev` | TC-072, TC-073 | 28 advisories (10 production, 1 critical in `next@15.4.10`) — BUG-017 |
| Code review of outbound requests | SSRF surface of avatar/scraper fetches | SCN-094 | fixed host templates, unvalidated username path segment; not executed |

## Recipes

```bash
BASE=http://localhost:3000

# CORS: must not return a wildcard
curl -si -X POST $BASE/api/chat -H 'Origin: https://evil.example' -H 'Content-Type: application/json' -d '{}' | grep -i access-control
curl -si -X OPTIONS $BASE/api/chat -H 'Origin: https://evil.example' -H 'Access-Control-Request-Method: POST' | head -8

# Security headers on the app shell
curl -sI $BASE/ | grep -Ei 'content-security-policy|strict-transport|x-content-type|referrer-policy'

# Secret scan (matches the automated case)
grep -rInE 'gsk_[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{30,}' --exclude-dir={node_modules,.git,.next,harness} . || echo "no keys found"

# Dependency posture
npm audit --omit=dev            # production surface
npm audit                       # everything (includes build/dev tooling)

# Cookie-name injection surface
curl -s -X POST $BASE/api/create-persona -H 'Content-Type: application/json' -d '{"name":"x; Path=/evil"}' -D - | grep -i set-cookie
```

## Explicitly not performed

* Automated scanner runs (OWASP ZAP/Burp) — no binaries, no permission to scan the public deployments.
* Authenticated penetration testing — there is no authentication in the product.
* Fuzzing/DoS testing — would consume the owner's provider quota (the vulnerability is already documented).
* Testing the three public Vercel deployments — no authorization from the maintainer was assumed; all probes
  stayed on `localhost`.

## Reporting a security finding

Use the bug template (`../../bugs/README.md`). Reference the `SCN-08x`/`SCN-09x` scenario, attach the raw
request/response, and state the impact with a concrete attack path. Do not publish exploit details for the
public deployments outside the private issue tracker.
