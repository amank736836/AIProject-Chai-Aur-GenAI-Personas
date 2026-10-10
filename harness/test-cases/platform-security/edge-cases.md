# platform-security — edge cases

### TC-070 — User-controlled persona name is used in cookie names and a RegExp unescaped
| Field | Value |
|---|---|
| Test Case ID | TC-070 |
| Feature | platform, FEAT-004 |
| Priority | P2 |
| Type | Security (injection surface) |
| Preconditions | Dev server running on `http://localhost:3000` (`npm run dev`); `curl` available; no credentials required |
| Steps | 1. Send a persona name containing regex metacharacters (`.*`, `[a-`) and cookie delimiters (`;`, `=`) 2. Inspect the resulting `Set-Cookie` (TC-019) and the history lookup regex in `chat/route.ts:23` |
| Test Data | Inline — the concrete values are given in the steps (no external fixture) |
| Expected Result | Names escaped/quoted before being embedded in cookies and regexes |
| Actual Result | `new RegExp(`${cookieName}=([^;]+)`)` interpolates the raw name; the `Set-Cookie` name can contain `;` (TC-019 evidence). Impact today is limited to the requester's own cookie jar, but it is an injection surface |
| Status | FAIL (BUG-015 cookie name; BUG-016 regex) |
| Automation | STATIC + AUTOMATED (cookie-name part in TC-019) |
| Evidence | `../../evidence/api-responses/TC-019-create-persona-cookie-injection.txt` |
| Related Requirement | NFR-012 |
| Related Bug | BUG-015, BUG-016 |
| Last Executed | 2026-10-07 (partial, RUN-2026-001) |
**Additional edge probes worth adding when a browser/proxy is available:** CSRF-style cross-site POSTs with a
victim's cookies (mitigated only by `SameSite=Lax`), header smuggling via the persona name, and abuse of the
outbound scraper as an SSRF primitive (`SCN-094`).
