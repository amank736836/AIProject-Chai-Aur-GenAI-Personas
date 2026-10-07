# FEAT-006 — Test data

| Purpose | Data | Location |
|---|---|---|
| Valid history payloads | 1-message, 2-message, 60-message transcripts | [`../../test-data/valid/chat-history.json`](../../test-data/valid/chat-history.json) |
| Invalid payloads | `null`, empty string, `A||B`, 10 KB string, invalid base64 | [`../../test-data/invalid/chat-history.json`](../../test-data/invalid/chat-history.json) |
| Unicode payload | Devanagari + emoji message pair | [`../../test-data/edge-cases/unicode-chat.json`](../../test-data/edge-cases/unicode-chat.json) |
| Cookie fixtures | `chatHistory-both` (valid), `personaData-test-persona` (object tone), `personaData-harness-reuse` (string tone) | [`../../test-data/fixtures/cookies.json`](../../test-data/fixtures/cookies.json) |

All fixtures are synthetic; no real conversation data.
