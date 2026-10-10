/**
 * API contract tests for POST /api/create-persona  (module: test-cases/api-create-persona)
 * Contract facts taken from src/app/api/create-persona/route.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { BASE_URL, postJson, serverReachable, hasProviderKeys, writeEvidence } from "../utilities/http.mjs";

const up = await serverReachable();
const skip = up ? false : `server not reachable at ${BASE_URL}`;
const keys = hasProviderKeys();

test("TC-015 [create-persona] missing name -> 400 Name required", { skip }, async () => {
  const res = await postJson("/api/create-persona", {});
  writeEvidence("TC-015-create-persona-missing-name.json", { status: res.status, body: res.json });
  assert.equal(res.status, 400);
  assert.equal(res.json?.error, "Name required");
});

test("TC-016 [create-persona] malformed JSON body -> 400 expected (BUG-010: currently 500)", { skip, todo: "BUG-010" }, async () => {
  const res = await postJson("/api/create-persona", "}");
  writeEvidence("TC-016-create-persona-invalid-json.txt", `status=${res.status}\n`);
  assert.equal(res.status, 400);
});

test("TC-017 [create-persona] provider failure must not be reported as success (BUG-012)", { skip, todo: "BUG-012" }, async () => {
  const res = await postJson("/api/create-persona", { name: "Harness Probe" });
  writeEvidence("TC-017-create-persona-silent-failure.json", {
    status: res.status,
    body: res.json,
    setCookie: res.headers.get("set-cookie"),
  });
  if (!keys) {
    assert.ok(
      res.status >= 500 || (res.status === 200 && res.json?.tone),
      "a failed tone generation was reported as success:true with an empty tone"
    );
  }
});

test("TC-018 [create-persona] writes HttpOnly personaData-<slug> cookie with sanitised attributes", { skip }, async () => {
  const res = await postJson("/api/create-persona", { name: "Harness Probe" });
  const cookie = res.headers.get("set-cookie") || "";
  writeEvidence("TC-018-create-persona-cookie.txt", cookie);
  assert.match(cookie, /personaData-harness-probe=/);
  assert.match(cookie, /HttpOnly/);
  assert.match(cookie, /SameSite=Lax/);
  assert.match(cookie, /Path=\//);
});

test("TC-019 [create-persona] cookie name is not sanitised against ';' (BUG-015)", { skip, todo: "BUG-015" }, async () => {
  const res = await postJson("/api/create-persona", { name: "x; Path=/evil" });
  const cookie = res.headers.get("set-cookie") || "";
  writeEvidence("TC-019-create-persona-cookie-injection.txt", cookie);
  assert.ok(!/^personaData-[^=]*;[^ ]/.test(cookie), `cookie name contains ';': ${cookie}`);
});

test("TC-021 [create-persona] existing tone cookie short-circuits tone generation (no LLM call)", { skip }, async () => {
  const name = "Harness Reuse";
  const cookieValue = encodeURIComponent(JSON.stringify({ name, tone: "PRESET-TONE-FROM-COOKIE" }));
  const res = await postJson(
    "/api/create-persona",
    { name },
    { headers: { cookie: `personaData-harness-reuse=${cookieValue}` } }
  );
  writeEvidence("TC-021-create-persona-tone-reuse.json", { status: res.status, body: res.json });
  assert.equal(res.status, 200);
  assert.equal(res.json?.tone, "PRESET-TONE-FROM-COOKIE");
});

test("TC-020 [create-persona] @handle enrichment produces a non-empty tone", {
  skip: skip || !keys ? skip || "provider keys not set" : false,
}, async () => {
  const res = await postJson("/api/create-persona", { name: "@amank736836" });
  writeEvidence("TC-020-create-persona-handle.json", { status: res.status, body: res.json });
  assert.equal(res.status, 200);
  assert.ok(res.json?.tone?.length > 0, "expected an enriched tone for a public handle");
});
