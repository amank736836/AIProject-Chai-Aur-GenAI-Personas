# FEAT-001 — Persona selection & chat modes

| Field | Value |
|---|---|
| Feature | FEAT-001 — Persona selection & chat modes |
| For full template see | [`../README.md`](../README.md) |
| FEAT ID | FEAT-001 |
| Purpose | Let the visitor choose which AI persona(s) answer: both (HiPi), Hitesh, Piyush, or a custom persona they define. |
| User | Demo visitor / learner |
| Entry Point | `src/app/components/PersonaSelector.tsx` (4 buttons) wired in `src/app/page.tsx` (`persona` state, default `'both'`) |
| Dependencies | `page.tsx` state machine, `ChatArea.tsx` rendering branch, `/api/chat` (`persona` parameter) |
| Inputs | Click on a persona button; `customName` text for the Custom mode |
| Outputs | `persona` state, re-rendered chat area, cleared transcript |
| Business Rules | BR-011 (switch clears visible chat) |
| Expected Behavior | Selecting a persona updates the highlight ring, clears the transcript, and routes subsequent messages to the matching persona branch. |
| Error Handling | `setPersona` cannot fail; an unknown `persona` value is handled server-side by the generic template branch (REQ-033). |
| Permissions | None — anonymous, client-side only. |
| Related APIs | `POST /api/chat` (persona routing) |
| Related Database Tables | None (no database; see `test-scenarios/database.md`) |
| Related UI | `PersonaSelector.tsx`, `ChatArea.tsx`, `MessageInput.tsx` (disabled state for Custom) |
| Existing Tests | `automation/ui/ssr-smoke.test.mjs` TC-039/TC-040 (SSR surface); TC-044/TC-045 manual |
| Missing Tests | No browser-level assertion that the transcript is cleared and focus/ARIA state changes on switch (TC-044). |
| Known Issues | Custom mode requires a 2-second artificial ready delay (`page.tsx:184-187`); no keyboard arrow navigation between personas. |

## Related documents

* [`requirements.md`](requirements.md) — REQ-001, REQ-002, REQ-033
* [`behavior.md`](behavior.md) · [`acceptance-criteria.md`](acceptance-criteria.md)
* [`test-scenarios.md`](test-scenarios.md) · [`test-cases.md`](test-cases.md) · [`test-data.md`](test-data.md)
* [`known-issues.md`](known-issues.md)
