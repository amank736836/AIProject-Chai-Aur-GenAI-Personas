# Authorization fixture

**There is no authentication or authorization in this project** (`RISK-001`): all three API routes are public,
anonymous and stateless, and the only "identity" is the caller's own cookie jar. This folder therefore does not
contain credentials or role matrices — inventing them would misrepresent the app.

What it contains instead is the set of *access probes* used to prove that absence and to show what a request
looks like at each level of (non-)privilege, as consumed by the security cases.

| Probe | Meaning | Case |
|---|---|---|
| no headers, no cookies | an anonymous internet caller | TC-064 |
| `Cookie: chatHistory-hitesh=...` (own jar) | a returning browser talking to its own data | TC-058…TC-063 |
| a cookie for a persona that does not exist | an unknown persona name — must not crash or leak | TC-014, TC-034 |
| elevated/role headers (`Authorization: Bearer …`, `X-Admin: true`) | proves such headers are ignored, not honoured | TC-064, TC-069 |
| cross-origin `Origin: https://evil.example` | proves no permissive CORS or CSRF token assumptions | TC-066, TC-067 |

`anonymous-requests.json` holds the exact header/body shapes used by those probes so they can be replayed with
`curl -H @` style tooling. No secret, token or personal data is present: the `Authorization` value is a literal
placeholder to demonstrate that the header has no effect.
