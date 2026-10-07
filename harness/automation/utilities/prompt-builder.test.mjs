/**
 * Unit tests for src/lib/prompt.js (module: test-cases/prompt-builder).
 * The module is loaded through load-source-module.mjs - no application code is modified.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { loadPromptModule, readToneFixture, REPO_ROOT } from "./load-source-module.mjs";
import fs from "node:fs";
import path from "node:path";

const { buildPrompt } = await loadPromptModule();
const hiteshTone = readToneFixture("hitesh");
const piyushTone = readToneFixture("piyush");

test("TC-027 [prompt] built-in persona prompt embeds the systemPrompt from data/<persona>-tone.json", () => {
  const prompt = buildPrompt("hitesh", "kya haal hai?", "", []);
  assert.ok(prompt.includes(hiteshTone.systemPrompt));
  assert.ok(prompt.endsWith("to add flavor to the answer."));
});

test("TC-028 [prompt] HiPi mode concatenates both personas' system prompts and signs off as HiPi", () => {
  const prompt = buildPrompt("both", "hello", "", []);
  assert.ok(prompt.includes(hiteshTone.systemPrompt));
  assert.ok(prompt.includes(piyushTone.systemPrompt));
  assert.ok(prompt.includes("Reply as if you are HiPi"));
  assert.ok(prompt.length > buildPrompt("hitesh", "hello", "", []).length);
});

test("TC-029 [prompt] conversation history is serialised as User:/<persona>: lines", () => {
  const history = [
    { role: "user", content: "pehla sawaal" },
    { role: "assistant", content: "pehla jawaab" },
  ];
  const prompt = buildPrompt("hitesh", "dusra sawaal", "", history);
  assert.ok(prompt.includes("User: pehla sawaal"));
  assert.ok(prompt.includes("Hitesh: pehla jawaab"));
  assert.ok(prompt.trim().endsWith("to add flavor to the answer."));
});

test("TC-030 [prompt] asking for a platform link injects the exact URL instruction for built-in personas", () => {
  const prompt = buildPrompt("hitesh", "aapka LinkedIn link bhejo", "", []);
  const expected = hiteshTone.links.find((l) => /linkedin/i.test(l.label || l.key || ""));
  assert.ok(expected, "fixture data/hitesh-tone.json must contain a LinkedIn link for this test to be meaningful");
  assert.ok(prompt.includes(expected.url));
});

test("TC-031 [prompt] custom persona cookie tone (object with systemPrompt) is honoured", () => {
  const cookies = {
    "personaData-test-persona": JSON.stringify({
      name: "Test Persona",
      tone: { systemPrompt: "CUSTOM-TONE-SYSTEM-PROMPT" },
    }),
  };
  const prompt = buildPrompt("test-persona", "hello", "Test Persona", [], cookies);
  assert.ok(prompt.includes("CUSTOM-TONE-SYSTEM-PROMPT"));
});

test("TC-032 [prompt] tone written by /api/create-persona (string) is ignored by buildPrompt (BUG-006)", { todo: "BUG-006" }, () => {
  const cookies = {
    "personaData-test-persona": JSON.stringify({
      name: "Test Persona",
      tone: "You are a friendly mentor who talks about chai.",
    }),
  };
  const prompt = buildPrompt("test-persona", "hello", "Test Persona", [], cookies);
  assert.ok(prompt.includes("friendly mentor"), "string tone produced by create-persona is dropped");
});

test("TC-033 [prompt] @handle persona tone lookup matches the cookie create-persona writes (BUG-007)", { todo: "BUG-007" }, () => {
  const cookies = {
    "personaData-@amank736836": JSON.stringify({
      name: "@amank736836",
      tone: { systemPrompt: "AT-HANDLE-TONE" },
    }),
  };
  // src/app/api/chat/route.ts strips the leading "@" from personaKey before calling buildPrompt
  const prompt = buildPrompt("amank736836", "hello", "@amank736836", [], cookies);
  assert.ok(prompt.includes("AT-HANDLE-TONE"), "tone cookie key personaData-@handle is never found");
});

test("TC-034 [prompt] persona without tone data degrades to the generic template", () => {
  const prompt = buildPrompt("someone-new", "hello", "Someone New", [], {});
  assert.ok(prompt.startsWith("You are acting as Someone New."));
  assert.ok(prompt.includes("Tone guidelines:"));
});

test("TC-035 [prompt] every prompt repeats the no-greeting / answer-directly instruction", () => {
  for (const persona of ["hitesh", "piyush", "both"]) {
    const prompt = buildPrompt(persona, "hello", "", []);
    assert.ok(prompt.includes("do NOT start with greetings or generic openers"));
  }
});

test("TC-036 [prompt] repeated calls do not crash the no-repeat signature picker", () => {
  const seen = new Set();
  for (let i = 0; i < 25; i++) seen.add(buildPrompt("hitesh", "same question", "", []).length);
  assert.ok(seen.size >= 1);
  assert.ok(fs.existsSync(path.join(REPO_ROOT, "data", "hitesh-tone.json")));
});

test("TC-038 [prompt] empty user message is not rejected here; API-level validation is the only gate", () => {
  const prompt = buildPrompt("hitesh", "", "", []);
  assert.ok(prompt.includes("User: \n") || prompt.includes("User: "));
});
