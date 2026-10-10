# Reports

Derived views over the harness. Every number here is produced from the documentation and run logs — never
typed from memory. Regenerate them with the tools below before publishing a new version.

| Report | Answers | Data source | Regenerate with |
|---|---|---|---|
| [`traceability.md`](traceability.md) | "Which requirement is verified by which case, and what happened?" | requirement tables + case statuses | manual edit + `check-references.mjs` |
| [`coverage.md`](coverage.md) | "How much is documented/tested/automated at each level?" | `test-cases/**`, `test-scenarios/**`, `requirements/**`, `features/**`, `automation/**` | `node automation/scripts/coverage-report.mjs` |
| [`test-summary.md`](test-summary.md) | "What happened in the last run, and how does it compare to the previous one?" | `test-results/latest/raw/*.log` | manual edit from the run logs |
| [`regression-report.md`](regression-report.md) | "What could break, and which tests guard it?" | `test-scenarios/regression.md` + suite results | manual edit + suites |
| [`release-readiness.md`](release-readiness.md) | "Can this ship?" | all of the above + `bugs/` | manual edit |

## Integrity tooling

```bash
node harness/automation/scripts/coverage-report.mjs      # counts for coverage.md
node harness/automation/scripts/check-references.mjs     # dangling REQ/FEAT/SCN/TC/BUG ids + broken links
```

`check-references.mjs` must exit 0 before a harness change is considered finished, otherwise the map between
requirements, scenarios, cases and bugs has holes.
