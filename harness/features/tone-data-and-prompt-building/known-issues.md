# FEAT-010 — Known issues

| Ref | Issue | Severity | Status |
|---|---|---|---|
| BUG-006 | Custom tone string ignored → generic empty template (the persona sounds the same for everyone). | High | Open |
| BUG-007 | `@handle` tone never found. | High | Open |
| BUG-009 | Reachability-verified links for custom personas: dead branch. | Medium | Open |
| BUG-005 | `data/*.json` is not reachable from the browser, yet `page.tsx` fetches `/data/<persona>-tone.json` (always 404) and the fetched value is never used by `ChatArea`. | Low | Open |
| RISK-008 | Module-level `lastUsed` state per process: concurrency behaviour `UNKNOWN / REQUIRES VALIDATION`. | Low | Open |
| — | `prompt.js` reads `styleNotes`/`introPhrases`/`signatureLines`/`signatureQuotes`, but the shipped tone files only define `systemPrompt`, `signature_phrases`, `vocab`, `links`, … → the generic template path is effectively undefined for real data. | Medium | Open (schema drift) |
| — | No validation of tone JSON structure; a malformed file makes `/api/chat` return 500 (`UNKNOWN / REQUIRES VALIDATION`: no test performed, would require editing `data/`). | Medium | Open |
