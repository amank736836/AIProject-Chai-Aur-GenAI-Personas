# FEAT-010 — Test data

| Purpose | Data |
|---|---|
| Tone files | `data/hitesh-tone.json` (13,367 B), `data/piyush-tone.json` (9,735 B) — real project data, read-only |
| Personas | `hitesh`, `piyush`, `both`, `test-persona`, `someone-new`, `amank736836`, `@amank736836` |
| Cookie fixtures | see [`../../test-data/fixtures/cookies.json`](../../test-data/fixtures/cookies.json) |
| Messages | `kya haal hai?`, `aapka LinkedIn link bhejo`, empty string, 5 KB string, Devanagari text, injection attempt |
| History fixtures | 0 / 2 / 20 turns in `User:`/`assistant` shape |
| Prohibited | Real API keys (use `GROQ_API_KEY` env var), real private profile data |

Prompt sizes measured: Hitesh 7,873–7,886 chars (varies with the random signature line), HiPi 14,043 chars.
