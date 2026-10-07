# Test Data

Reusable, credential-free fixtures. **No secrets, no real passwords, no tokens, no private personal data** —
provider keys come from the environment (`GROQ_API_KEY`, `GOOGLE_GENERATIVE_AI_API_KEY`) and fixtures use
placeholders such as `${TEST_USER_EMAIL}` if an auth system is ever added.

```
test-data/
├── valid/         request bodies and payloads that should be accepted
├── invalid/       payloads that must be rejected or handled gracefully
├── edge-cases/    boundaries, Unicode, special characters, large values
├── large-data/    oversized/long fixtures and their generators (TC-006, KI-004)
├── authorization/ access probes proving there is no authn/authz (TC-064…TC-067)
├── performance/   exact request shapes behind the latency baselines (NFR-007/NFR-008)
├── sample-data/   persona names/handles used across suites
└── fixtures/      cookie jars and pre-baked cookies for cookie-dependent cases
```

This mirrors the standard split (valid / invalid / edge / large / authorization / performance) with two
deliberate adaptations: large payloads are **generated** rather than committed (they are throwaway megabytes, and
Git should not carry them), and the "authorization" set is a set of *absence* probes because the application has
no authentication to test against.

| File | Used by |
|---|---|
| [`valid/chat-requests.json`](valid/chat-requests.json) | TC-007, TC-008, TC-009, TC-014 |
| [`valid/chat-history.json`](valid/chat-history.json) | TC-029, TC-056, TC-059 |
| [`invalid/chat-requests.json`](invalid/chat-requests.json) | TC-001, TC-002, TC-003, TC-024 |
| [`invalid/create-persona-requests.json`](invalid/create-persona-requests.json) | TC-015, TC-016, TC-017 |
| [`invalid/chat-history.json`](invalid/chat-history.json) | TC-060, TC-061 |
| [`edge-cases/edge-values.json`](edge-cases/edge-values.json) | TC-006, TC-019, TC-036, TC-038 |
| [`edge-cases/unicode-chat.json`](edge-cases/unicode-chat.json) | TC-057, TC-038 |
| [`sample-data/persona-names.json`](sample-data/persona-names.json) | TC-018, TC-020, TC-021, TC-051 |
| [`fixtures/cookies.json`](fixtures/cookies.json) | TC-021, TC-031, TC-032, TC-033, TC-063 |
| [`large-data/long-history.json`](large-data/long-history.json) | TC-059 (cookie ceiling, KI-004) |
| [`large-data/README.md`](large-data/README.md) | TC-006 generators (100 KB / 1 MB bodies) |
| [`authorization/anonymous-requests.json`](authorization/anonymous-requests.json) | TC-064, TC-066, TC-067 |
| [`performance/requests.json`](performance/requests.json) | `automation/performance/api-latency.mjs` |

## Rules

1. Fixtures are inert data — never executable, never contain keys, never contact the network.
2. Any real-world handle used (e.g. `@amank736836`) comes from the project README and is public.
3. When adding a fixture, list it in the table above and reference it from the case that consumes it.
4. Prefer environment variables for anything machine- or account-specific.
