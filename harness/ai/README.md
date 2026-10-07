# `harness/ai/` — AI-assisted testing

Guidance for language-model agents (and the humans supervising them) that work on this harness. The point is to
make AI contribution **verifiable**: an agent may plan, write and run tests, but every claim it makes must be
tied to an execution and its output.

| File | Use it for |
|---|---|
| [`test-agent-instructions.md`](test-agent-instructions.md) | The operating manual: purpose of the harness, the Analyze → Plan → Test → Record → Verify → Report flow, rules for cases/evidence/ambiguity, fixed formats, how to run suites, navigation table, code-change policy, definition of done, pitfalls |
| [`test-prompts.md`](test-prompts.md) | Eleven copy-paste prompts (onboarding, feature analysis, case writing, automation, run recording, bug filing, security pass, performance baseline, PR review, pre-release gate, regression hunt after a fix) |
| [`test-generation-rules.md`](test-generation-rules.md) | Deterministic rules for generating tests: evidence-grounded expectations, one behaviour per case, boundaries first, hostile/non-Latin1 inputs, isolation, skip-don't-fake, contract assertions, data safety, cost limits, navigability |

## Quality bar for AI-produced work here

1. **No unverifiable claim.** A status field without a corresponding execution log or captured response is a bug
   in the harness itself.
2. **No new dependencies.** `node:test` + `fetch` + `curl` cover everything this project needs.
3. **No source changes.** The harness observes the application; fixes are proposed as `BUG-*` records with a
   suggested patch described in the `Fix` field, not silently applied.
4. **No secrets.** Provider keys are referenced by environment-variable name only, in every document and log.
5. **Leave the map correct.** After any change: `check-references.mjs` exits 0, coverage numbers regenerated,
   `TESTING_STATUS.md` updated in the same edit.

The first agent-authored contribution to this harness is RUN-2026-001 itself: 18 defects, 57 automated
assertions and 82 catalogued cases, all traceable from
[`../reports/traceability.md`](../reports/traceability.md).
