# Smoke scenarios

Fast, high-signal checks for "is this build alive and is the core contract intact?" — no provider credentials
required except where marked.

| SCN | Scenario | Feature | Priority | Cases | Status (RUN-2026-001) |
|---|---|---|---|---|---|
| SCN-001 | Open `/` and confirm the app shell renders: title, four persona buttons, empty-state text and message input. | FEAT-001, FEAT-014 | P0 | TC-039, TC-040, TC-041, TC-042 | PASS |
| SCN-002 | HiPi happy path: a message produces two persona replies plus a history cookie. | FEAT-002 | P0 | TC-008 | BLOCKED (credentials) |
| SCN-003 | Build a prompt for every supported persona key (`hitesh`, `piyush`, `both`, custom, unknown) without throwing. | FEAT-010 | P0 | TC-027, TC-034 | PASS |
| SCN-004 | With the provider unavailable, `/api/chat` returns a JSON error (not HTML, not a hang) and the app stays usable. | FEAT-011, FEAT-012 | P0 | TC-005 | FAIL (payload leaks provider text, BUG-013) |
| SCN-005 | All three POST routes reject a missing required field with `400` and a JSON error body. | FEAT-012 | P0 | TC-001, TC-015, TC-022 | PASS |
| SCN-006 | `npm run dev` boots and serves `/` with HTTP 200. | build/dev | P0 | TC-080 | PASS |
| SCN-007 | Quality gates are green: `npm run lint` (0 errors) and `npx tsc --noEmit`. | build/dev | P0 | TC-076, TC-077 | PASS (13 lint warnings) |
| SCN-008 | Built-in tone data is available to the layers that need it (server `fs` read works; browser `/data` path checked). | FEAT-010 | P1 | TC-027, TC-043 | FAIL on the browser path (BUG-005) |
