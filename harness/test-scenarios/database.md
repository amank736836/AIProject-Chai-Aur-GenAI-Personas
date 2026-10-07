# Database scenarios — N/A for this project

**There is no database in this repository.** No ORM, no driver, no migration tooling, no schema files, no
connection strings (`grep` for `prisma|sequelize|mongoose|knex|pg|mysql|sqlite|redis|supabase|firebase` in
`package.json` and `src/` returns nothing). The README states the design explicitly:

> "No file writes on the backend; all storage is client-side" — `README.md`, History & Storage

Therefore classic database test scenarios (constraints, transactions, migrations, indexes, referential
integrity, connection pooling, backups) **do not apply** and no such tests were invented.

## What replaces database testing here

The only persistence is HTTP cookies, so the equivalent checks live in
[`../test-cases/chat-history-cookies/`](../test-cases/chat-history-cookies/) and
[`../test-scenarios/api.md`](api.md):

| Database concern | Cookie-based equivalent | Case |
|---|---|---|
| Schema/shape validation | cookie payload shape (`{role, content}[]`, `{name, tone}`) | TC-055, TC-018 |
| Read/write round trip | save → reload → read (`chatHistory`), server set → next request (`chatHistory-<persona>`) | TC-056, TC-011 |
| Data integrity/corruption | malformed base64/JSON payloads are ignored without crashing | TC-060, TC-061 |
| Capacity/limits | ≈4 KB per cookie; oversized histories are silently dropped | TC-059, KI-004 |
| Retention/expiry | `Max-Age=2592000` (30 days) on server cookies | TC-018 |
| Isolation (tenant scoping) | per-persona cookie names | TC-063 |
| Access control | `HttpOnly` prevents JS access to server cookies | TC-074 |
| Migration/format change | writer/reader format mismatch is exactly the current defect | TC-058, BUG-002 |

## Future plan

If a database is introduced (e.g. to fix cookie-size limits, `KI-004`), this file must be rewritten with:
schema/migration tests, seed-data fixtures, transaction/isolation scenarios, and a data-retention policy —
plus new `REQ-*` entries, because the "stateless server" rule (BR-006, NFR-001) would change.
