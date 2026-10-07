# FEAT-001 — Requirements

| ID | Requirement | Source | Test case | Status |
|---|---|---|---|---|
| REQ-001 | The page exposes four modes — HiPi (both), Hitesh, Piyush, Custom — and defaults to HiPi. | `page.tsx` `useState<'both'…>('both')`; `PersonaSelector.tsx` buttons | TC-040 (SSR), TC-045 (manual) | PARTIAL |
| REQ-002 | Choosing a persona resets the visible transcript; Custom stays disabled until the persona is created. | `page.tsx` `setPersona()` → `setChat([])`; `MessageInput.tsx` `disabled` | TC-039, TC-044 (manual) | PARTIAL |
| REQ-033 | An unrecognised persona value must not crash the request; it falls back to the generic persona template. | `src/lib/prompt.js` final branch | TC-034 | PASS |

Non-functional: NFR-009 (responsive layout of the selector row), NFR-010 (`focus-visible` rings on every button).
