/**
 * Endpoints the client calls but the app does not (yet) implement.
 * Source of truth for the beacons: src/app/page.tsx (beforeunload handler).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { postJson, serverReachable, writeEvidence } from "../utilities/http.mjs";

const up = await serverReachable();
const skip = up ? false : "server not reachable";

test("TC-054 [app-endpoints] POST /api/clear-history exists for the unload beacon (BUG-001)", { skip, todo: "BUG-001" }, async () => {
  const res = await postJson("/api/clear-history", { persona: "all" });
  writeEvidence("TC-054-clear-history.json", { status: res.status, body: res.json, redirect: res.headers.get("location") });
  assert.ok(res.status < 400, `page.tsx sends this beacon on every unload, but HTTP ${res.status} is returned`);
});
