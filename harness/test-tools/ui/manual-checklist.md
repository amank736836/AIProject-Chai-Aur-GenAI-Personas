# Manual UI checklist (executable without tooling)

**Preconditions:** dev server running (`npm run dev`), a browser, and — for reply-dependent steps — provider
credentials configured. Record the run id, commit and browser version, then attach screenshots to
`../../evidence/screenshots/`.

| # | Steps | Expected | Case | Screenshot |
|---|---|---|---|---|
| 1 | Open `http://localhost:3000/` | Title "Persona LLM Chat", four persona buttons, HiPi highlighted, "Start the conversation!" visible, composer enabled | TC-039, TC-040, TC-041 | `TC-039-home.png` |
| 2 | Click Hitesh → Piyush → Custom → HiPi | Transcript clears on each switch; active ring follows the click; for Custom the composer is disabled until a persona is created | TC-044 | `TC-044-persona-switch.png` |
| 3 | Type a question, click Send | One user bubble; animated "…is thinking" dots; Send becomes "Waiting…"; input disabled | TC-045 | `TC-045-thinking.png` |
| 4 | Again, press Enter instead of clicking | Message sends once (no double send) | TC-045 | — |
| 5 | Ask a persona for its GitHub/LinkedIn link | Reply contains a URL; copy icon → clipboard contains the URL and the button shows "Copied!" for ~1.2 s; "Visit" opens a new tab | TC-048 | `TC-048-copied.png` |
| 6 | Send enough messages to overflow, then scroll | "Scroll up" appears below 10 px from the top, "Scroll down" when not at the bottom, jump-to-latest animates back | TC-050 | `TC-050-scroll-buttons.png` |
| 7 | Force an error (stop the dev server or unset provider keys) and send a message | Error text appears **inside** the reply card; input re-enabled; no browser alert/dialog | TC-046 | `TC-046-error-state.png` |
| 8 | Repeat step 7 with dev-tools network offline | "Network error." placeholder | TC-046 | — |
| 9 | Select Custom, enter `Test Persona`, click Create Persona | Progress text for ~2 s, avatar appears, composer unlocks; afterwards ask a question — *known defect*: the reply will not reflect the created tone (BUG-006) | TC-051 | `TC-051-custom-persona.png` |
| 10 | Reload the page after a chat | *Known defect*: the transcript is **not** restored (BUG-002) | TC-056 | — |
| 11 | Resize to 375 px, 768 px, 1440 px (repeat in dark mode) | No horizontal scroll, persona row wraps, composer and buttons remain reachable | TC-053 | three PNGs |
| 12 | Keyboard only: Tab through the page and activate with Enter/Space | Visible focus ring everywhere; persona buttons activate; *gap*: the selected persona is not announced (`aria-pressed` missing) | TC-052 | — |
| 13 | Open the "Prompt sent to AI" panel after a reply | *Known defect*: the panel never appears because no route returns the prompt (BUG-004) | TC-047 | `TC-047-prompt-panel.png` |
| 14 | Watch for console errors during the whole session | No uncaught exceptions (expect the cookie `InvalidCharacterError` when a Hindi message is saved — BUG-003) | — | console log text file |

**Bug reporting:** capture the exact text/JSON, the timestamp, the run id and attach the evidence, then file
`BUG-*` using the template in [`../../bugs/README.md`](../../bugs/README.md).
