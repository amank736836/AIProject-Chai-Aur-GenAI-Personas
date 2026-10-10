# Regression scenarios

Existing behaviour that a change could break. These are the cases to re-run after every modification to
`src/lib/prompt.js`, the route handlers, cookie handling or `next.config.ts`/dependencies.

| SCN | What must not regress | Cases | Automated? | Status |
|---|---|---|---|---|
| SCN-095 | Cookie formats: `personaData-*` readable, `chatHistory-*` written with the documented flags, legacy client format still parsed as it is today. | TC-058, TC-062, TC-018 | yes (unit + API) | PASS |
| SCN-096 | Persona routing: `hitesh`/`piyush`/`both`/custom branches still map to their prompt builders and response fields. | TC-014, TC-007, TC-009 | partial | PARTIAL |
| SCN-097 | HiPi still returns two replies and keeps using two prompts. | TC-013, TC-028 | partial | BLOCKED (credentials) |
| SCN-098 | Custom persona support does not disturb built-in personas (cookie names, prompt branches). | TC-014, TC-027 | yes | PASS |
| SCN-099 | Persona tone files keep driving the prompt (systemPrompt, links, signature lines). | TC-027, TC-030, TC-036 | yes | PASS |
| SCN-100 | Error mapping stays stable: 400 validation, 405 method guard, 500 provider failure, JSON bodies. | TC-001, TC-004, TC-005 | yes | PARTIAL (BUG-010/013) |
| SCN-101 | Provider/SDK upgrades do not break the fallback logic or the `generateText` call signature. | TC-005, TC-009 | partial | PARTIAL |
| SCN-102 | Build & quality gates (lint, typecheck, `next build`) stay green, and dependency advisories do not grow. | TC-076, TC-077, TC-078, TC-072 | yes (except build) | FAIL (build BLOCKED offline, BUG-017) |

## Regression test additions from findings

| Finding | Regression case added |
|---|---|
| BUG-001 missing route | TC-054 (`automation/api/app-endpoints.api.test.mjs`) |
| BUG-002/BUG-003 cookie persistence | TC-056, TC-057 (`automation/utilities/cookie-manager.test.mjs`) |
| BUG-005 tone JSON not served | TC-043 (`automation/ui/ssr-smoke.test.mjs`) |
| BUG-006/BUG-007 custom tone handling | TC-032, TC-033 (`automation/utilities/prompt-builder.test.mjs`) |
| BUG-010 invalid JSON handling | TC-002, TC-016, TC-024 (`automation/api/*.test.mjs`) |
| BUG-011 whitespace validation | TC-003 |
| BUG-012 silent persona-creation failure | TC-017 |
| BUG-013 provider text leak | TC-005, TC-068 |
| BUG-015 cookie-name injection | TC-019 |
| RISK-003 missing security headers | TC-075 |
| BUG-017 dependency advisories | TC-072 |
