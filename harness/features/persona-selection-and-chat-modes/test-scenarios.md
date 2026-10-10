# FEAT-001 — Test scenarios

| SCN | Type | Scenario | Test cases |
|---|---|---|---|
| SCN-001 | Smoke | Open `/` and confirm all four persona options render with HiPi active. | TC-039, TC-040, TC-041 |
| SCN-009 | Functional | Switch between HiPi → Hitesh → Piyush → Custom and confirm the transcript clears and the active styling follows. | TC-044 (manual) |
| SCN-035 | Edge | Select Custom and interact before a persona is created (input disabled, no request fired). | TC-051 (manual) |
| SCN-067 | UI | Keyboard-only persona switching (Tab to button, Enter/Space activates, focus ring visible). | TC-052 (manual) |
| SCN-096 | Regression | After custom-persona work, built-in buttons still produce the right request bodies. | TC-014 |

Cross-module scenarios that also exercise this feature: SCN-002 (smoke), SCN-020 (responsive layout).
