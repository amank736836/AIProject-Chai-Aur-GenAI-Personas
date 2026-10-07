# Historical runs

Run records and raw logs that are no longer the latest execution. `RUN-2026-001` is currently the only run and
stays in [`../latest/`](../latest/); this directory becomes useful from the second run onwards.

When a new run is recorded:

1. `mv ../latest/RUN-*.md .` (keep the file name unique; one record per run).
2. `mv ../latest/raw <run-id>-raw` so each run keeps its own verbatim output.
3. Update [`../../reports/test-summary.md`](../../reports/test-summary.md), [`../summaries/RUN-LOG.md`](../summaries/RUN-LOG.md)
   and `../../TESTING_STATUS.md`.

Nothing else belongs here — no scratch files, no superseded drafts.
