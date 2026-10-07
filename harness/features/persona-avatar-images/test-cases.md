# FEAT-005 — Test cases

| TC | Title | Module file | Status in RUN-2026-001 |
|---|---|---|---|
| TC-022 | Missing name → 400 | [`../../test-cases/api-fetch-image/negative.md`](../../test-cases/api-fetch-image/negative.md) | PASS |
| TC-023 | Valid name → 200 with an absolute https URL | [`../../test-cases/api-fetch-image/positive.md`](../../test-cases/api-fetch-image/positive.md) | PASS |
| TC-024 | Malformed JSON → 4xx (currently 500) | [`../../test-cases/api-fetch-image/negative.md`](../../test-cases/api-fetch-image/negative.md) | FAIL (BUG-010) |
| TC-025 | Returned URL is downloadable | [`../../test-cases/api-fetch-image/positive.md`](../../test-cases/api-fetch-image/positive.md) | BLOCKED (no outbound internet in the test environment) |
| TC-026 | Primary upstream retired → fallback used | [`../../test-cases/api-fetch-image/edge-cases.md`](../../test-cases/api-fetch-image/edge-cases.md) | PASS (fallback observed) + BUG-018 |
