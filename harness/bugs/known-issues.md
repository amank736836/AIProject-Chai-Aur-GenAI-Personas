# Known Issues & Accepted Risks

Design limitations and accepted posture items that are **not** bugs (they may be intentional, or cannot be
fixed within the current architecture). Bugs live in [`open/`](open/) (index: [`../README.md`](README.md)).

## Known issues (`KI-*`)

| ID | Issue | Impact | Where | Status |
|---|---|---|---|---|
| KI-001 | Before this harness there were no automated tests, no test script and no documented test process. | Regressions were undetectable except by manual use. | repository | Addressed by this harness (57 automated cases) |
| KI-002 | No CI pipeline (`.github/workflows` absent); nothing runs on push/PR. | The suites exist but must be run manually. | repository | Open |
| KI-003 | `next build` needs network access to `fonts.googleapis.com` (`next/font/google` in `layout.tsx`); the offline sandbox fails with "Failed to compile". | Production build cannot be verified in an offline/air-gapped environment; a self-hosted/offline build would fail. | `src/app/layout.tsx` | Open |
| KI-004 | All persistence is browser cookies, capped at ≈4 KB each; a 60-message transcript already exceeds the limit and oversized cookies are silently dropped. | Long conversations lose context; no warning to the user. | FEAT-006 | Open (design) |
| KI-005 | No browser runtime is available in the test environment, so 8 UI interaction cases are manual. | Interaction bugs can only be found by a human running the checklist. | environment | Open |
| KI-007 | In HiPi mode a failure of **either** provider call fails the whole turn (single `Promise.all`, no partial success). | One flaky call degrades both personas. | FEAT-002 | Open |
| KI-008 | Custom-persona readiness is a fixed 2 s `setTimeout`, independent of the API response. | Slow creation unlocks chat too early; fast creation still waits 2 s. | FEAT-004 | Open |
| KI-009 | `@handle` enrichment performs 10 sequential outbound requests inline in the request (no timeout, no concurrency, no user-agent). | Slow persona creation, provider/platform rate-limit and ToS risk. | FEAT-004 | Open |
| KI-010 | A persona with `tone: ""` is treated as created (interacts with BUG-012). | Users can chat with an empty persona. | FEAT-004 | Open |
| KI-011 | Dead code: `hashData()` (SHA-256, `CookieManager.ts:15-22`) is never called; the `personaTone` prop fetched in `page.tsx` is never rendered (see BUG-005); `loadChatFromCookie` destructures an unused `hash`. | Maintenance noise, misleading to readers. | FEAT-006, FEAT-010 | Open |
| KI-012 | The selected persona is not persisted; a reload always returns to HiPi. | UX friction; `UNKNOWN / REQUIRES VALIDATION` whether it is intended. | FEAT-001 | Open |
| KI-013 | Provider error classification is substring matching in `llm.js` (`"rate limit"`, `"quota"`, `"429"`, `"TPD"`). | A different error shape silently disables the Gemini fallback (a wrapped fallback failure also surfaces as `500` instead of `429`). | FEAT-011 | Open |
| KI-014 | Responses are not streamed; the user waits for the full generation behind an animated placeholder. | Perceived latency depends entirely on the provider. | FEAT-003 | Open |

> One previously-planned known issue was promoted to [`open/BUG-014.md`](open/BUG-014.md) (HiPi history stores
> only the Hitesh reply); its former `KI-*` number is retired and intentionally not reused.

## Accepted risks (`RISK-*`)

| ID | Risk | Rationale / mitigation | Linked case |
|---|---|---|---|
| RISK-001 | Every API route is anonymous and callable by anyone on the internet. | Public demo by design; documented in the README (no auth feature). | TC-064 |
| RISK-002 | No rate limiting, no payload cap, no bot protection → the owner's LLM quota can be consumed by third parties. | Accept for a demo, or add a simple IP/edge rate limit + payload cap before wider promotion. | TC-065, TC-006 |
| RISK-003 | No security headers configured (no CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`); server cookies lack the `Secure` attribute at the app level. | Low exposure for a static-ish SPA, but cheap to fix in `next.config.ts headers()`. | TC-075, TC-074 |
| RISK-004 | The server makes outbound requests on behalf of anonymous callers (10 profile URLs, Unsplash HEAD). | Host templates are fixed and the username is path-encoded by `encodeURIComponent`-free interpolation; keep an eye on it if the templates change. | SCN-094 |
| RISK-005 | `fs.readFileSync` of the tone JSON on every chat request. | Negligible locally; consider caching/importing the JSON at module load for serverless efficiency. | SCN-082 |
| RISK-006 | Cookie-only persistence (see KI-004): no backup, no cross-device continuity, destroyed by clearing site data. | Architectural decision for serverless/stateless deployment. | TC-059 |
| RISK-007 | Vulnerable production dependency versions (see BUG-017). | Track BUG-017; upgrade `next` before any wider release. | TC-072 |
| RISK-008 | `prompt.js` keeps module-level mutable state (`lastUsed`) for signature-line rotation. | Per-process state is not request-scoped; behaviour under concurrency is `UNKNOWN / REQUIRES VALIDATION`. | TC-036 |
