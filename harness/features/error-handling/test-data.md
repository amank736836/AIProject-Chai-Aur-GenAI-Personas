# FEAT-012 — Test data

| Case class | Payload |
|---|---|
| Missing field | `{}` |
| Malformed JSON | `not-json`, `}`, empty body |
| Whitespace | `{"message":"   "}`, `{"message":"\t\n"}` |
| Wrong type | `{"message":123}`, `{"message":{"a":1}}`, `{"message":["x"]}` |
| Oversized | 51,200-character message (TC-006) |
| Method | `GET /api/chat`, `OPTIONS /api/chat` |
| Provider failure | achieved in this environment by running without provider keys (real 500 path) |
| Rate limit | requires a live quota/throttle — `NOT_EXECUTED` |

Files: [`../../test-data/invalid/`](../../test-data/invalid/) and
[`../../test-data/edge-cases/edge-values.json`](../../test-data/edge-cases/edge-values.json).
