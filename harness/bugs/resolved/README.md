# Resolved bugs

**Empty on purpose.** No bug found in RUN-2026-001 has been fixed: the harness task explicitly forbids
changing application behaviour, and no fix PR has been merged to date (latest merged PR is #3, UI
micro-interactions, before this audit began).

When a bug is fixed:

1. Move `open/BUG-xxx.md` here and set `Status: FIXED` with the fix commit/PR link.
2. Remove the `{ todo: "BUG-xxx" }` marker from the corresponding automated test so the assertion starts
   enforcing the fixed behaviour, then re-run the harness and record a new `RUN-*`.
3. Set `Status: VERIFIED` once the regression test passes in a recorded run, and update
   `../known-issues.md`, `../../TESTING_STATUS.md` and `../../reports/release-readiness.md`.
