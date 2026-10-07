# Test Results

Execution records for the harness. A run record is a **report about an execution**, never a substitute for one:
the raw command output lives beside it in `latest/raw/`.

## Structure

```text
test-results/
├── latest/                  # ONLY the most recent run per suite generation
│   ├── RUN-2026-001.md      # the standard execution record
│   └── raw/                 # verbatim command output from that run
├── historical/              # older runs, moved here when a newer one is recorded
├── summaries/
│   └── RUN-LOG.md           # one line per run, chronological
└── README.md
```

## Rules

1. **`latest/` holds exactly one run.** When a new run is recorded, move the previous `RUN-*.md` (and its raw
   directory, if you keep one per run) into `historical/` before writing the new file.
2. Raw output is never edited — trim nothing, not even warnings. If a log is a summary written by hand (e.g. a
   dev-server excerpt), that is stated inside the file.
3. `RUN-YYYY-NNN` ids are sequential per calendar year and never reused, even if a run is aborted.
4. Every run fills the standard fields (below). Unknown values are written as `UNKNOWN`, missing capabilities as
   `BLOCKED` with the reason.
5. Findings that are defects get a `BUG-*` id before the run record is finished; performance observations go to
   `../evidence/performance/`.
6. A run that changes nothing about case statuses (e.g. a pure reconnaissance run) still gets a record, but the
   Status column may repeat values from the previous run — say so.

## Standard execution record template

```md
# RUN-YYYY-NNN — <short title>

| Field | Value |
|---|---|
| Execution ID | RUN-YYYY-NNN |
| Date (UTC) | YYYY-MM-DD |
| Environment | dev/CI/host, Node + npm version, server mode |
| Commit | <sha> (<branch>) |
| Tester / Agent | who or what executed |
| Test Suite | which suites/files ran |
| Total | n |
| Passed | n |
| Failed | n |
| Blocked | n |
| Not Run | n |
| Pass Rate | passed/(total − not run) or "n/a" |
| Critical Failures | ids or "none" |
| Known Issues | ids |
| Evidence | relative paths |
```

Requirements for the table: `Pass Rate` is computed from executed tests only and the formula is written down;
`Critical Failures` lists `BUG-*` ids (never "some failures"); `Evidence` links must resolve.

## What counts as a "test" here

* Automated: one `node:test` assertion set per test name (including `{ todo }` ones — they are counted and listed
  separately because they document a known defect).
* Manual cases: one test case executed by a human/agent and recorded in the case's `| Status |` field.
* The two are never summed into a single "tests run" number without stating which is which.

## History

| Run | Date | Headline | Record |
|---|---|---|---|
| RUN-2026-001 | 2026-10-07 | First harness run: 57 automated assertions (35 pass, 0 fail, 6 skipped, 16 TODO), 82 catalogue cases, 18 bugs | [`latest/RUN-2026-001.md`](latest/RUN-2026-001.md), [`summaries/RUN-LOG.md`](summaries/RUN-LOG.md) |
