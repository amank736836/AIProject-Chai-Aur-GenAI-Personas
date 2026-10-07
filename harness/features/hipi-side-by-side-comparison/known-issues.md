# FEAT-002 — Known issues

| Ref | Issue | Severity | Status |
|---|---|---|---|
| [BUG-014](../../bugs/open/BUG-014.md) | Only the Hitesh reply is stored in `history` for `both` (`route.ts:62-65`), so the Piyush side of the conversation is not part of the next prompt. | High | Open |
| KI-007 | If one of the two provider calls fails, the entire request fails; there is no partial success path. | Medium | Open (by design, undocumented) |
| KI-004 | Both personas share one history cookie; long conversations exceed the 4 KB cookie limit first in HiPi mode. | Medium | Open |
| — | The "Prompt sent to AI" panel can display at most one prompt, so a HiPi turn's two prompts cannot both be inspected (related to BUG-004). | Low | Open |
