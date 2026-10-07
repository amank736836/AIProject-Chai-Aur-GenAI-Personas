# FEAT-001 — Known issues

| Ref | Issue | Severity | Status |
|---|---|---|---|
| — | Persona choice is not persisted across reloads (no `localStorage`/query parameter); a reload returns to HiPi. Is this intended? `UNKNOWN / REQUIRES VALIDATION`. | Low | Open (observation) |
| — | Clicking the active persona still clears the transcript without confirmation. | Low | Open (observation) |
| — | Custom-mode readiness is a fixed 2-second timer (`page.tsx:184-187`) unrelated to the create-persona response; fast or slow LLM responses both wait 2 s. | Medium | Open (design smell; see FEAT-004 KI) |
| — | Selector buttons lack `role`/`aria-pressed`; assistive technology cannot tell which persona is selected. | Medium | Open (a11y gap, TC-052) |

Bugs that affect this feature are tracked globally: [`../../bugs/`](../../bugs/README.md) (none filed specifically
for the selector in RUN-2026-001).
