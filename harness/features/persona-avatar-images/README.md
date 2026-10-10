# FEAT-005 — Persona avatar images

*Documentation depth: condensed (README + test-cases).*

| Field | Value |
|---|---|
| Feature | FEAT-005 — Persona avatar images |
| Purpose | Give every persona button and message bubble an avatar — remote images for built-in personas, a generated one for custom personas. |
| User | Demo visitor (visual identity) |
| Entry Point | `POST /api/fetch-image` (`src/app/api/fetch-image/route.ts`); consumed in `page.tsx:170-186`, rendered by `PersonaSelector.tsx` / `ChatArea.tsx` |
| Dependencies | `source.unsplash.com` (primary, retired), `ui-avatars.com` (fallback), built-in avatar URLs in the two components |
| Inputs | `{name}` |
| Outputs | `{image}` — an absolute `https://` URL |
| Business Rules | — (no business rule; random colour/font selection is cosmetic) |
| Expected Behavior | Return a usable avatar URL; fall back to a generated one when the primary source fails; never return a broken/oversized image. |
| Error Handling | Missing `name` → 400; any fetch/HEAD error → deterministic fallback URL; malformed JSON → 500 (BUG-010). |
| Permissions | None. The endpoint performs a server-side HEAD request to an external host (`SSRF-shaped surface` limited to a fixed host template, `UNKNOWN / REQUIRES VALIDATION`). |
| Related APIs | `POST /api/fetch-image` |
| Related Database Tables | None — the project has no database ([database scenarios](../../test-scenarios/database.md)) |
| Related UI | `PersonaSelector.tsx`, `ChatArea.tsx`, `page.tsx` (500 KB size check, `/file.svg` default) |
| Existing Tests | TC-022, TC-023, TC-026 (executed) |
| Missing Tests | Real image download and rendering (TC-025, blocked offline), fallback trigger determinism, oversized-image rejection in the browser (manual). |
| Known Issues | Primary upstream retired in 2024 → the unsplash path is effectively dead (BUG-018); random palette means non-reproducible avatar URLs; built-in avatar URLs are third-party CDNs that can break (no local fallback except Custom). |

**Requirement status:** REQ-020 PASS · REQ-021 PARTIAL (BUG-018) · REQ-022 NOT_EXECUTED (manual).
