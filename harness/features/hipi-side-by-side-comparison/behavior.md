# FEAT-002 — Behaviour

1. The client sends one message with `persona: "both"`.
2. The server builds **two** prompts from `data/hitesh-tone.json` and `data/piyush-tone.json`
   (`buildPrompt("hitesh"…)`, `buildPrompt("piyush"…)`), each including the shared `prevHistory`.
3. Both provider calls run concurrently (`Promise.all`), so latency ≈ the slower single call, not the sum.
4. The response contains `hitesh`, `piyush` and `history`; only the Hitesh reply is appended to `history`.
5. `chatHistory-both` is set (`HttpOnly; SameSite=Lax; Max-Age=2592000`).
6. The client replaces the "Hitesh is thinking… / Piyush is thinking…" placeholder with the two replies in
   blue (left, Hitesh) and purple (right, Piyush) cards; URLs become copy/visit links.

Measured prompt size without history: Hitesh ≈ 7.9 KB, HiPi ≈ 14.0 KB of characters (unit probe) — roughly
3.5–4 K tokens, well within both providers' context windows but the largest prompt the app can produce.
