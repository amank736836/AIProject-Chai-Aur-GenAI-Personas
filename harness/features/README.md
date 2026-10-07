# Feature Inventory

Every meaningful feature/module discovered in the codebase, with its documentation depth and test status.
Statuses are as of `RUN-2026-001` (see [`../test-results/latest/RUN-2026-001.md`](../test-results/latest/RUN-2026-001.md)).

**Documentation depth:** *Full* = `README.md`, `requirements.md`, `behavior.md`, `acceptance-criteria.md`,
`test-scenarios.md`, `test-cases.md`, `test-data.md`, `known-issues.md`. *Condensed* = `README.md` (contains all
template fields) + `test-cases.md` (the case index); used for smaller, well-bounded features to avoid
duplicating content across eight near-empty files.

| Feature | Name | Entry point | Requirement(s) | Scenarios | Test cases | Status |
|---|---|---|---|---|---|---|
| [FEAT-001](persona-selection-and-chat-modes/README.md) | Persona selection & chat modes | `PersonaSelector.tsx`, `page.tsx` | REQ-001, REQ-002, REQ-033 | SCN-001, SCN-009, SCN-035, SCN-067 | TC-039, TC-040, TC-044, TC-045 | PARTIAL |
| [FEAT-002](hipi-side-by-side-comparison/README.md) | HiPi side-by-side comparison | `persona=both` in `chat/route.ts` | REQ-008, REQ-011 | SCN-010, SCN-047, SCN-058 | TC-008, TC-013, TC-014 | BLOCKED (credentials) |
| [FEAT-003](single-persona-chat/README.md) | Single-persona chat (Hitesh / Piyush) | `POST /api/chat` `persona=hitesh\|piyush` | REQ-005 … REQ-008, REQ-012 | SCN-002, SCN-011, SCN-023, SCN-059 | TC-007, TC-009, TC-001 | BLOCKED (credentials) |
| [FEAT-004](custom-persona-creation/README.md) | Custom persona creation & `@handle` enrichment | `CustomPersonaInput.tsx` → `/api/create-persona` | REQ-004, REQ-013 … REQ-019, REQ-026 | SCN-012, SCN-024, SCN-048, SCN-084 | TC-015 … TC-021, TC-033 | FAIL (BUG-006/007/012/015) |
| [FEAT-005](persona-avatar-images/README.md) | Persona avatar images | `/api/fetch-image` | REQ-020 … REQ-022 | SCN-013, SCN-025, SCN-036 | TC-022, TC-023, TC-026 | PARTIAL (BUG-018) |
| [FEAT-006](chat-history-persistence/README.md) | Chat history persistence (cookies) | `CookieManager.ts`, `chat/route.ts`, `page.tsx` | REQ-011, REQ-018, BR-005 | SCN-014, SCN-037, SCN-049, SCN-095 | TC-054 … TC-063 | FAIL (BUG-001/002/003/008) |
| [FEAT-007](prompt-transparency/README.md) | Prompt transparency panel | `PromptDisplay.tsx`, `debugPrompt` | REQ-023, REQ-032 | SCN-015, SCN-068 | TC-043, TC-047 | FAIL (BUG-004) |
| [FEAT-008](chat-link-rendering/README.md) | Link rendering, copy & visit | `ChatArea.tsx` | REQ-024 | SCN-016, SCN-069 | TC-049, TC-048 | PARTIAL |
| [FEAT-009](scroll-helpers/README.md) | Scroll helpers | `page.tsx`, `ChatArea.tsx` | REQ-030 | SCN-017, SCN-070 | TC-050 | NOT_EXECUTED (manual) |
| [FEAT-010](tone-data-and-prompt-building/README.md) | Tone data & prompt building | `src/lib/prompt.js`, `data/*.json` | REQ-003, REQ-012, REQ-025, REQ-033 | SCN-003, SCN-018, SCN-038, SCN-060 | TC-027 … TC-038 | PARTIAL (2 bugs) |
| [FEAT-011](llm-provider-fallback/README.md) | LLM providers & fallback | `src/lib/llm.js` | REQ-009 | SCN-004, SCN-050, SCN-061 | TC-010, TC-025 | BLOCKED (credentials) |
| [FEAT-012](error-handling/README.md) | Error handling & messaging | all route handlers + `page.tsx` | REQ-006, REQ-010, REQ-014, REQ-034 | SCN-005, SCN-026, SCN-039, SCN-051 | TC-001 … TC-006, TC-015, TC-016, TC-024 | PARTIAL (BUG-010/011/013) |
| [FEAT-013](chat-clearing-on-unload/README.md) | Chat clearing on unload | `page.tsx:134-153` → `/api/clear-history` | REQ-031 | SCN-019, SCN-062 | TC-054 | FAIL (BUG-001) |
| [FEAT-014](ui-shell-and-accessibility/README.md) | UI shell, responsiveness & a11y | `layout.tsx`, `globals.css`, components | REQ-027 … REQ-029, NFR-009, NFR-010 | SCN-006, SCN-020, SCN-071, SCN-072 | TC-039 … TC-042, TC-051 … TC-053 | PARTIAL |

## Feature template (full depth)

```text
Feature:        FEAT-xxx — <name>
Purpose:        <why it exists>
User:           <who uses it>
Entry Point:    <route/component/file:line>
Dependencies:   <modules/services>
Inputs:         <data in>
Outputs:        <data out>
Business Rules: <BR-* ids>
Expected Behavior / Error Handling / Permissions / Related APIs / Related Database Tables /
Related UI / Existing Tests / Missing Tests / Known Issues
```

## Adding a feature

1. `mkdir features/<nn>-<kebab-name>/` and copy the file list of a *Full* feature (see FEAT-001).
2. Fill `requirements.md` (new `REQ-*` in `../requirements/functional-requirements.md`) and `behavior.md`.
3. Add scenarios to the matching `../test-scenarios/*.md` files and cases to `../test-cases/<module>/`.
4. Link the case ids in `test-cases.md`, then update `../reports/traceability.md` and `../reports/coverage.md`.

## Not documented as features (deliberately)

* **Next.js scaffolding** (`layout.tsx` metadata, `globals.css` utilities) — covered by FEAT-014.
* **`hashData()` in `CookieManager.ts`** — dead code (exports an unused SHA-256 helper); observations are
  recorded in FEAT-006's `known-issues.md` rather than treated as a feature.
* **`GET /api/chat` 405** — platform behaviour, verified as a case (TC-004) instead of a feature.
* **Unused `personaTone` prop / `/data/*.json` client fetch** — documented as BUG-005 inside FEAT-010.
