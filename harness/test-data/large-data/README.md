# Large-data fixtures

Two kinds of "large" matter for this project, and neither is stored as a committed blob (the harness keeps large
generated artefacts out of Git — see [`../../test-tools/setup.md`](../../test-tools/setup.md) §rules):

1. **Oversized request bodies** — used to prove the missing payload cap (`RISK-002`, case TC-006). Generate them
   at test time:

   ```bash
   # 100 KB message (well past anything the UI can produce)
   node -e 'process.stdout.write(JSON.stringify({message:"a".repeat(100000),persona:"hitesh"}))' \
     > /tmp/oversized-message.json
   curl -s -o /dev/null -w '%{http_code}\n' -X POST http://localhost:3000/api/chat \
     -H 'Content-Type: application/json' --data @/tmp/oversized-message.json

   # 1 MB message (boundary probe: is there any limit at all?)
   node -e 'process.stdout.write(JSON.stringify({message:"a".repeat(1000000),persona:"hitesh"}))' \
     > /tmp/megabyte-message.json
   ```

   Observed on RUN-2026-001: no size limit is enforced; the request is forwarded to the provider layer
   (evidence in [`../../evidence/api-responses/TC-006-chat-oversized-body.json`](../../evidence/api-responses/TC-006-chat-oversized-body.json)).

2. **Transcript growth** — the cookie ceiling (`KI-004`, ~4 KB per cookie) is reached by real usage, not by a
   crafted payload. [`long-history.json`](long-history.json) is a 20-turn transcript in the exact shape the app
   writes (`{role,content}` pairs), used by TC-059 to check what survives encoding and where a browser would
   start dropping the cookie.

| File | Size | Used by |
|---|---|---|
| `long-history.json` | ~2 KB (20 turns) | TC-059, TC-061, KI-004 checks |
| generated at test time | 100 KB / 1 MB | TC-006, `RISK-002` |
