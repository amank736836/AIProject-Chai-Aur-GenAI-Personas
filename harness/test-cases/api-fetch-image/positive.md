# api-fetch-image — positive cases

### TC-023 — Valid name returns an absolute https image URL
| Field | Value |
|---|---|
| Test Case ID | TC-023 |
| Feature | FEAT-005 |
| Priority | P2 |
| Type | Positive |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`, see `../../test-tools/setup.md`); no provider credentials required |
| Steps | 1. `POST /api/fetch-image {"name":"Hitesh"}` 2. Inspect `image` |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | `200` with `image` matching `^https://`; a usable avatar (unsplash when reachable, otherwise a generated ui-avatars URL) |
| Actual Result | `200 {"image":"https://ui-avatars.com/api/?name=Hitesh&background=…&size=128&font-family=…&rounded=…"}` (fallback path, p50 32 ms in `../../evidence/performance/performance-latency.md`). The style parameters (`background`, `font-family`) are chosen randomly per request in `fetch-image/route.ts`, so successive evidence captures legitimately differ — only the host, `name=` and the `^https://` shape are asserted |
| Status | PASS |
| Automation | AUTOMATED |
| Evidence | `../../evidence/api-responses/TC-023-fetch-image-ok.json` |
| Related Requirement | REQ-020, REQ-021 |
| Related Bug | BUG-018 (primary source retired) |
| Last Executed | 2026-10-07 (RUN-2026-001) |
### TC-025 — The returned URL is downloadable and renderable
| Field | Value |
|---|---|
| Test Case ID | TC-025 |
| Feature | FEAT-005 |
| Priority | P2 |
| Type | Positive (integration) |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`, see `../../test-tools/setup.md`); no provider credentials required |
| Steps | 1. `POST /api/fetch-image {"name":"Hitesh"}` 2. `curl -I <image>` 3. Check `content-type: image/*` and size < 500 KB (the client rejects larger) |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | `200`, image content type, size below the client threshold |
| Actual Result | not run — the test environment cannot reach external image hosts |
| Status | BLOCKED (outbound internet) |
| Automation | PLANNED |
| Evidence | — |
| Related Requirement | REQ-022 |
| Related Bug | — |
| Last Executed | NOT_EXECUTED |
