# Test Prompts (reusable)

Ready-to-use prompts for an AI agent working on this repository. Each one produces a **specific harness artefact**,
not prose. Fill the placeholders and keep the rules section from
[`test-agent-instructions.md`](test-agent-instructions.md) in force (never claim a pass without execution).

---

### 1. Onboard a new agent

> You are joining an existing Next.js 15 project ("Persona LLM Chat") as a test agent. Read
> `harness/README.md`, `harness/PROJECT_OVERVIEW.md`, `harness/ARCHITECTURE.md` and
> `harness/TESTING_STATUS.md`. Then answer, with file references: what does the product do, how do the API
> routes `/api/chat`, `/api/create-persona`, `/api/fetch-image` behave, what persistence exists, what suites can
> be run without credentials, and what is currently blocked. Do not change any file in this first pass.

### 2. Analyse a feature end-to-end

> Analyse `FEAT-### (<feature name>)`. Source of truth: `src/app/api/...`, `src/app/components/...`,
> `src/lib/...`, `data/*.json`. Produce: entry points, inputs/outputs, business rules, error handling,
> permissions, related APIs, and a list of behaviours that are undocumented or unverified. File anything
> unverifiable as `UNKNOWN / REQUIRES VALIDATION`. Then list the existing cases in
> `harness/test-cases/*/` that touch this feature and the gaps.

### 3. Write a test case

> Write cases for requirement `REQ-###` following the template in `harness/ai/test-agent-instructions.md` §6.
> Cover happy path, one alternate path, boundary/edge values and at least one negative case. Use real
> observation basis (source lines or measured responses) for the Expected Result; where the correct behaviour is
> undetermined, mark `UNKNOWN / REQUIRES VALIDATION` instead of inventing one. Save to the right
> `harness/test-cases/<module>/` file, add the id to `harness/features/<feature>/test-cases.md` and to the
> scenario table, then run `check-references.mjs`.

### 4. Automate a case

> Implement automated assertions for `TC-###` in the existing suite structure
> (`harness/automation/{utilities,api,ui}/*.test.mjs`) using only `node:test` and `fetch`. Requirements: no new
> dependencies; the test must skip cleanly (not fail) when its precondition is unavailable; if the app does not
> meet the expectation yet, embed the TC id and add `{ todo: "BUG-###" }` with a comment linking the bug. Run
> `node --test "<file>"`, save raw output, then update the case's Automation/Status fields.

### 5. Execute a run and record it

> Execute `RUN_ID=RUN-YYYY-NNN bash harness/automation/scripts/run-all.sh` against a fresh `npm run dev`. Record
> the outcome in `harness/test-results/latest/RUN-YYYY-NNN.md` using the standard template, keep previous runs
> under `harness/test-results/historical/`, append a line to `harness/test-results/summaries/RUN-LOG.md`, and
> update the totals in `harness/reports/test-summary.md` and `harness/TESTING_STATUS.md`. Report pass/fail/skip
> counts exactly as logged, including todo counts, and list which cases could not run and why.

### 6. Investigate and file a bug

> Here is the raw output: `<paste>`. Reproduce it with the smallest possible command on the local dev server,
> capture the run in `harness/evidence/`. If it is a defect, write `BUG-###` using the template in
> `harness/bugs/README.md`, with severity/priority justified, root cause as `file:line`, a suggested fix and the
> regression test that should guard it. Add the id to `harness/bugs/README.md`, to every affected case's
> `Related Bug`, and to `harness/reports/traceability.md` § Bug → regression coverage. Never include secrets in
> the evidence.

### 7. Security pass

> Review the three API routes as an anonymous attacker with only curl. Check: validation and payload limits,
> error-text disclosure, CORS/preflight, rate limiting, cookie flags, injection into headers/regex/cookies, and
> the outbound request surface. Produce cases under `harness/test-cases/platform-security/` with real commands and
> observed responses. Mark anything you could not execute as `BLOCKED` and rate the residual risk as
> `RISK-###` in `harness/bugs/known-issues.md`.

### 8. Performance baseline

> Measure, with `<N>` iterations against the local dev server: `GET /`, the three validation-error paths, and
> `POST /api/fetch-image`. Record p50/p95/max and payload sizes into
> `harness/evidence/performance/{json,md}` and update `harness/reports/coverage.md` § Performance. Do not
> extrapolate to production; state the environment. LLM latency must be recorded as not measured without
> credentials.

### 9. Review a pull request against the harness

> Diff `<ref>` against the harness expectations. For each changed file, name the cases that should be re-run
> (use `harness/reports/regression-report.md` § changes-most-likely-to-break-something). Run them, then state
> which documented behaviours changed, which cases need their Expected Result updated, and whether any bug status
> should move. Do not merge harness changes that contradict observed output.

### 10. Pre-release gate

> Using `harness/reports/release-readiness.md` as the checklist, verify: the critical flows run (with
> credentials if available), the smoke scenarios pass, the production build/start is verified on a networked
> machine, the dependency audit is clean, and no open high-severity bug remains unexplained. Produce the
> recommendation `READY / READY WITH RISKS / NOT READY` with one evidence link per claim. If a claim cannot be
> executed, the recommendation cannot be `READY`.

### 11. Regression hunt after a fix

> BUG-### was fixed in `<commit>`. Remove the `{ todo: "BUG-###" }` marker from the linked tests, run the full
> harness, confirm the previously failing assertion now passes and nothing else broke, move the bug to
> `harness/bugs/resolved/` with `Status: VERIFIED`, update `known-issues.md`/reports, and note in the run record
> what the fix touched.
