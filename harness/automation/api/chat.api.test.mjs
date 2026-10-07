/**
 * API contract tests for POST /api/chat  (module: test-cases/api-chat)
 * Contract facts asserted here are taken from src/app/api/chat/route.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { BASE_URL, postJson, getUrl, serverReachable, hasProviderKeys, writeEvidence } from "../utilities/http.mjs";

const up = await serverReachable();
const skip = up ? false : `server not reachable at ${BASE_URL} (start it with: npm run dev)`;
const keys = hasProviderKeys();

test("TC-001 [api-chat] POST /api/chat without message -> 400 Message required", { skip }, async () => {
  const res = await postJson("/api/chat", {});
  writeEvidence("TC-001-chat-missing-message.json", { status: res.status, body: res.json });
  assert.equal(res.status, 400);
  assert.equal(res.json?.error, "Message required");
});

test("TC-002 [api-chat] malformed JSON body -> 400 expected (BUG-010: currently 500)", { skip, todo: "BUG-010" }, async () => {
  const res = await postJson("/api/chat", "this-is-not-json");
  writeEvidence("TC-002-chat-invalid-json.txt", `status=${res.status}\nbody=${res.text.slice(0, 300)}\n`);
  assert.equal(res.status, 400);
});

test("TC-003 [api-chat] whitespace-only message -> 400 expected (BUG-011: currently forwarded to provider)", { skip, todo: "BUG-011" }, async () => {
  const res = await postJson("/api/chat", { message: "   ", persona: "hitesh" });
  writeEvidence("TC-003-chat-whitespace.json", { status: res.status, body: res.json });
  assert.equal(res.status, 400);
});

test("TC-004 [api-chat] GET /api/chat -> 405 Method Not Allowed", { skip }, async () => {
  const res = await getUrl("/api/chat");
  assert.equal(res.status, 405);
});

test("TC-005 [api-chat] provider failure returns a generic 5xx payload (BUG-013: raw provider text leaked)", { skip, todo: "BUG-013" }, async () => {
  const res = await postJson("/api/chat", { message: "hello", persona: "hitesh" });
  writeEvidence("TC-005-chat-provider-error.json", { status: res.status, body: res.json });
  assert.ok(res.status >= 500, "expected a 5xx when the provider call fails");
  const msg = String(res.json?.error ?? "");
  assert.ok(!/GROQ_API_KEY|GOOGLE_GENERATIVE_AI_API_KEY|apiKey|api key/i.test(msg), `provider internals leaked: ${msg}`);
});

test("TC-006 [api-chat] oversized body (>50 KB) is not rejected at the edge (documented risk)", { skip }, async () => {
  const res = await postJson("/api/chat", { message: "A".repeat(51200), persona: "hitesh" });
  writeEvidence("TC-006-chat-oversized-body.json", { status: res.status, body: res.json });
  assert.notEqual(res.status, 413); // documents: no application-level payload cap
});

test("TC-007 [api-chat] happy path (hitesh) returns reply + history + history cookie", { skip: skip || !keys ? skip || "GROQ_API_KEY/GOOGLE_GENERATIVE_AI_API_KEY not set" : false }, async () => {
  const res = await postJson("/api/chat", { message: "Say hi in one word", persona: "hitesh" });
  writeEvidence("TC-007-chat-happy-hitesh.json", {
    status: res.status,
    body: res.json,
    setCookie: res.headers.get("set-cookie"),
  });
  assert.equal(res.status, 200);
  assert.ok(typeof res.json?.hitesh === "string" && res.json.hitesh.length > 0);
  assert.ok(res.headers.get("set-cookie")?.includes("chatHistory-hitesh="));
});

test("TC-008 [api-chat] HiPi mode returns both replies", { skip: skip || !keys ? skip || "provider keys not set" : false }, async () => {
  const res = await postJson("/api/chat", { message: "Say hi in one word", persona: "both" });
  writeEvidence("TC-008-chat-happy-both.json", { status: res.status, body: res.json });
  assert.equal(res.status, 200);
  assert.ok(res.json?.hitesh?.length > 0);
  assert.ok(res.json?.piyush?.length > 0);
});

test("TC-009 [api-chat] piyush mode leaves hitesh reply null", { skip: skip || !keys ? skip || "provider keys not set" : false }, async () => {
  const res = await postJson("/api/chat", { message: "Say hi in one word", persona: "piyush" });
  writeEvidence("TC-009-chat-happy-piyush.json", { status: res.status, body: res.json });
  assert.equal(res.status, 200);
  assert.equal(res.json?.hitesh, null);
  assert.ok(res.json?.piyush?.length > 0);
});

test("TC-010 [api-chat] rate-limit/overload surfaces HTTP 429 with rateLimit flag", { skip: skip || !keys ? skip || "provider keys not set" : false }, async () => {
  // Only observable when the upstream provider actually rate-limits; recorded for completeness.
  const res = await postJson("/api/chat", { message: "hello", persona: "hitesh" });
  writeEvidence("TC-010-chat-ratelimit.json", { status: res.status, body: res.json });
  if (res.status === 429) assert.equal(res.json?.rateLimit, true);
});
