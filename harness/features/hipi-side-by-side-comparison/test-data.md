# FEAT-002 — Test data

| Purpose | Value |
|---|---|
| Request | `{"message":"Explain closures in one line","persona":"both"}` |
| History cookie | `chatHistory-both=[{"role":"user","content":"…"},{"role":"assistant","content":"…"}]` (URL-encoded) |
| Comparison question set | [`../../test-data/valid/chat-requests.json`](../../test-data/valid/chat-requests.json) (`both` entries) |
| Tone fixtures | `data/hitesh-tone.json`, `data/piyush-tone.json` (real project data) |

For a Hindi-vs-English tone check use messages containing Devanagari text — relevant because the client-side
cookie writer cannot encode non-Latin1 text (BUG-003).
