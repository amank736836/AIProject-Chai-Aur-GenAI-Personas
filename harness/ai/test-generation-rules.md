# Test Generation Rules

Deterministic rules for generating and reviewing tests in this repository. They encode the mistakes that were
actually observed while building this harness, so following them keeps the suite honest, fast and maintainable.

## 1. Ground every expectation in an observable fact

* Quote the source evidence: `file:line` for code, a captured response for API behaviour, a measured value for
  performance. If neither exists, the expected result is `UNKNOWN / REQUIRES VALIDATION`.
* Never derive an expectation from the README alone — the README currently overstates at least three features
  (prompt transparency BUG-004, link verification BUG-009, Unsplash photos BUG-018).

## 2. One behaviour per case

* A case asserts **one** observable outcome; split multiple assertions into multiple cases or make the extra
  assertions preconditions.
* One test id = one entry in `test-cases/*` = at most a few assertions in code. Ids never get renumbered or
  reused; deprecate by marking `Status: NOT_EXECUTED — superseded by TC-###`.

## 3. Boundaries first

For every input, generate at least: empty, correct, one below/above the boundary, maximum plausible size and a
malformed value. This repository has already lost bugs to skipped boundaries (`"   "` passing validation
→ BUG-011; malformed JSON → BUG-010; 4 KB cookie ceiling → KI-004).

## 4. Non-Latin1 and hostile strings are standard inputs

Include at least one case per text-accepting endpoint with non-Latin1 (Hindi/emoji), quotes, `;`, `=`, `%`, and a
very long string. Cookie transports break on all of them (BUG-003, BUG-015).

## 5. Deterministic, isolated, self-cleaning

* No reliance on a previously created cookie, message or file; each case creates its own state (unique
  `personaData-*`/`chatHistory-*` cookies per run).
* No order dependence between test files.
* No sleeps as synchronisation; poll with a bounded retry helper (see `automation/utilities/`).

## 6. Skip, don't fake

* Missing credential, missing browser, missing network, wrong Node version → `{ skip: "reason" }` with the exact
  missing variable name.
* Never assert weaker behaviour just to keep the suite green. If the product is wrong, the case stays red or
  carries `{ todo: "BUG-###" }` **with** the bug id, so the gap stays visible while CI can stay useful.

## 7. Assert on contracts, not on prose

* Compare JSON shapes, status codes, headers, cookie flags and prompt *structure* (marker presence), not
  full-sentence LLM text — provider wording changes without notice.
* When testing prompts, assert that a distinctive token from the tone data appears, not the whole file.
* Snapshot only stable, cheap-to-review values; the harness stores raw outputs in `evidence/` instead of
  inline snapshots.

## 8. Nothing sensitive, nothing real

* No API keys, no cookies from real browsers, no e-mail addresses, no names of real third parties beyond the
  public persona data already in the repository.
* Test data uses `${ENV_VAR}` placeholders; fixtures are synthetic.

## 9. Cost and blast radius

* Local dev server only; never run load against the public Vercel deployment or third-party services.
* The ten outbound platform probes and the Unsplash probe are **not** to be hammered in tests — assert the code
  path statically or with a stubbed name.
* LLM-calling cases are opt-in (credential-gated) and must be cheap: short messages, no loops.

## 10. Keep the harness navigable

* Every new case is linked from its feature document and its scenario, and appears in
  `reports/traceability.md`.
* Every executed run leaves raw logs in `test-results/latest/raw/` plus one row in the run log.
* After any change: `check-references.mjs` exit 0 and the coverage numbers regenerated. Docs that quote numbers
  must be updated in the same change.
