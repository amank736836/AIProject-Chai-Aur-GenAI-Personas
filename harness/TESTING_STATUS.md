# Testing Status

**Snapshot: 2026-10-07 · commit `d24eb41` · last run `RUN-2026-001` (`PASS` gates, 0 new failures, 18 defects
found) · recommendation: `NOT READY` for wider release — see [`reports/release-readiness.md`](reports/release-readiness.md).**

This page answers "what has been tested, and what has not?" in one screen. Numbers come from
[`test-results/latest/RUN-2026-001.md`](test-results/latest/RUN-2026-001.md) and
`node harness/automation/scripts/coverage-report.mjs`; regenerate both before quoting them elsewhere.

## 1. At a glance

| Dimension | Value |
|---|---|
| Features identified / documented | 14 / 14 |
| Requirements (REQ + NFR) / business rules | 48 / 12 |
| Test scenarios | 102 |
| Test cases | 82 — PASS 44 · FAIL 20 · BLOCKED 10 · NOT_EXECUTED 8 |
| Automated assertions | 57 (35 pass · 0 fail · 6 skipped · 16 documented TODO) |
| Bugs found | 18 — 1 Critical · 7 High · 7 Medium · 3 Low |
| Bugs fixed / verified | 0 |
| Known issues / accepted risks | KI-001…KI-014 (13 active) / RISK-001…RISK-008 |
| Manual cases outstanding | 8 browser interactions (no browser runtime in the test environment) |
| Blocked by credentials | 6 automated tests, 10 catalogue cases (no `GROQ_API_KEY` / Google key) |
| Evidence | `evidence/` — logs, API responses, performance; screenshots/videos are empty by design (no browser) |

## 2. What is verified (and how)

| Area | Status | Proof |
|---|---|---|
| App shell renders (SSR) with 5 persona labels, greeting, empty-state copy, input + submit | ✅ verified | TC-039…TC-042 (automated HTML assertions), `evidence/api-responses` |
| Validation contracts (missing/empty fields → 400 with exact message; GET → 405) on all three routes | ✅ verified | TC-001, TC-004, TC-015, TC-022, TC-024 |
| Cookie creation flags and persona-slug rules | ✅ verified | TC-018, TC-021, TC-062 |
| Prompt construction for built-in personas (exact LinkedIn URL, no greeting openers, history markers, tone data usage) | ✅ verified | TC-027…TC-031, TC-034…TC-036, TC-038 (unit, no keys needed) |
| Image fallback path returns a usable avatar URL | ✅ verified | TC-023, TC-026 |
| Quality gates: lint (0 errors), `tsc --noEmit`, dependency install | ✅ verified | `test-results/latest/raw/{lint,typecheck}.log` |
| Deterministic latency budgets (NFR-007/008) | ✅ measured | `evidence/performance/performance-latency.md` (p95 72 ms page, 30 ms validation) |
| Security posture facts: no auth, no rate limit, no CSP, CORS behaviour, no committed secrets | ✅ verified | TC-064…TC-075, TC-082 |
| Dependency vulnerability inventory | ✅ verified (and failing) | `evidence/logs/npm-audit-summary.txt` |

## 3. What is NOT verified

| Area | Why | Cases affected |
|---|---|---|
| Any real LLM reply (single persona, HiPi pair, custom persona, tone adherence, provider fallback) | no provider credentials in the test environment | TC-007…TC-013, TC-020, TC-025, TC-051 |
| Browser interactions (persona switching, prompt panel, copy links, scroll, custom-persona UI, copy button) | no browser runtime; documented as a 14-step manual checklist | TC-044…TC-053 |
| Production build + `next start` smoke | offline sandbox cannot fetch Google Fonts (KI-003) | TC-078, TC-079 |
| Cold start, memory, throughput, concurrency on a deployed host | no deployment access | SCN-079…SCN-082 |
| Public Vercel deployments | out of scope by policy (no third-party load) | — |
| Custom-persona end-to-end behaviour | broken chain (BUG-006/007/008/009/012) — verified *as broken* | TC-017, TC-021, TC-032, TC-033 |

## 4. Open defects by severity

| Severity | Ids |
|---|---|
| Critical | BUG-017 (dependency advisories; fix `next@15.5.27`) |
| High | BUG-002, BUG-003 (persistence), BUG-006, BUG-007 (custom tone), BUG-012 (silent creation failure), BUG-014 (HiPi history) |
| Medium | BUG-001, BUG-004, BUG-008, BUG-009, BUG-010, BUG-013, BUG-015 |
| Low | BUG-005, BUG-011, BUG-016, BUG-018 |

Full records: [`bugs/open/`](bugs/open/), index [`bugs/README.md`](bugs/README.md). Accepted risks and design
limitations: [`bugs/known-issues.md`](bugs/known-issues.md).

## 5. How to reproduce this snapshot

```bash
cd /home/user/AIProject-Chai-Aur-GenAI-Personas
npm install                                                     # 354 packages, no lockfile drift
npm run dev -- -H 0.0.0.0 -p 3000 &                             # wait for "Ready"
RUN_ID=RUN-2026-001 bash harness/automation/scripts/run-all.sh   # writes test-results/latest/raw/
node harness/automation/scripts/coverage-report.mjs              # regenerate the counts above
node harness/automation/scripts/check-references.mjs             # exit 0 = docs are internally consistent
```

With credentials exported, the same command unblocks the provider-dependent tests automatically (they skip only
when the key is absent). Never run `npm run build` while the dev server is alive.

## 6. Environment quirks observed (affect results)

1. Offline sandbox: `fonts.googleapis.com` unreachable → `next build` blocked (KI-003); `source.unsplash.com`
   retired → avatar fallback always used (BUG-018).
2. No browser runtime → interaction cases cannot be executed here (KI-005).
3. Building while dev-server is running replaces `.next` and breaks the server (see `automation/README.md`).
4. Node v22.22.3: `node --test <dir>` is unsupported; the scripts pass explicit globs.

## 7. What should happen next

1. **Fix → verify loop:** start with BUG-017 (one dependency bump), then the custom-persona chain
   (BUG-006/007/012), then persistence (BUG-002/003/001/008). Each fix removes a `todo` marker and needs a new
   `RUN-*`.
2. **Unblock with credentials:** one recorded run with `GROQ_API_KEY` (and the Google key) turns 10 BLOCKED cases
   into real evidence.
3. **Unblock the build:** run TC-078/TC-079 on a networked machine and record the result.
4. **Wire CI:** `run-all.sh` is CI-ready (exit codes + logs); add a workflow so regressions cannot land silently
   (KI-002).
5. **Manual UI pass:** execute the 14-step checklist and store screenshots to fill `evidence/screenshots/`.

## 8. Status vocabulary

`PASS` verified by execution · `FAIL` verified broken (always with a bug id) · `BLOCKED` cannot run in this
environment (reason mandatory) · `NOT_EXECUTED` documented but never run · `PARTIAL` some sub-checks verified ·
`UNKNOWN / REQUIRES VALIDATION` no evidence either way — never guess.
