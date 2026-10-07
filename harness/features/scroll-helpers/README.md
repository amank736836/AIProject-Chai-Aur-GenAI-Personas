# FEAT-009 — Scroll helpers

*Documentation depth: condensed (README + test-cases).*

| Field | Value |
|---|---|
| Feature | FEAT-009 — Scroll helpers |
| Purpose | Help the user navigate long transcripts: scroll up/down buttons and a jump-to-latest button. |
| User | Demo visitor in a long conversation |
| Entry Point | `page.tsx` `useScrollHelpers()` (`chatDivRef`, `atTop`, `atBottom`, `scrollUp`, `scrollDown`) + `ChatArea.tsx` buttons |
| Dependencies | DOM scroll listeners on the chat container; `scrollIntoView({behavior:"smooth"})` |
| Inputs | Scroll events on `.pretty-scrollbar` container |
| Outputs | Visible/hidden buttons, 200 px scroll steps, auto-scroll to the newest reply |
| Business Rules | — |
| Expected Behavior | Up button appears when `scrollTop ≥ 10`, down button when not at the bottom, jump-to-latest always available and animated when a new reply arrives. |
| Error Handling | Guarded with `if (chatDivRef.current)`; no state errors. |
| Permissions | None |
| Related APIs | None |
| Related Database Tables | None — the project has no database ([database scenarios](../../test-scenarios/database.md)) |
| Related UI | `ChatArea.tsx` (`fixed right-6 bottom-32` button stack) |
| Existing Tests | None executed (no browser). TC-050 covers the manual checklist. |
| Missing Tests | All interaction logic: button visibility thresholds, smooth scrolling, auto-scroll on reply, behaviour on short transcripts. |
| Known Issues | Listener is registered once on mount while the container is rendered conditionally (`persona === "custom" && !customReady` branch renders different content) — `UNKNOWN / REQUIRES VALIDATION` whether the ref is attached on first paint. Buttons are not reachable when the chat area is short (they overlap the composer area at small heights). |

**Requirement status:** REQ-030 NOT_EXECUTED (manual).
