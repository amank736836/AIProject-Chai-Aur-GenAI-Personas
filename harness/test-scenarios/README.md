# Test Scenarios

A scenario is a *situation worth testing*; test cases (`../test-cases/`) are the executable instances.
Every scenario carries an id (`SCN-*`), the feature it belongs to, a type, a priority and the case ids that
cover it. Scenario status is the aggregate status of its cases in `RUN-2026-001`
(`../test-results/latest/RUN-2026-001.md`).

| File | Types covered | SCN range |
|---|---|---|
| [`smoke.md`](smoke.md) | Smoke (fast confidence checks) | SCN-001 … SCN-008 |
| [`functional.md`](functional.md) | Happy paths, alternate flows, business rules | SCN-009 … SCN-022 |
| [`negative.md`](negative.md) | Invalid/missing input, invalid state, provider failures | SCN-023 … SCN-034 |
| [`edge-cases.md`](edge-cases.md) | Boundaries, empty/NULL/zero, Unicode, large data, duplicates, concurrency | SCN-035 … SCN-046 |
| [`integration.md`](integration.md) | Frontend↔backend, backend↔external, auth→API (n/a), cookie↔API | SCN-047 … SCN-056 |
| [`api.md`](api.md) | Contract, status codes, headers, payload limits | SCN-057 … SCN-066 |
| [`ui.md`](ui.md) | Screens, states, keyboard, responsive, rendering | SCN-067 … SCN-076 |
| [`performance.md`](performance.md) | Latency, throughput, memory, large datasets | SCN-077 … SCN-082 |
| [`security.md`](security.md) | AuthN/Z, IDOR, injection, disclosure, CORS, headers, dependencies | SCN-083 … SCN-094 |
| [`regression.md`](regression.md) | Existing behaviour that changes could break | SCN-095 … SCN-102 |
| [`database.md`](database.md) | **N/A** — the project has no database (documents the substitute checks) | — |

**Priority:** P0 = core chat flow, P1 = persistence/validation/custom persona, P2 = polish, P3 = cosmetic.

**Status roll-up rules:** a scenario is `PASS` only if every covering case passed; `PARTIAL` when some cases
are BLOCKED/NOT_EXECUTED; `FAIL` when any covering case failed.

## Adding a scenario

1. Pick the file by type; take the next free `SCN-###`.
2. Write the situation, the expected outcome and the case ids that cover it.
3. If no case exists yet, add one in `../test-cases/<module>/` and link it back.
