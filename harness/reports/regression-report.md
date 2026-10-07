# Regression Report — RUN-2026-001

Scope: which existing behaviour is protected by tests, which protection actually ran, and what a change could
break without any test noticing.

## Regression suite status

| Scenario family | Guarded by | Ran in RUN-2026-001 | Result |
|---|---|---|---|
| Cookie formats & flags | TC-058, TC-062, TC-018 | yes (unit + API) | PASS (the broken format is itself asserted — TC-058) |
| Persona routing (hitesh/piyush/both/custom) | TC-014, TC-027, TC-034 | yes | PASS (prompt + deterministic API parts) |
| HiPi two-reply behaviour | TC-008, TC-013 | no — credentials | BLOCKED |
| Custom persona isolation from built-ins | TC-014, TC-027 | yes | PASS |
| Tone data drives prompts | TC-027, TC-030, TC-035, TC-036 | yes | PASS |
| Cookie tone handling (object/string/@handle) | TC-031, TC-032, TC-033 | yes | 1 PASS, 2 FAIL (BUG-006/007) |
| Error mapping (400/405/500) | TC-001, TC-004, TC-005 | yes | PASS, PASS, FAIL (BUG-013 leak) |
| Prompt-injection surface documented | TC-037, TC-071 | yes | PASS (documentation guard) |
| Link markup safety (`rel=noopener`) | TC-049 | yes (static) | PASS |
| Build & quality gates | TC-076, TC-077, TC-080, TC-081 | yes | lint PASS (13 warnings), tsc PASS, dev server PASS, install PASS |
| Production build/start | TC-078, TC-079 | no | BLOCKED (KI-003) |
| Dependency advisories | TC-072, TC-073 | yes | FAIL (BUG-017) |

## Changes most likely to break something (and the tests to re-run)

| Area of change | Risk | Re-run |
|---|---|---|
| `src/lib/prompt.js` (prompt text, tone keys, history format) | Every persona's voice and any history context changes silently | `node --test "harness/automation/utilities/*.test.mjs"` (TC-027…TC-038) |
| Cookie names/flags in the route handlers | Client↔server history and persona tone break (already fragile — BUG-002/007/008) | TC-018, TC-056…TC-063, TC-054 |
| `src/app/api/chat/route.ts` persona branches | Response shape per mode; error mapping | full `api` suite (TC-001…TC-014) |
| `src/app/api/create-persona/route.ts` | Cookie naming, tone reuse, silent-failure behaviour | TC-015…TC-021 |
| `src/app/components/CookieManager.ts` | All client persistence | TC-055…TC-062 |
| `src/app/page.tsx` (state machine, request body) | Persona switching, prompt display contract, unload beacon | TC-039…TC-053 (SSR + manual), TC-054 |
| `src/app/layout.tsx` / fonts | Production build | TC-078 (needs network) |
| `package.json` / lockfile | Fallback logic, build, advisories | TC-005, TC-072, TC-078, TC-081 |
| `data/*-tone.json` | Persona voice + link instructions | TC-027, TC-030, TC-035 |

## Bugs found by this run that need a regression test added with the fix

| Bug | Regression test status |
|---|---|
| BUG-014 (HiPi history asymmetry) | case documented (TC-008/TC-013) but needs credentials to run |
| BUG-009 (dead link-verification branch) | needs credentials + network; documented as PLANNED |
| BUG-004 (prompt transparency) | TC-047 manual/static; automate once `prompt` is returned |
| BUG-016 (regex interpolation) | static guard only (TC-070); would be fully covered by a route-level unit test with a stubbed provider — future work |
| BUG-008 (custom history read) | needs credentials; static proof recorded |

## Verdict

Existing behaviour is protected for everything that runs without credentials (cookie formats, prompt
construction, validation, error mapping, SSR surface, quality gates). The unprotected areas are exactly the ones
with the highest defect density today: provider-dependent reply flows and the custom-persona pipeline. **No
regression has been observed in behaviour that was previously working** — this is the first run, so there is no
baseline to compare against.
