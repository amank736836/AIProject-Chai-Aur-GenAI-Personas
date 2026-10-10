# FEAT-013 — Chat clearing on unload

*Documentation depth: condensed (README + test-cases).*

| Field | Value |
|---|---|
| Feature | FEAT-013 — Chat clearing on unload |
| Purpose | Clear the conversation when the user leaves the page (README: "History is cleared on page reload or persona change"). |
| User | Demo visitor (privacy/cleanliness) |
| Entry Point | `page.tsx:134-153` — `beforeunload` handler → `navigator.sendBeacon('/api/clear-history', {persona:"all"})` with a `fetch(..., {keepalive:true})` fallback |
| Dependencies | **Server route `/api/clear-history` — does not exist** |
| Inputs | Page unload event |
| Outputs | Expected: history cookies cleared. Actual: HTTP 404 for every unload; cookies remain. |
| Business Rules | BR-006 (no server storage) |
| Expected Behavior | The beacon is accepted and any server-side transcript state for the persona is discarded. |
| Error Handling | Client ignores the beacon result entirely (`navigator.sendBeacon` returns `false` on failure and is never checked). |
| Permissions | None. |
| Related APIs | `/api/clear-history` (**missing**) |
| Related Database Tables | None — the project has no database ([database scenarios](../../test-scenarios/database.md)) |
| Related UI | None visible (fire-and-forget) |
| Existing Tests | TC-054 (executed: 404) |
| Missing Tests | Cookie-clearing verification after unload (needs a browser + cookie inspection). |
| Known Issues | **BUG-001** — endpoint missing, so the feature is a no-op; the client-side `chatHistory` cookie survives (and, because of BUG-002, is never read back either, which masks the defect for users). |

**Requirement status:** REQ-031 FAIL (BUG-001).
