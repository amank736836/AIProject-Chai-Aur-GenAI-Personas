/**
 * Reproducer for the harness findings that need no provider credentials.
 * Prints the observed behaviour so evidence can be regenerated at any time:
 *   node harness/automation/utilities/repro-findings.mjs
 * It never modifies application code and never needs API keys.
 */
import { loadPromptModule } from "./load-source-module.mjs";
import { postJson, serverReachable, writeEvidence, BASE_URL } from "./http.mjs";

const captured = [];
const log = (id, detail) => {
  const line = `[${id}] ${detail}`;
  captured.push(line);
  console.log(`\n${line}`);
};

const jar = new Map();
globalThis.document = {
  get cookie() {
    return [...jar.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
  },
  set cookie(pair) {
    const [k] = pair.split(";");
    const [name, ...val] = k.split("=");
    jar.set(name.trim(), val.join("=").trim());
  },
};
globalThis.window = { crypto: globalThis.crypto };
const cookies = await import("../../../src/app/components/CookieManager.ts");
const { buildPrompt } = await loadPromptModule();

jar.clear();
const chat = [{ role: "user", text: "hello" }, { role: "compare", hitesh: "hi", piyush: "yo" }];
await cookies.saveChatToCookieWithData(chat);
log("BUG-002", `saved chat -> ${document.cookie.slice(0, 60)}... ; loadChatFromCookie() = ${JSON.stringify(cookies.loadChatFromCookie())}`);

jar.clear();
try {
  await cookies.saveChatToCookieWithData([{ role: "user", text: "बताओ क्या हाल है?" }]);
  log("BUG-003", "Hindi text saved without error (unexpected)");
} catch (e) {
  log("BUG-003", `saving Hindi text threw ${e.name}: ${e.message}`);
}

const stringToneCookies = {
  "personaData-test-persona": JSON.stringify({
    name: "Test Persona",
    tone: "You are a friendly mentor who talks about chai.",
  }),
};
const p = buildPrompt("test-persona", "hello", "Test Persona", [], stringToneCookies);
log("BUG-006", `create-persona tone string honoured by buildPrompt: ${p.includes("friendly mentor")}`);

const handleCookies = {
  "personaData-@amank736836": JSON.stringify({
    name: "@amank736836",
    tone: { systemPrompt: "AT-HANDLE-TONE" },
  }),
};
const p2 = buildPrompt("amank736836", "hello", "@amank736836", [], handleCookies);
log("BUG-007", `@handle tone found after chat route strips "@": ${p2.includes("AT-HANDLE-TONE")}`);

if (await serverReachable()) {
  const clear = await postJson("/api/clear-history", { persona: "all" });
  log("BUG-001", `POST /api/clear-history -> HTTP ${clear.status} (page.tsx sends this on beforeunload)`);

  const invalidJson = await postJson("/api/chat", "not-json");
  log("BUG-010", `POST /api/chat with malformed JSON -> HTTP ${invalidJson.status} (expected 400)`);

  const blank = await postJson("/api/chat", { message: "   " });
  log("BUG-011", `POST /api/chat with whitespace-only message -> HTTP ${blank.status} (validation did not reject it)`);

  const persona = await postJson("/api/create-persona", { name: "Harness Probe" });
  log("BUG-012", `POST /api/create-persona without provider keys -> HTTP ${persona.status} body=${JSON.stringify(persona.json)}`);

  const semicolon = await postJson("/api/create-persona", { name: "x; Path=/evil" });
  log("BUG-015", `Set-Cookie for name with ';' -> ${semicolon.headers.get("set-cookie")}`);

  const noKey = await postJson("/api/chat", { message: "hello", persona: "hitesh" });
  log("BUG-013", `provider failure payload -> HTTP ${noKey.status} body=${JSON.stringify(noKey.json)}`);

  const data = await postJson("/api/fetch-image", { name: "Hitesh" });
  log("BUG-018", `fetch-image (unsplash primary is retired) -> ${String(data.json?.image).slice(0, 80)}`);
} else {
  console.log(`\n[skip] API probes skipped: no server at ${BASE_URL}`);
}

writeEvidence(
  "repro-findings.txt",
  `Findings reproduced by harness/automation/utilities/repro-findings.mjs\nGenerated: ${new Date().toISOString()}\n\n${captured.join("\n")}\n`
);
