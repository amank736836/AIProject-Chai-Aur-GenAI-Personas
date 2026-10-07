# Non-Functional Requirements

Constraints and quality attributes derived from the repository and measured in `RUN-2026-001`
(`../test-results/latest/RUN-2026-001.md`). Prefix `NFR-` (see `README.md` for the naming rationale).

| ID | Category | Requirement | Source / measurement | Status |
|---|---|---|---|---|
| NFR-001 | Portability | The app must run on Vercel/any serverless Node host: no runtime filesystem writes, no long-lived in-memory state required for correctness. | README "Deployment"; no `fs.writeFile` in `src/**` | PASS (static) |
| NFR-002 | Persistence | All durable state is client-side: cookies only, therefore ≤ ~4 KB per cookie and lost when cookies are cleared. | `CookieManager.ts`, `chat/route.ts` | PASS with risk (KI-004, TC-059) |
| NFR-003 | Runtime | Node.js 18+ for dev/build/run. | README "Requirements"; harness ran on Node v22.22.3 | PASS |
| NFR-004 | Type safety | TypeScript `strict: true`, `tsc --noEmit` must report zero errors. | `tsconfig.json`; RUN-2026-001 `typecheck.log` | PASS (TC-077) |
| NFR-005 | Lint | ESLint (`next/core-web-vitals` + `next/typescript`) must report **zero errors**; warnings are tracked. | `eslint.config.mjs`; RUN-2026-001 `lint.log` | PASS with 13 warnings (TC-076) |
| NFR-006 | Buildability | `next build` must succeed for deployment. | `package.json` script `build` | BLOCKED in this environment: `next/font` cannot reach `fonts.googleapis.com` (KI-003, TC-078) |
| NFR-007 | Responsiveness (UI) | The server-rendered shell must respond quickly: p95 < 500 ms locally. | measurement: p50 56 ms / p95 72 ms (n=15, evidence/performance/performance-latency.json) | PASS (TC-039, perf probe) |
| NFR-008 | Responsiveness (API) | Deterministic API paths (validation errors) must respond p95 < 200 ms locally. | measurement: p95 30 ms (`/api/chat`, `/api/create-persona` 400s, n=15) | PASS |
| NFR-009 | Responsive design | Layout must be usable on mobile (≈375 px) and desktop; Tailwind breakpoints (`sm:`, `md:`) are used throughout. | `page.tsx`, `ChatArea.tsx`, `globals.css` | NOT_EXECUTED (no browser; manual checklist) |
| NFR-010 | Accessibility | Keyboard operability (Enter to send, focus rings), `aria-expanded` on the prompt toggle, `aria-hidden` on decorative elements, `alt` on avatars. | component sources | PARTIAL (static review only) |
| NFR-011 | Confidentiality | Provider API keys never reach the browser or the repository. | `src/lib/llm.js` (server-only), `.gitignore` `.env*` | PASS (TC-069, TC-082) |
| NFR-012 | Abuse resistance | Public endpoints should resist abuse (auth or rate limiting). | `next.config.ts` empty, no middleware | FAIL (RISK-001/002, TC-064/065) |
| NFR-013 | Dependency security | No known-exploitable advisories in production dependencies. | `npm audit --omit=dev` → 10 advisories (1 critical, 4 high) on `next@15.4.10` | FAIL (BUG-017, TC-072) |
| NFR-014 | Observability | Errors are logged server-side to stdout (`console.error`) and surfaced to the client as JSON without secrets. | `chat/route.ts:164` | PARTIAL (raw provider text leaked, BUG-013) |
