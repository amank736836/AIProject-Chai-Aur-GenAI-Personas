/**
 * Shared HTTP helpers for the harness API suites.
 * BASE_URL is configurable so the same suite can run against dev, preview or prod.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
export const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  ".."
);
export const EVIDENCE_DIR =
  process.env.EVIDENCE_DIR || path.join(REPO_ROOT, "harness", "evidence", "api-responses");
export const TIMEOUT_MS = Number(process.env.HTTP_TIMEOUT_MS || 15000);

export function hasProviderKeys() {
  return Boolean(
    process.env.GROQ_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
  );
}

export async function serverReachable() {
  try {
    const res = await fetch(BASE_URL, { signal: AbortSignal.timeout(5000) });
    return res.status > 0;
  } catch {
    return false;
  }
}

export async function postJson(pathname, body, init = {}) {
  const started = Date.now();
  const res = await fetch(`${BASE_URL}${pathname}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    body: typeof body === "string" ? body : JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* non-JSON response (e.g. Next.js HTML error page) */
  }
  return {
    status: res.status,
    headers: res.headers,
    text,
    json,
    ms: Date.now() - started,
  };
}

export async function getUrl(pathname, init = {}) {
  const started = Date.now();
  const res = await fetch(`${BASE_URL}${pathname}`, {
    ...init,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const text = await res.text();
  return { status: res.status, headers: res.headers, text, ms: Date.now() - started };
}

/** Writes raw evidence next to the harness so failures can be re-inspected later. */
export function writeEvidence(name, content) {
  fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
  const file = path.join(EVIDENCE_DIR, name);
  fs.writeFileSync(
    file,
    typeof content === "string" ? content : JSON.stringify(content, null, 2)
  );
  return path.relative(REPO_ROOT, file);
}
