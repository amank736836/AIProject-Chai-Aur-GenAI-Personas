# API testing tools

## Automated (preferred)

```bash
node --test "harness/automation/api/*.test.mjs"        # 32 cases, ~2 s, TAP output
```

* Runner: Node's built-in test runner (`node:test`) — no install needed.
* Helpers: [`../../automation/utilities/http.mjs`](../../automation/utilities/http.mjs)
  (`postJson`, `getUrl`, `serverReachable`, `hasProviderKeys`, `writeEvidence`).
* Cases: `chat.api.test.mjs` (TC-001…TC-010), `create-persona.api.test.mjs` (TC-015…TC-021),
  `fetch-image.api.test.mjs` (TC-022…TC-026), `security.api.test.mjs` (TC-064…TC-071, TC-075, TC-082),
  `app-endpoints.api.test.mjs` (TC-054).
* Output: TAP lines prefixed `ok` / `not ok`, each carrying its `TC-*` id, plus `# SKIP` and `# TODO`
  markers. Evidence files are written to `../../evidence/api-responses/`.

## Manual curl recipes

```bash
BASE=http://localhost:3000

# 1. validation error
curl -s -X POST $BASE/api/chat -H 'Content-Type: application/json' -d '{}' -w '\nHTTP %{http_code}\n'

# 2. happy path (needs GROQ_API_KEY)
curl -s -X POST $BASE/api/chat -H 'Content-Type: application/json' \
     -d '{"message":"Say hi in one word","persona":"hitesh"}' -D - -w '\nHTTP %{http_code}\n'

# 3. malformed JSON (BUG-010)
curl -s -X POST $BASE/api/chat -H 'Content-Type: application/json' -d 'not-json' -w '\nHTTP %{http_code}\n'

# 4. cookie reuse (TC-021)
curl -s -X POST $BASE/api/create-persona -H 'Content-Type: application/json' \
     -H 'Cookie: personaData-harness-reuse=%7B%22name%22%3A%22Harness%20Reuse%22%2C%22tone%22%3A%22PRESET-TONE-FROM-COOKIE%22%7D' \
     -d '{"name":"Harness Reuse"}'

# 5. CORS / headers / methods
curl -si -X OPTIONS $BASE/api/chat -H 'Origin: https://evil.example' | head -8
curl -si $BASE/api/chat | head -3
```

## Limitations

* No request signing/mocking layer: provider behaviour is only testable with real keys (or by their absence).
* No JSON-schema validation library: assertions are hand-written per field.
* Rate-limit (429) behaviour cannot be induced without provider credentials (TC-010 stays NOT_EXECUTED).
