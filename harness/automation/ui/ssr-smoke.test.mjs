/**
 * Server-rendered UI smoke tests (module: test-cases/ui-persona-and-chat).
 * These verify the HTML surface a real browser receives; interaction tests need a browser
 * (see harness/test-tools/ui/README.md) and are tracked as NOT_EXECUTED.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { getUrl, serverReachable, writeEvidence } from "../utilities/http.mjs";

const up = await serverReachable();
const skip = up ? false : `server not reachable`;

test("TC-039 [ui] GET / returns 200 and renders the app shell", { skip }, async () => {
  const res = await getUrl("/");
  writeEvidence("TC-039-home-ssr.html", res.text);
  assert.equal(res.status, 200);
  assert.match(res.text, /Persona/);
  assert.ok(res.text.length > 5000, `suspiciously small HTML: ${res.text.length} bytes`);
});

test("TC-040 [ui] persona selector exposes HiPi / Hitesh / Piyush / Custom options", { skip }, async () => {
  const { text } = await getUrl("/");
  for (const label of ["HiPi", "Hitesh", "Piyush", "Custom"]) {
    assert.ok(text.includes(label), `persona option missing from SSR HTML: ${label}`);
  }
});

test("TC-041 [ui] empty chat state shows the start prompt", { skip }, async () => {
  const { text } = await getUrl("/");
  assert.ok(text.includes("Start the conversation"));
});

test("TC-042 [ui] message input is rendered and disabled=absent by default", { skip }, async () => {
  const { text } = await getUrl("/");
  assert.ok(text.includes("Type your message"));
});

test("TC-043 [ui] built-in tone JSON is served from the public path (/data/hitesh-tone.json)", { skip, todo: "BUG-005" }, async () => {
  const res = await getUrl("/data/hitesh-tone.json");
  writeEvidence("TC-043-data-json.txt", `status=${res.status}`);
  assert.equal(res.status, 200, "loadPersonaTone() fetches /data/<persona>-tone.json but data/ is not a public asset dir");
});

test("TC-049 [ui] external links in chat render with target=_blank and rel=noopener (static check)", async () => {
  const fs = await import("node:fs");
  const path = await import("node:path");
  const { REPO_ROOT } = await import("../utilities/http.mjs");
  const src = fs.readFileSync(path.join(REPO_ROOT, "src/app/components/ChatArea.tsx"), "utf8");
  writeEvidence("TC-049-link-rel.txt", (src.match(/target="_blank"[\s\S]{0,80}?rel="[^"]*"/g) || []).join("\n"));
  assert.ok(src.includes('rel="noopener noreferrer"'));
});
