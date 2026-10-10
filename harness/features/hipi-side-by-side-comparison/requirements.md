# FEAT-002 — Requirements

| ID | Requirement | Source | Status |
|---|---|---|---|
| REQ-008 | `persona=both` must return both a `hitesh` and a `piyush` reply in one response. | `chat/route.ts:47-91` | BLOCKED (credentials, TC-008) |
| REQ-002 (part) | HiPi must be the default mode on first load. | `page.tsx` `useState('both')` | PASS (SSR, TC-040/TC-045) |
| REQ-011 (part) | HiPi history must persist in the `chatHistory-both` cookie. | `chat/route.ts:79-90` | BLOCKED (credentials, TC-011) |
| BR-002 | The HiPi prompt merges both personas' tone data and signs as "HiPi". | `prompt.js` (`persona === "both"`) | PASS (unit, TC-028) |
