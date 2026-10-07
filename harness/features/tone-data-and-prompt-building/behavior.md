# FEAT-010 — Behaviour

## Branch 1 — built-in persona (`hitesh`, `piyush`, `both`)

1. Read the tone file(s); for `both`, concatenate the two `systemPrompt`s.
2. `promptBody = systemPrompt + linkInstructions + history + "User: <message>" + direct-answer instruction`.
3. Link instructions are generated from `toneData.links` (Hitesh: 4 links, Piyush: 5 links), each as
   *"If the user asks for your <label> link, always reply with: <url> (just the direct link, no extra text)."*

## Branch 2 — custom persona

1. Look up cookie `personaData-<persona>` and parse it.
2. If `cookieTone.tone` is truthy, use it as `toneData` and, **only if it is an object with `systemPrompt`**,
   use that as the system prompt.
3. Otherwise build the generic template:
   `You are acting as <name>. Tone guidelines: <styleNotes…> Common phrases to use… <history> User: … Reply as if you are <name>…`.

## History serialisation

```text
User: <first question>
Hitesh: <first answer>
User: <next question>
```

## Randomisation

`pickRandomNoRepeat()` keeps the last used signature line per persona in a module-level object
(`lastUsed`), so consecutive prompts differ — but the state is per server instance (RISK-008 with
concurrent requests).

## Observed quirks

* `getLinkInstructions()` closes over `toneData` before it is assigned in some branches (works today because
  the function is only called after assignment) — fragile ordering (`UNKNOWN / REQUIRES VALIDATION`: intended?).
* The generic template always contains empty "Tone guidelines" when a custom persona has no usable tone
  (visible in TC-032 evidence) — the LLM receives a persona *name* but no style.
* Link instruction matching for custom personas uses regexes built from platform keys plus the raw message.
