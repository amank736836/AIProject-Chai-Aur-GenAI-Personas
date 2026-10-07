# Bugs

Defects found while building and running this harness. Every bug is a real, reproducible observation from commit
`d24eb41` unless its **Environment** field says otherwise. Nothing here is a guess: a bug without evidence or a
reproduction does not belong in this folder.

```text
bugs/
├── README.md          <- you are here (index + template + rules)
├── open/              BUG-001 … BUG-018 (all currently open)
├── resolved/          bugs whose fix has been verified (empty today)
└── known-issues.md    KI-* design limitations and RISK-* accepted risks (not bugs)
```

## Bug index

| ID | Title | Severity | Priority | Feature | Status |
|---|---|---|---|---|---|
| [BUG-001](open/BUG-001.md) | `/api/clear-history` is called by the UI but does not exist (404) | Medium | P1 | FEAT-013 | OPEN |
| [BUG-002](open/BUG-002.md) | Saved chat is never restored: writer and loader use different formats | High | P0 | FEAT-006 | OPEN |
| [BUG-003](open/BUG-003.md) | `btoa()` crashes on non-Latin1 chat text, so the cookie is never written | High | P1 | FEAT-006 | OPEN |
| [BUG-004](open/BUG-004.md) | Prompt transparency never receives data (`prompt` is never returned; `debugPrompt` ignored) | Medium | P1 | FEAT-007, FEAT-010 | OPEN |
| [BUG-005](open/BUG-005.md) | Client fetches `/data/*-tone.json` which the server never exposes (404) and discards the result | Low | P2 | FEAT-010 | OPEN |
| [BUG-006](open/BUG-006.md) | Custom persona tone (string) is ignored by the prompt builder | High | P0 | FEAT-004, FEAT-010 | OPEN |
| [BUG-007](open/BUG-007.md) | `@handle` persona tone is never found (cookie key mismatch) | High | P1 | FEAT-004 | OPEN |
| [BUG-008](open/BUG-008.md) | Custom-persona chat history is never read back | Medium | P1 | FEAT-006, FEAT-004 | OPEN |
| [BUG-009](open/BUG-009.md) | "Only working links" verification is unreachable dead code | Medium | P2 | FEAT-004, FEAT-010 | OPEN |
| [BUG-010](open/BUG-010.md) | Malformed JSON body → unhandled 500 instead of 400 | Medium | P1 | FEAT-012 | OPEN |
| [BUG-011](open/BUG-011.md) | Whitespace-only message passes validation | Low | P2 | FEAT-012 | OPEN |
| [BUG-012](open/BUG-012.md) | Persona creation reports success when tone generation failed | High | P1 | FEAT-004 | OPEN |
| [BUG-013](open/BUG-013.md) | 500 responses leak provider error text and environment-variable names | Medium | P1 | FEAT-012, FEAT-011 | OPEN |
| [BUG-014](open/BUG-014.md) | HiPi history stores only the Hitesh reply | High | P1 | FEAT-002, FEAT-006 | OPEN |
| [BUG-015](open/BUG-015.md) | Cookie name is built from unsanitised input (`;` becomes an attribute) | Medium | P2 | FEAT-004 | OPEN |
| [BUG-016](open/BUG-016.md) | Persona name is interpolated into a `RegExp` unescaped | Low | P2 | FEAT-004, FEAT-006 | OPEN |
| [BUG-017](open/BUG-017.md) | Critical/high advisories in production dependencies (`next@15.4.10`) | Critical | P0 | platform / release | OPEN |
| [BUG-018](open/BUG-018.md) | Primary avatar upstream (`source.unsplash.com`) was retired | Low | P3 | FEAT-005 | OPEN |

Summary: 1 Critical · 7 High · 7 Medium · 3 Low = 18 open bugs. Severity = user impact; Priority = order of work.

## Template (copy this, do not invent fields)

```markdown
# BUG-### — <title>

| Field | Value |
|---|---|
| Bug ID | BUG-### |
| Title | … |
| Severity | Critical | High | Medium | Low |
| Priority | P0 | P1 | P2 | P3 |
| Feature | FEAT-### (+ related cases) |
| Environment | commit, runtime, server mode, credentials available or not |
| Preconditions | state needed to reproduce |
| Steps to Reproduce | numbered, copy-pasteable |
| Expected | observable correct behaviour |
| Actual | observed behaviour, with the exact output |
| Reproducible | YES | NO | INTERMITTENT |
| Evidence | path(s) under ../../evidence/ or code references |
| Root Cause | `file:line` plus the mechanism |
| Fix | concrete suggested change (never applied by the harness) |
| Regression Test | TC-### that must guard the fix |
| Status | OPEN | IN_PROGRESS | FIXED | VERIFIED | CLOSED |
```

## Rules

1. **Every bug has a regression test pointer.** If no case exists yet, create it first (that is the point of the
   pointer) and record it as PLANNED/MANUAL if it cannot run yet.
2. **Root cause is code-level.** `file:line` and the mechanism; "the app misbehaves" is not a root cause.
3. **Severity ≠ Priority.** Severity is impact on the user, priority is when to fix it (e.g. a critical advisory
   on an unused code path can still be P0 for a public deployment).
4. **No fixes in the harness.** The `Fix` field is a suggestion; changing application code is a separate,
   reviewed change. When a fix lands: move the file to `resolved/`, set `Status: FIXED`, run the regression test,
   then set `Status: VERIFIED` and re-run the linked suite.
5. **Never delete a bug.** Superseded or invalid findings are marked `CLOSED` with the reason and stay visible.
6. Design limitations and accepted risks are **not** bugs — they live in [`known-issues.md`](known-issues.md).

## Status vocabulary

| Status | Meaning |
|---|---|
| OPEN | reproduced, not being worked on |
| IN_PROGRESS | a fix is being written elsewhere (no fix is applied by the harness) |
| FIXED | code changed; awaiting verification against the regression test |
| VERIFIED | the linked regression test passes on the fixed code in a recorded run |
| CLOSED | invalid, duplicate or intentionally accepted — reason recorded |
