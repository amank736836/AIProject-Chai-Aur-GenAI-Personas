# FEAT-001 — Behaviour

## Flow

1. `page.tsx` mounts with `persona = 'both'`; `PersonaSelector` renders four buttons with the active one ringed
   and glowing (`ring-2 ring-cyan-400 animate-glow-pulse`).
2. A click calls `setPersona(p)` which sets the state **and** clears the transcript (`setChat([])`).
3. `MessageInput` is disabled when `persona === 'custom'` and `!customReady`.
4. `ChatArea` renders its layout per mode: `both` → two columns (Hitesh blue/left, Piyush purple/right);
   single persona → the matching card; `custom` → the custom card keyed by `customName`.
5. Sending a message posts `{message, persona, customName}` to `/api/chat`; the server branches on `persona`:
   `hitesh|piyush|both` → tone-JSON prompt; anything else → custom/cookie prompt.

## Edge behaviour observed in code

* Clicking the already-active persona still clears the transcript (no guard).
* The active persona is not persisted; a reload always returns to HiPi (localStorage is not used).
* The Custom avatar falls back to `/file.svg` on load error (`onError` handler).
* `persona` values are not validated client-side; the server treats unknown strings as custom personas.

## State

| State | Owner | Reset condition |
|---|---|---|
| `persona` | `page.tsx` | never (starts as `both`) |
| `chat` | `page.tsx` | persona change, page reload |
| `customName`, `customReady`, `creatingPersona`, `customImage` | `page.tsx` | neither cleared on persona switch (`UNKNOWN / REQUIRES VALIDATION`: intended?) |
