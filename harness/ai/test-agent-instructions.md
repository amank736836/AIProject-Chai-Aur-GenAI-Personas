# Test-Agent Instructions

Operating manual for an AI agent (or a human stand-in) contributing to this harness. Read
[`../README.md`](../README.md) first for the workspace map, then this file before changing anything.

---

## 1. Purpose of this harness

This directory is the single source of truth for **what the project does, what has been verified, how it was
verified, what failed and how to reproduce it**. It exists because the repository shipped without tests
(`bugs/known-issues.md` → KI-001). Your job is to keep it accurate, reproducible and honest — never to make it
look better.

## 2. The agent flow — Analyze → Plan → Test → Record → Verify → Report

| Phase | What you do | Output |
|---|---|---|
| **Analyze** | Read the code you are about to judge (routes, components, `lib/`), the relevant `features/*`, `requirements/*`, `test-scenarios/*` and the existing cases. Never test from the README alone. | notes / updated docs |
| **Plan** | Decide which requirement or risk is unverified. Pick the smallest number of new cases that closes it. Prefer extending an existing case over inventing a new id. | updated `test-scenarios/*`, `test-cases/*` |
| **Test** | Execute something real: an existing suite, a curl probe, a node script. If it cannot run (credentials, browser, network), mark it `BLOCKED`/`NOT_EXECUTED` — with the reason. | command + raw output |
| **Record** | Save the raw output under `test-results/latest/raw/` (or `evidence/logs|api-responses/`), update the `| Status |` field of the affected cases, and add a run record. | run logs, status fields |
| **Verify** | Confirm the docs still match the code (field names, cookie flags, status codes) and that `check-references.mjs` exits 0. Re-read your own diff with the question: could this be misread as a claim I did not test? | clean checker run |
| **Report** | Update `reports/coverage.md`, `reports/test-summary.md` and `TESTING_STATUS.md` from the new run, and state the remaining gaps plainly. | updated reports |

An agent **never** skips Analyze and Verify: those two phases are what keeps the harness from drifting into
fiction.

## 3. Rules for writing test cases

* Use the fixed template (see §6) and the fixed id scheme. One behaviour per case.
* Every case states **preconditions, exact steps, test data and an observable expected result**. If you cannot
  write a deterministic expected result, you do not yet understand the feature — go back to Analyze.
* Cover the classes required by the brief: functional (happy/alternate/validation/business rule), negative,
  edge, integration, regression, performance and security. Use `test-scenarios/` for the coverage map.
* Test data goes into `test-data/` (valid / invalid / edge-cases / fixtures); reference it by relative path.
* Cases that need provider credentials say so in the Automation field and are `BLOCKED`, never `PASS`.

## 4. Evidence discipline — the core rule

**Never claim a pass without an execution and its output.**

| Situation | Correct status | Evidence field |
|---|---|---|
| You ran the command and it produced the expected result | `PASS` | path to the saved raw output |
| It produced a different result | `FAIL` | path to output + bug id |
| It could not run (no keys, no browser, no network, build blocked) | `BLOCKED` | the blocker, one line |
| Nobody has run it yet | `NOT_EXECUTED` | any pre-written planned evidence path |
| Partially verified (e.g. static review only) | `PARTIAL` | what exactly was and was not verified |

Forbidden: invented outputs, "should pass", timestamps of runs that never happened, screenshots you did not
observe, editing a log to remove a warning.

## 5. Escalation & ambiguity

* Undeterminable behaviour → write `UNKNOWN / REQUIRES VALIDATION` and add it to the gap list in
  `reports/coverage.md`. Never guess into a PASS.
* Contradiction between README and code → the code wins; record the contradiction as a bug or a known issue.
* Missing credentials/permissions → `BLOCKED` with the exact env-var name that is missing (never a value).
* Suspected security finding → add a case under `test-cases/platform-security/` and, if it is a defect, a
  `BUG-*`; do not test destructive or third-party infrastructure.

## 6. Fixed formats (copy exactly)

**Test case**

```md
### TC-### — Title
| Field | Value |
|---|---|
| Test Case ID | TC-### |
| Feature | FEAT-### |
| Priority | P0 | P1 | P2 | P3 |
| Type | Functional | Negative | Edge | Integration | Regression | Performance | Security |
| Preconditions | … |
| Steps | numbered |
| Test Data | path or inline |
| Expected Result | observable |
| Actual Result | observed (or "Not executed — <reason>") |
| Status | PASS | FAIL | BLOCKED | NOT_EXECUTED | PARTIAL |
| Automation | AUTOMATED | MANUAL | PARTIAL |
| Evidence | relative path |
| Related Requirement | REQ-### / SCN-### / BR-### |
| Related Bug | BUG-### / — |
| Last Executed | YYYY-MM-DD (RUN-YYYY-NNN) |
```

**Run record / bug / tool** — see `test-results/README.md`, `bugs/README.md`, `test-tools/README.md`.

## 7. How to run things

```bash
cd /home/user/AIProject-Chai-Aur-GenAI-Personas
npm run dev -- -H 0.0.0.0 -p 3000 &            # required for the API/UI suites
RUN_ID=RUN-YYYY-NNN bash harness/automation/scripts/run-all.sh   # everything, writes raw logs
node --test "harness/automation/utilities/*.test.mjs"
node harness/automation/scripts/coverage-report.mjs
node harness/automation/scripts/check-references.mjs
```

Stop the dev server before `npm run build` (the build replaces `.next` and breaks the running server —
observed, see `TESTING_STATUS.md` §environment quirks).

## 8. Repository navigation for agents

| Question | Read |
|---|---|
| What is this product? | `PROJECT_OVERVIEW.md`, `ARCHITECTURE.md` |
| How is it built/tested today? | `TESTING_STRATEGY.md`, `TESTING_STATUS.md` |
| What must it do? | `requirements/` |
| How does feature X work / what is untested? | `features/<feature>/` (`behavior.md`, `test-cases.md`, `known-issues.md`) |
| Which scenario covers requirement Y? | `test-scenarios/` then `reports/traceability.md` |
| What exactly do I run for case Z? | `test-cases/<module>/`, `test-tools/`, `automation/README.md` |
| Is this a known defect? | `bugs/open/`, `bugs/known-issues.md` |
| What happened last time? | `test-results/latest/`, `test-results/summaries/RUN-LOG.md` |

## 9. Working with the application code

* Do **not** change application source (`src/`, `data/`, `package.json` scripts) as part of testing unless the
  task explicitly asks for a fix; this harness is observational.
* Do not add runtime dependencies for tests. Node's built-in `node:test` + `fetch` is the standard here; the
  only allowed extras are documented in `test-tools/`.
* Temporary harness-only helpers belong in `automation/utilities/` and must be listed in
  `automation/README.md`.
* If a test needs to distinguish "the app is broken" from "the environment is broken", assert on the
  environment first (see `automation/scripts/env-check.sh`).

## 10. Definition of done for a harness change

1. New/updated cases use the fixed template and valid ids.
2. Anything executed has raw output saved and a status matching that output.
3. `node harness/automation/scripts/check-references.mjs` exits 0.
4. `node harness/automation/scripts/coverage-report.mjs` runs without error and the reports quoting its numbers
   are updated.
5. `TESTING_STATUS.md` reflects the latest run; no empty or speculative file was added.
6. No secrets, tokens, cookies or personal data were written anywhere under `harness/`.

## 11. Common pitfalls

| Pitfall | Consequence | Instead |
|---|---|---|
| Marking a case PASS from a previous run's evidence | The harness lies about the current commit | Re-run, or keep the old run id in `Last Executed` and status unchanged |
| Testing against the production URL | Third-party load, outbound abuse | Always the local dev server |
| Forgetting the dev server is required | API/UI suites fail with ECONNREFUSED and look like app bugs | Run the preflight in `run-all.sh` |
| Running `npm run build` while `npm run dev` is alive | `.next` is replaced → dev server 500s | Stop the dev server first |
| Quoting counts from memory in reports | Numbers drift from the docs | Regenerate with `coverage-report.mjs` |
| Interpolating a user value into a shell command in a test | Flaky/unsafe automation | Pass JSON bodies via files or `--data @-` |
| Adding a test dependency for convenience | Diverges from the "existing tools first" rule | Use `node:test`, `fetch`, `curl` |
