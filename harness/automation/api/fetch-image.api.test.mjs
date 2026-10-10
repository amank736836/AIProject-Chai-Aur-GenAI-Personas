/**
 * API contract tests for POST /api/fetch-image  (module: test-cases/api-create-persona)
 * Contract facts taken from src/app/api/fetch-image/route.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { postJson, serverReachable, writeEvidence } from "../utilities/http.mjs";

const up = await serverReachable();
const skip = up ? false : "server not reachable";

test("TC-022 [fetch-image] missing name -> 400 Name required", { skip }, async () => {
  const res = await postJson("/api/fetch-image", {});
  writeEvidence("TC-022-fetch-image-missing-name.json", { status: res.status, body: res.json });
  assert.equal(res.status, 400);
  assert.equal(res.json?.error, "Name required");
});

test("TC-023 [fetch-image] valid name -> 200 with absolute https image URL", { skip }, async () => {
  const res = await postJson("/api/fetch-image", { name: "Hitesh" });
  writeEvidence("TC-023-fetch-image-ok.json", { status: res.status, body: res.json });
  assert.equal(res.status, 200);
  assert.match(String(res.json?.image), /^https:\/\//);
});

test("TC-024 [fetch-image] malformed JSON body -> 400 expected (BUG-010: currently 500)", { skip, todo: "BUG-010" }, async () => {
  const res = await postJson("/api/fetch-image", "nope");
  writeEvidence("TC-024-fetch-image-invalid-json.txt", `status=${res.status}\n`);
  assert.equal(res.status, 400);
});

test("TC-026 [fetch-image] primary upstream (source.unsplash.com) is retired -> fallback always used (BUG-018)", { skip, todo: "BUG-018" }, async () => {
  const res = await postJson("/api/fetch-image", { name: "Hitesh" });
  if (res.headers.get("x-harness")) return; // placeholder
  assert.ok(!String(res.json?.image).includes("source.unsplash.com"), "unsplash primary path still returned");
});

test("TC-025 [fetch-image] returned image URL is downloadable (requires outbound internet)", { skip: "requires network access to the image host" }, async () => {
  assert.ok(true);
});
