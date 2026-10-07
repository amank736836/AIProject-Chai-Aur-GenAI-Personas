# Traceability

`Requirement → Feature → Scenario → Test Case → Automation → Result → Evidence`

Statuses are from `RUN-2026-001` (`../test-results/latest/RUN-2026-001.md`, 2026-10-07, commit `d24eb41`).
Automation column: `A` = automated (assertion exists today), `P` = planned/credential-gated, `M` = manual,
`—` = none yet. Evidence paths are relative to `harness/`.

## Functional requirements

| REQ | Feature | Scenarios | Cases | Auto | Result |
|---|---|---|---|---|---|
| REQ-001 | FEAT-001 | SCN-001 | TC-040, TC-045 | A/M | PASS (SSR) / manual pending |
| REQ-002 | FEAT-001, FEAT-004 | SCN-009, SCN-032 | TC-044, TC-051 | M | NOT_EXECUTED |
| REQ-003 | FEAT-010 | SCN-003, SCN-008 | TC-027, TC-043 | A | PASS (server) / FAIL (browser path, BUG-005) |
| REQ-004 | FEAT-004 | SCN-012 | TC-015, TC-018 | A | PASS |
| REQ-005 | FEAT-003 | SCN-011 | TC-007 | A | BLOCKED (credentials) |
| REQ-006 | FEAT-012 | SCN-005, SCN-023 | TC-001 | A | PASS |
| REQ-007 | FEAT-003 | SCN-011 | TC-009 | A | BLOCKED (credentials) |
| REQ-008 | FEAT-002, FEAT-003 | SCN-010, SCN-047 | TC-008, TC-009, TC-013 | A/P | BLOCKED (credentials) |
| REQ-009 | FEAT-011 | SCN-004, SCN-050 | TC-010, TC-025 | A | BLOCKED (credentials) |
| REQ-010 | FEAT-012, FEAT-011 | SCN-027, SCN-051 | TC-005, TC-046 | A/M | FAIL (BUG-013 leak) + manual pending |
| REQ-011 | FEAT-006 | SCN-014, SCN-049 | TC-011, TC-055, TC-056 | A | PARTIAL (write PASS, read FAIL BUG-002) |
| REQ-012 | FEAT-010 | SCN-018 | TC-035 | A | PASS |
| REQ-013 | FEAT-004 | SCN-012 | TC-017 | A | FAIL (BUG-012) |
| REQ-014 | FEAT-012 | SCN-023 | TC-015 | A | PASS |
| REQ-015 | FEAT-004 | SCN-048 | TC-020 | P | BLOCKED (network + credentials) |
| REQ-016 | FEAT-004 | SCN-038 | TC-018, TC-021 | A | PASS |
| REQ-017 | FEAT-004, FEAT-010 | SCN-022 | TC-012, TC-031, TC-032, TC-033 | A | FAIL (BUG-006, BUG-007) |
| REQ-018 | FEAT-006 | SCN-049, SCN-054 | TC-011, TC-063 | P | FAIL (read side, BUG-008) |
| REQ-019 | FEAT-004 | SCN-091 | TC-069 | A | PASS |
| REQ-020 | FEAT-005 | SCN-013, SCN-025 | TC-022, TC-023 | A | PASS |
| REQ-021 | FEAT-005 | SCN-013, SCN-055 | TC-023, TC-026 | A | PARTIAL (primary retired, BUG-018) |
| REQ-022 | FEAT-005 | SCN-052, SCN-075 | TC-025, TC-048 | P/M | BLOCKED / manual |
| REQ-023 | FEAT-007 | SCN-015, SCN-060 | TC-047 | M | FAIL (BUG-004) |
| REQ-024 | FEAT-008 | SCN-016, SCN-069 | TC-048, TC-049 | A/M | PASS (static) / manual pending |
| REQ-025 | FEAT-010 | SCN-018, SCN-059 | TC-030 | A | PASS |
| REQ-026 | FEAT-004 | SCN-022, SCN-087 | TC-012 | P | FAIL (BUG-009 dead code) |
| REQ-027 | FEAT-014 | SCN-020 | TC-045 | M | NOT_EXECUTED |
| REQ-028 | FEAT-014 | SCN-021 | TC-045 | M | NOT_EXECUTED |
| REQ-029 | FEAT-014 | SCN-006, SCN-020 | TC-041, TC-046 | A/M | PASS (SSR) / manual pending |
| REQ-030 | FEAT-009 | SCN-017, SCN-070 | TC-050 | M | NOT_EXECUTED |
| REQ-031 | FEAT-013 | SCN-019, SCN-056, SCN-062 | TC-054 | A | FAIL (BUG-001) |
| REQ-032 | FEAT-007 | SCN-068 | TC-047 | M | NOT_EXECUTED (feature dead, BUG-004) |
| REQ-033 | FEAT-003, FEAT-010 | SCN-031 | TC-034 | A | PASS |
| REQ-034 | FEAT-012 | SCN-024, SCN-062, SCN-066 | TC-002, TC-016, TC-024 | A | FAIL (BUG-010) |

## Non-functional requirements

| NFR | Scenarios | Cases | Auto | Result |
|---|---|---|---|---|
| NFR-001 serverless/stateless | SCN-091 | TC-069 | A | PASS (static) |
| NFR-002 cookie-only persistence | SCN-041 | TC-059 | A | PASS with risk (KI-004) |
| NFR-003 Node 18+ | SCN-006 | TC-080 | A | PASS (Node 22.22.3) |
| NFR-004 TypeScript strict | SCN-102 | TC-077 | A | PASS |
| NFR-005 Lint clean | SCN-102 | TC-076 | A | PASS with 13 warnings |
| NFR-006 Production build | SCN-102 | TC-078, TC-079 | A | BLOCKED (KI-003, offline fonts) |
| NFR-007 UI latency p95 < 500 ms | SCN-077 | TC-039 + perf probe | A | PASS (72 ms p95) |
| NFR-008 API latency p95 < 200 ms | SCN-078 | TC-001, TC-015 + perf probe | A | PASS (30 ms p95) |
| NFR-009 Responsive design | SCN-071, SCN-072 | TC-053 | M | NOT_EXECUTED |
| NFR-010 Accessibility | SCN-067 | TC-052 | M | PARTIAL (static review) |
| NFR-011 No secret exposure | SCN-086, SCN-091 | TC-069, TC-082 | A | PASS |
| NFR-012 Abuse resistance | SCN-083, SCN-088, SCN-089, SCN-090, SCN-092 | TC-064, TC-065, TC-066, TC-067, TC-075 | A | FAIL (RISK-001/002/003) |
| NFR-013 Dependency security | SCN-093 | TC-072, TC-073 | A | FAIL (BUG-017) |
| NFR-014 Error observability | SCN-086 | TC-005, TC-068 | A | PARTIAL (BUG-013) |

## Business rules

| BR | Feature | Guarded by | Result |
|---|---|---|---|
| BR-001 persona identity from `systemPrompt` | FEAT-010 | TC-027 | PASS |
| BR-002 HiPi merge | FEAT-002, FEAT-010 | TC-028 | PASS |
| BR-003 slug rules | FEAT-004, FEAT-006 | TC-018, TC-021 | PASS |
| BR-004 tone generated once per browser | FEAT-004 | TC-021 | PASS |
| BR-005 30-day per-persona history | FEAT-006 | TC-018 | PASS |
| BR-006 no server storage | platform | TC-069 | PASS |
| BR-007 public data only for enrichment | FEAT-004 | TC-020 | BLOCKED (network) |
| BR-008 no greeting openers | FEAT-010 | TC-035 | PASS |
| BR-009 exact links for built-ins | FEAT-010 | TC-030 | PASS |
| BR-010 verified links only for custom | FEAT-004 | TC-012 | FAIL (BUG-009) |
| BR-011 persona switch clears transcript | FEAT-001 | TC-044 | NOT_EXECUTED (manual) |
| BR-012 errors inline, no dialogs | FEAT-012, FEAT-014 | TC-046 | NOT_EXECUTED (manual) |

## Bug → regression coverage

| Bug | Regression test | Automated today |
|---|---|---|
| BUG-001 | TC-054 | yes (`todo`) |
| BUG-002 | TC-056, TC-058 | yes (`todo` + guard) |
| BUG-003 | TC-057 | yes (`todo`) |
| BUG-004 | TC-047 | no (manual/static) |
| BUG-005 | TC-043 | yes (`todo`) |
| BUG-006 | TC-032, TC-012 | yes (`todo`) + planned |
| BUG-007 | TC-033 | yes (`todo`) |
| BUG-008 | TC-063 | no (needs credentials) |
| BUG-009 | — | no (needs credentials) |
| BUG-010 | TC-002, TC-016, TC-024 | yes (`todo`) |
| BUG-011 | TC-003 | yes (`todo`) |
| BUG-012 | TC-017 | yes (`todo`) |
| BUG-013 | TC-005, TC-068 | yes (`todo`) |
| BUG-014 | TC-008, TC-013 | planned (needs credentials) |
| BUG-015 | TC-019 | yes (`todo`) |
| BUG-016 | TC-070 | partial (static) |
| BUG-017 | TC-072 | yes (baseline assertion) |
| BUG-018 | TC-026 | yes (`todo`) |

`TODO` marker meaning: the assertion is implemented but the app does not meet it yet, so the suite stays green
while the gap remains visible — see [`../automation/README.md`](../automation/README.md).
