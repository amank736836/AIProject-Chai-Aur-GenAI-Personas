# Integration scenarios

| SCN | Scenario | Boundaries | Priority | Cases | Status |
|---|---|---|---|---|---|
| SCN-047 | Frontend → backend: `page.tsx` request body (`message`, `persona`, `customName`, `debugPrompt`) is accepted and interpreted correctly. | Browser → `/api/chat` | P0 | TC-008, TC-001 | PARTIAL |
| SCN-048 | Backend → external services: `@handle` enrichment over 10 public platforms. | `/api/create-persona` → Instagram/YouTube/… | P1 | TC-020 | BLOCKED (network) |
| SCN-049 | Backend ↔ cookies: history written on response, replayed on the next request, per persona. | Client cookie jar ↔ `/api/chat` | P1 | TC-055, TC-011, TC-063 | FAIL (BUG-008 read-side) |
| SCN-050 | Backend → provider chain: Groq primary, Gemini fallback on throttling. | `/api/chat` → Groq/Gemini | P0 | TC-010, TC-005 | PARTIAL |
| SCN-051 | API → UI error propagation: each server error class produces the matching placeholder text. | API → `page.tsx` | P1 | TC-046, TC-005 | NOT_EXECUTED (manual) |
| SCN-052 | Frontend → `/api/fetch-image` → third-party CDN → `<img>` render (with `/file.svg` fallback). | Browser → API → CDN | P2 | TC-023, TC-025 | PARTIAL (CDN blocked offline) |
| SCN-053 | Persona data files → prompt → provider: tone data actually shapes the reply. | `data/*.json` → `prompt.js` → provider | P0 | TC-027, TC-030 | PARTIAL (prompt proven, reply not) |
| SCN-054 | Custom persona end-to-end: create → cookie → chat → tone applied → history stored. | Client → 2 APIs → provider | P1 | TC-012, TC-011 | FAIL (BUG-006/007/008) |
| SCN-055 | Avatar fallback chain: unsplash → ui-avatars → `/file.svg`, including the 500 KB rejection. | API → CDN → UI | P2 | TC-026, TC-052 | PARTIAL |
| SCN-056 | Unload beacon: `sendBeacon` → `/api/clear-history` → cookies cleared. | Browser → API | P2 | TC-054 | FAIL (BUG-001) |
