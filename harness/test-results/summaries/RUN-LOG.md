# Run Log

One row per recorded execution, oldest first. Details live in the run record; raw output in
`../latest/raw/` (latest) or `../historical/` (older runs).

| Run | Date (UTC) | Commit | Environment | Automated | Passed | Failed | Skipped | TODO | Catalogue cases (PASS/FAIL/BLOCKED/NOT_EXECUTED) | Headline | Record |
|---|---|---|---|---|---|---|---|---|---|---|---|
| RUN-2026-001 | 2026-10-07 | `d24eb41` | Linux sandbox, Node 22.22.3, `next dev` :3000, no provider keys, no browser | 57 | 35 | 0 | 6 | 16 | 44 / 20 / 10 / 8 | Harness created; first full execution: all executable gates green, 18 defects found, build blocked offline | [`../latest/RUN-2026-001.md`](../latest/RUN-2026-001.md) |

## Conventions

* `Automated` counts every `node:test` test name, including `todo` and `skip`.
* `Skipped` = self-skip because a credential/feature is unavailable (never a silent pass).
* `TODO` = the assertion is implemented but the application does not satisfy it yet; the linked `BUG-*` id is in
  the test name. This is why `Failed` can be 0 while defects exist — read the two columns together.
* `Catalogue cases` are the 82 documented cases in `../../test-cases/` with their `| Status |` at the time of the
  run; manual cases remain `NOT_EXECUTED` until a human/agent performs them.
