# FEAT-014 — UI shell, responsiveness & accessibility

*Documentation depth: condensed (README + test-cases).*

| Field | Value |
|---|---|
| Feature | FEAT-014 — UI shell, responsiveness & accessibility |
| Purpose | Provide the polished, animated, responsive presentation layer (glassmorphism, gradient blobs, scrollable chat, input ergonomics). |
| User | Demo visitor on desktop and mobile |
| Entry Point | `src/app/layout.tsx` (metadata, Geist fonts), `src/app/globals.css` (246 lines of utilities/animations), all components under `src/app/components/` |
| Dependencies | Tailwind CSS v4, `next/font/google`, inline SVG icons |
| Inputs | User interaction (clicks, typing, scrolling) |
| Outputs | Rendered layout, animations, empty states, disabled states, focus rings |
| Business Rules | BR-012 (in-transcript errors, no dialogs) |
| Expected Behavior | Layout works from 375 px upward; input is disabled while thinking with a waiting indicator; Enter sends; empty state invites conversation; focus is visible on every interactive element. |
| Error Handling | n/a (presentation layer). |
| Permissions | None |
| Related APIs | n/a |
| Related Database Tables | None — the project has no database ([database scenarios](../../test-scenarios/database.md)) |
| Related UI | Every component |
| Existing Tests | TC-039 … TC-042 (SSR shell, empty state, input), TC-049 (link attributes) |
| Missing Tests | Responsive breakpoints (TC-053), keyboard-only flows (TC-052), reduced-motion support (no `prefers-reduced-motion` rules exist), contrast measurement, loading/animation states (TC-045/TC-046). |
| Known Issues | No `prefers-reduced-motion` handling despite heavy animation; persona buttons expose no selection state to AT (no `aria-pressed`); CLS/LCP not measured; the chat container is `max-h-[60vh]` which truncates very long replies visually. |

**Requirement status:** REQ-027 NOT_EXECUTED · REQ-028 NOT_EXECUTED · REQ-029 PARTIAL (SSR) ·
NFR-009 NOT_EXECUTED · NFR-010 PARTIAL (static review).
