# FEAT-006 — Known issues

| Ref | Issue | Severity | Status |
|---|---|---|---|
| BUG-002 | Client transcript never restored (writer/reader format mismatch). | High | Open |
| BUG-003 | Saving a chat with non-Latin1 text throws inside a React effect. | High | Open |
| BUG-008 | Server-side history lookup ignores custom personas (empty cookie name). | Medium | Open |
| BUG-001 | `clear-history` endpoint missing; unload beacon always 404s. | Medium | Open |
| KI-004 | ~4 KB per-cookie ceiling silently truncates long chats. | Medium | Open (design) |
| BUG-014 | HiPi history keeps only the Hitesh reply (`both` mode). | High | Open |
| KI-011 | Dead code: `hashData()` (SHA-256) never used; `loadChatFromCookie` destructures an unused `hash`. | Low | Open |
| — | Cookie payload is attacker-controllable by the same browser, so a user can inject arbitrary history into their own prompt (`UNKNOWN / REQUIRES VALIDATION`: acceptable for a demo?). | Low | Open (observation) |
