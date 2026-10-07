# Release Readiness — RUN-2026-001

**Recommendation: NOT READY** for a wider/public release of this commit.
(Narrow caveat: the three existing Vercel demo URLs keep working as before — nothing in this run shows a
*new* runtime breakage. The blocker is the pre-existing defect set plus an unverifiable build path.)

## Scorecard

| Area | Status | Basis |
|---|---|---|
| **Critical features** | ⚠ PARTIAL | Chat UI, persona switching, validation and avatars work; **custom persona (tone), prompt transparency and history restore are broken**, and the HiPi history is asymmetric |
| **Critical bugs** | ❌ 1 open (BUG-017 dependencies) | `npm audit`: 1 critical + 4 high advisories in production deps, fix available (`next@15.5.27`); GitHub/Dependabot reports 86 alerts on the default branch (4 critical) |
| **Open high-severity bugs** | ❌ 7 | BUG-002, BUG-003, BUG-006, BUG-007, BUG-012, BUG-014, plus the critical BUG-017 |
| **Regression status** | ✅ no regression observed | 35/35 executed assertions pass; 16 known-defect TODOs are documented and pre-existing |
| **Smoke test status** | ⚠ PARTIAL | SCN-001/003/005/006/007 PASS; SCN-002 (HiPi happy path) and SCN-004 (error payload) not clean |
| **Performance status** | ⚠ PARTIAL | Deterministic paths well within budget (p95 30–72 ms; n=15); **no LLM latency, cold-start or throughput data** |
| **Security status** | ❌ FAIL | No auth/rate limiting/payload cap (RISK-001/002), no security headers (RISK-003), provider-text disclosure (BUG-013), vulnerable dependency set (BUG-017) |
| **Build/release verification** | ❌ BLOCKED | `next build` cannot run in this environment (fonts host unreachable, KI-003); `next start` never executed |
| **Test automation maturity** | ⚠ NEW | 57 automated assertions introduced by this harness; no CI wiring yet (KI-002) |

## Critical features

| Feature | State | Evidence |
|---|---|---|
| Send a message and receive a persona reply | Unverified end-to-end (no credentials); contract + prompt proven | TC-005, TC-027…TC-030 |
| HiPi side-by-side replies | Unverified; history defect known | TC-008 (blocked), BUG-014 |
| Persona switching | UI shell verified; interaction manual | TC-040 (PASS), TC-044 (not executed) |
| Custom persona creation | Broken (tone + success semantics) | BUG-006, BUG-007, BUG-012 |
| Chat persistence | Broken | BUG-002, BUG-003, BUG-008 |
| Error handling | Partially broken (validation OK; malformed JSON, disclosure) | BUG-010, BUG-013 |
| Avatars | Works (fallback path only) | TC-023, BUG-018 |

## Critical bugs / high-severity bugs

| Bug | Severity | Blocking release? |
|---|---|---|
| [BUG-017](../bugs/open/BUG-017.md) | Critical (dependency) | Yes — patch before any release |
| [BUG-002](../bugs/open/BUG-002.md), [BUG-003](../bugs/open/BUG-003.md) | High | Yes for a persistence claim; user-visible data loss |
| [BUG-006](../bugs/open/BUG-006.md), [BUG-007](../bugs/open/BUG-007.md) | High | Yes — headline custom-persona feature is non-functional |
| [BUG-012](../bugs/open/BUG-012.md) | High | Yes — success reported on failure |
| [BUG-014](../bugs/open/BUG-014.md) | High | Should fix before promoting HiPi comparisons |
| [BUG-004](../bugs/open/BUG-004.md) | Medium | Not blocking, but an advertised feature is dead |
| [BUG-001](../bugs/open/BUG-001.md), [BUG-005](../bugs/open/BUG-005.md), [BUG-010](../bugs/open/BUG-010.md), [BUG-011](../bugs/open/BUG-011.md), [BUG-013](../bugs/open/BUG-013.md), [BUG-015](../bugs/open/BUG-015.md), [BUG-016](../bugs/open/BUG-016.md), [BUG-018](../bugs/open/BUG-018.md) | Medium/Low | No (document; fix opportunistically) |

## Smoke / regression / performance / security detail

* **Smoke:** `GET /` 200 with the full app shell; validation errors 400 on all three routes; lint/typecheck/dev
  server green. The HiPi happy path cannot be exercised without credentials, so "the product answers" is
  *assumed*, not proven.
* **Regression:** no baseline exists; the suites now provide one. 35 executed assertions pass.
* **Performance:** dev-build latency only. Provider time dominates real user experience and is unmeasured.
* **Security:** see `coverage.md` § Security and `bugs/known-issues.md` § Accepted risks. The API is a public,
  unauthenticated, unthrottled LLM proxy — the main operational risk for the maintainer is quota abuse.

## Known limitations to disclose in release notes

1. Conversations live only in cookies: no cross-device continuity, ~4 KB per cookie, lost when the user clears
   site data or sends non-Latin1 text (BUG-003).
2. Custom personas are created once per browser and currently do not affect the model's style (BUG-006/007).
3. Prompt transparency is advertised but unavailable (BUG-004).
4. Avatar photos always fall back to generated initials (BUG-018).
5. Replies are not streamed; latency equals provider latency.

## Deployment risks

| Risk | Impact | Mitigation |
|---|---|---|
| `next build` unverified in this environment | A deploy could fail on font fetching if the build machine restricts `fonts.googleapis.com` | Run `npm run build` on a networked machine (TC-078), or self-host the fonts |
| Provider keys not configured (or exhausted) | All chat requests return 500/429; persona creation silently degrades | Set `GROQ_API_KEY` (+ fallback key), monitor quota, fix BUG-012/BUG-013 |
| Public API abuse | Quota/cost exhaustion by third parties | Add rate limiting + payload cap (RISK-002) |
| Dependency advisories | Known exploitable paths (RCE/DoS) | Upgrade `next` to `>=15.5.27` (BUG-017) and re-run the harness |
| No CI | Future regressions land silently | Wire `run-all.sh` into CI (KI-002) |

## Path to READY WITH RISKS (minimum work)

1. Upgrade `next` and re-run the full harness (BUG-017).
2. Fix the custom-persona chain: BUG-006, BUG-007, BUG-012 (one data-shape decision + one error contract).
3. Fix persistence: BUG-002/BUG-003 (one format decision) and BUG-001/BUG-008 (cookie-key consistency).
4. Re-run with provider credentials and record the LLM cases (TC-007…TC-013, TC-020) as PASS.
5. Run `npm run build` + `npm run start` on a networked machine (TC-078/TC-079) and repeat the smoke suite.
6. Add rate limiting + payload cap, and a CSP/headers block in `next.config.ts` (RISK-002/003).

After those six steps the remaining items are low-severity and can ship as `READY WITH RISKS`.

## Sign-off

| Role | Name | Status |
|---|---|---|
| Test author / agent | Arena.ai agent (`RUN-2026-001`) | Findings recorded, evidence attached |
| Developer | — | **pending** (no fixes applied by this harness) |
| Release owner | — | **pending** |
