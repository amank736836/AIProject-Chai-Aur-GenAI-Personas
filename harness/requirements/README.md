# Requirements

Requirements are reverse-engineered from the repository (source code, `README.md`, persona data) — this
project has no written specification of its own. Every requirement therefore cites the file that proves it,
and gaps are marked `UNKNOWN / REQUIRES VALIDATION`.

| File | ID range | Content |
|---|---|---|
| [`functional-requirements.md`](functional-requirements.md) | `REQ-001 … REQ-034` | what the product does, per feature |
| [`non-functional-requirements.md`](non-functional-requirements.md) | `NFR-001 … NFR-014` | quality attributes, constraints, platform behaviour |
| [`business-rules.md`](business-rules.md) | `BR-001 … BR-012` | rules the implementation must honour |

**ID conventions**

* `REQ-*` — functional requirement (observable behaviour).
* `NFR-*` — non-functional requirement/constraint. The brief's `REQ-*` prefix is reserved for functional
  requirements so that the two classes stay separable in traceability tables.
* `BR-*` — business rule (constraint on *how* behaviour is produced).
* `UNKNOWN / REQUIRES VALIDATION` — the repository does not determine the answer.

**Status vocabulary** used in the traceability table: `COVERED` (has ≥1 scenario and ≥1 executed case),
`PARTIAL` (documented but not fully executed or failing), `GAP` (no case yet), `N/A`.

Traceability lives in [`../reports/traceability.md`](../reports/traceability.md).
