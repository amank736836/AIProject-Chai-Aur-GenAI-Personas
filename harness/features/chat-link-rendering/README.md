# FEAT-008 — Link rendering, copy & visit

*Documentation depth: condensed (README + test-cases).*

| Field | Value |
|---|---|
| Feature | FEAT-008 — Link rendering, copy & visit |
| Purpose | Make URLs inside persona replies usable: clickable, copyable, and openable in a new tab. |
| User | Demo visitor following a persona's recommended links |
| Entry Point | `src/app/components/ChatArea.tsx` — `renderTextWithLinks()`, `CopyableLink()`, `VisitButton()` |
| Dependencies | Browser Clipboard API (`navigator.clipboard.writeText`), regex `/(https?:\/\/[^\s]+)/g` |
| Inputs | Reply text (Markdown is **not** parsed) |
| Outputs | `<a target="_blank" rel="noopener noreferrer">` + copy button that shows "Copied!" for 1.2 s + "Visit" button |
| Business Rules | BR-009 (exact URLs come from the prompt, not from the renderer) |
| Expected Behavior | Every `http(s)://…` token becomes a link with copy/visit affordances; plain text is untouched; copying needs no permission prompt and gives feedback. |
| Error Handling | Clipboard failures are unhandled (`await navigator.clipboard.writeText` can reject, e.g. insecure context) — `UNKNOWN / REQUIRES VALIDATION` (not executed in a browser). |
| Permissions | Clipboard write permission (browser-managed). |
| Related APIs | None (client-only rendering) |
| Related Database Tables | None — the project has no database ([database scenarios](../../test-scenarios/database.md)) |
| Related UI | `ChatArea.tsx` reply cards (Hitesh/Piyush/Custom) |
| Existing Tests | TC-049 (static: `rel="noopener noreferrer"` present) |
| Missing Tests | Copy success/failure, "Copied!" state timing, links with trailing punctuation, URLs longer than the bubble (TC-048 manual). |
| Known Issues | Trailing punctuation/`)` is included in the URL; Markdown links are not parsed; clipboard errors are silent. |

**Requirement status:** REQ-024 PARTIAL (static checks pass, interaction NOT_EXECUTED).

Note: link *safety* is inherited from the prompt — the renderer never validates a URL, it only renders
`http(s)` schemes (so `javascript:` URLs cannot be produced by the regex).
