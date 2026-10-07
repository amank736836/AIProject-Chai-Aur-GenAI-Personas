/**
 * Loader helper for the app source modules that cannot be imported directly by Node:
 *  - src/lib/prompt.js     : ESM syntax inside a CommonJS package ("type" is not set)
 *  - src/app/components/*.ts : TypeScript sources (require Node type-stripping)
 *
 * Nothing in the application source is modified: the file is read, its bare
 * `import fs from "fs"` / `import path from "path"` lines are re-pointed at
 * `node:` specifiers, and the result is evaluated from a data: URL as ESM.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  ".."
);

export async function loadPromptModule() {
  const file = path.join(REPO_ROOT, "src", "lib", "prompt.js");
  const source = fs
    .readFileSync(file, "utf8")
    .replace(/^import fs from "fs";$/m, "")
    .replace(/^import path from "path";$/m, "");
  const header = 'import fs from "node:fs";\nimport path from "node:path";\n';
  const encoded = Buffer.from(header + source, "utf8").toString("base64");
  return import(`data:text/javascript;base64,${encoded}`);
}

/** Imports a .ts source file after installing the minimal browser globals it needs. */
export async function loadCookieManagerModule() {
  globalThis.document = globalThis.document ?? { cookie: "" };
  globalThis.window = globalThis.window ?? { crypto: globalThis.crypto };
  const file = path.join(REPO_ROOT, "src", "app", "components", "CookieManager.ts");
  return import(`file://${file}`);
}

export function readToneFixture(persona) {
  const file = path.join(REPO_ROOT, "data", `${persona}-tone.json`);
  return JSON.parse(fs.readFileSync(file, "utf8"));
}
