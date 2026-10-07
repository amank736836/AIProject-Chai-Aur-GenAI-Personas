# FEAT-006 — Behaviour

## Server side (works, per code reading)

* `getHistoryFromCookies()` reads the raw `Cookie` header and matches `` `${cookieName}=([^;]+)` `` with
  `cookieName = chatHistory-<persona|slug>` (empty string when `persona` is neither `custom` nor a built-in —
  see BUG-008). Malformed JSON → `[]`.
* After a successful LLM call the handler appends `{role:"user"} / {role:"assistant"}` and sets the cookie.
* Cookie flags: `Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000` (no `Secure` — TC-074 observation).

## Client side (broken, proven by unit probe)

| Step | Code | Observed |
|---|---|---|
| Save | `setCookie("chatHistory", btoa(JSON.stringify(chat)))` | writes `chatHistory=<base64>` (URL-encoded) |
| Load | `const [hash, encoded] = val.split("|"); if (!encoded) return null;` | always `null` because the writer never emits a `|` |
| Non-Latin1 text | `btoa(json)` | throws `InvalidCharacterError`, aborting the save effect (Hindi/emoji messages) |
| Extra | `hashData()` (SHA-256) exists but is never called | dead code |

## Limits

* Browsers cap a cookie at ≈4096 bytes; a 60-message synthetic transcript encodes to >4096 bytes (TC-059).
* `document.cookie` writes are silent — an oversized/refused cookie simply disappears.
* Two tabs share the cookie jar; the last write wins (`UNKNOWN / REQUIRES VALIDATION`: no multi-tab design).
