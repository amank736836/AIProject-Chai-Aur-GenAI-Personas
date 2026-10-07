# UI scenarios

No browser runtime is available in the test environment (`KI-005`); SSR/static checks are automated, the rest
are manual cases in [`../test-tools/ui/manual-checklist.md`](../test-tools/ui/manual-checklist.md).

| SCN | Scenario | Feature | Priority | Cases | Status |
|---|---|---|---|---|---|
| SCN-067 | Keyboard-only operation: tab order, Enter/Space activation, visible focus rings on all controls. | FEAT-001, FEAT-014 | P2 | TC-052 | NOT_EXECUTED (manual) |
| SCN-068 | Prompt panel toggle collapses/expands and reports `aria-expanded`. | FEAT-007 | P2 | TC-047 | NOT_EXECUTED (manual) |
| SCN-069 | Link copy sets the clipboard and shows "Copied!" for ~1.2 s; Visit opens a new tab. | FEAT-008 | P2 | TC-048 | NOT_EXECUTED (manual) |
| SCN-070 | Scroll buttons appear at the documented thresholds and scroll by 200 px / to the newest reply. | FEAT-009 | P2 | TC-050 | NOT_EXECUTED (manual) |
| SCN-071 | Responsive layout at 375 px, 768 px and 1440 px: no overlap, readable transcript, usable composer. | FEAT-014 | P1 | TC-053 | NOT_EXECUTED (manual) |
| SCN-072 | Dark-mode variants render legibly (Tailwind `dark:` classes are present but untoggleable). | FEAT-014 | P3 | TC-053 | NOT_EXECUTED (manual) |
| SCN-073 | Animations: waiting dots, blob background, persona roll; no motion sickness mitigations exist (`prefers-reduced-motion`). | FEAT-014 | P3 | — | NOT_EXECUTED |
| SCN-074 | Long replies: transcript scrolls inside `max-h-[60vh]`, links wrap, copy buttons stay reachable. | FEAT-008, FEAT-014 | P2 | TC-048 | NOT_EXECUTED |
| SCN-075 | Avatar failure renders `/file.svg` instead of a broken image (Custom persona). | FEAT-005 | P2 | TC-023 | NOT_EXECUTED (manual) |
| SCN-076 | Reload/back-forward: state resets to HiPi and the transcript is (not) restored — see FEAT-006. | FEAT-001, FEAT-006 | P2 | TC-056 | FAIL (BUG-002) |
