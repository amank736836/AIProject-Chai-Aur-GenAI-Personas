# FEAT-004 — Test data

| Purpose | Data | Location |
|---|---|---|
| Valid names | `Test Persona`, `Harness Probe`, `Harness Reuse`, `@amank736836` (public handle from README) | [`../../test-data/sample-data/persona-names.json`](../../test-data/sample-data/persona-names.json) |
| Invalid names | `""`, `null`, `{}`, `"   "` | [`../../test-data/invalid/create-persona-requests.json`](../../test-data/invalid/create-persona-requests.json) |
| Injection-ish names | `x; Path=/evil`, `.*`, `a=b`, very long (256 chars), Unicode/emoji | [`../../test-data/edge-cases/edge-values.json`](../../test-data/edge-cases/edge-values.json) |
| Cookie fixtures | `personaData-harness-reuse` containing a preset tone; `personaData-@handle` with object tone | [`../../test-data/fixtures/cookies.json`](../../test-data/fixtures/cookies.json) |

Never use real people's private data. `@amank736836` is the maintainer handle published in the project README;
profile content is public. No credentials are stored here — provider keys come from the environment.
