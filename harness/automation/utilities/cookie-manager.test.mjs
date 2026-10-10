/**
 * Unit tests for src/app/components/CookieManager.ts (module: test-cases/chat-history-cookies).
 * A minimal browser-cookie fake is installed so the real application module can run under Node.
 */
import test from "node:test";
import assert from "node:assert/strict";

const jar = new Map();
globalThis.document = {
  get cookie() {
    return [...jar.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
  },
  set cookie(pair) {
    if (!pair) return;
    const [k, ...rest] = pair.split(";");
    const [name, ...valParts] = k.split("=");
    jar.set(name.trim(), valParts.join("=").trim());
  },
};
globalThis.window = { crypto: globalThis.crypto };

const { saveChatToCookieWithData, loadChatFromCookie, setCookie, getCookie } = await import(
  "../../../src/app/components/CookieManager.ts"
);

test("TC-055 [cookies] saveChatToCookieWithData writes a chatHistory cookie", async () => {
  jar.clear();
  await saveChatToCookieWithData([{ role: "user", text: "hello" }]);
  assert.match(document.cookie, /chatHistory=/);
});

test("TC-056 [cookies] saved chat can be loaded back after a reload (BUG-002)", { todo: "BUG-002" }, async () => {
  jar.clear();
  const chat = [
    { role: "user", text: "hello" },
    { role: "compare", hitesh: "hi", piyush: "yo" },
  ];
  await saveChatToCookieWithData(chat);
  assert.deepEqual(loadChatFromCookie(), chat);
});

test("TC-057 [cookies] saving a chat containing Hindi text must not throw (BUG-003)", { todo: "BUG-003" }, async () => {
  jar.clear();
  const chat = [
    { role: "user", text: "बताओ क्या हाल है?" },
    { role: "compare", hitesh: "हाँजी, चाय पीते हैं!" },
  ];
  await saveChatToCookieWithData(chat);
  assert.ok(document.cookie.includes("chatHistory="));
});

test("TC-058 [cookies] loadChatFromCookie ignores the deployed (non-hash) cookie format", () => {
  jar.clear();
  setCookie("chatHistory", btoa(JSON.stringify([{ role: "user", text: "x" }])));
  assert.equal(loadChatFromCookie(), null, "loader expects a `hash|encoded` payload that the writer never produces");
});

test("TC-059 [cookies] chats beyond the 4 KB browser cookie limit are silently useless (KI-004)", async () => {
  jar.clear();
  const chat = Array.from({ length: 60 }, (_, i) => ({
    role: i % 2 === 0 ? "user" : "compare",
    text: `message number ${i} with a reasonably long payload to grow the encoded cookie`,
  }));
  await saveChatToCookieWithData(chat);
  const size = document.cookie.length;
  assert.ok(size > 4096, `encoded history is ${size} bytes, above the ~4096 byte per-cookie browser limit`);
});

test("TC-060 [cookies] loadChatFromCookie returns null when no cookie exists", () => {
  jar.clear();
  assert.equal(loadChatFromCookie(), null);
});

test("TC-061 [cookies] loadChatFromCookie returns null for corrupt cookie payloads", () => {
  jar.clear();
  setCookie("chatHistory", btoa("not-json") + "|" + btoa("}"));
  assert.equal(loadChatFromCookie(), null);
});

test("TC-062 [cookies] setCookie/getCookie round-trips special characters", () => {
  jar.clear();
  setCookie("personaData", JSON.stringify({ name: "Test Persona", tone: "a;b=c" }));
  assert.equal(getCookie("personaData"), JSON.stringify({ name: "Test Persona", tone: "a;b=c" }));
});
