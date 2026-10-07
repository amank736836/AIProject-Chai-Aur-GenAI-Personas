const m = await import("./load-source-module.mjs");
const { buildPrompt } = await m.loadPromptModule();
const cm = await m.loadCookieManagerModule();
console.log("prompt len:", buildPrompt("hitesh", "hi", "", []).length);
console.log("cookie module exports:", Object.keys(cm).join(","));
