#!/usr/bin/env bash
# Environment preflight for the harness. Prints only booleans for secrets - never values.
set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
BASE_URL="${BASE_URL:-http://localhost:3000}"

echo "== Harness environment check =="
echo "repo root      : $ROOT"
echo "node           : $(node --version 2>/dev/null || echo 'MISSING (Node.js 18+ required)')"
echo "npm            : $(npm --version 2>/dev/null || echo 'MISSING')"
echo "dependencies   : $([ -d "$ROOT/node_modules" ] && echo 'node_modules present' || echo 'MISSING - run: npm install')"
echo "base url       : $BASE_URL"

if command -v curl >/dev/null 2>&1; then
  code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 "$BASE_URL" || echo '000')"
  echo "server         : $([ "$code" = "200" ] && echo "reachable (HTTP $code)" || echo "NOT reachable (HTTP $code) - run: npm run dev")"
else
  echo "server         : UNKNOWN (curl not installed)"
fi

bool() { [ -n "${1:-}" ] && echo "set" || echo "NOT set"; }
echo "GROQ_API_KEY                       : $(bool "${GROQ_API_KEY:-}")"
echo "GOOGLE_GENERATIVE_AI_API_KEY       : $(bool "${GOOGLE_GENERATIVE_AI_API_KEY:-}")"
echo
echo "Provider credentials are only needed for the LLM tests (TC-007..TC-010, TC-020)."
echo "Everything else runs offline against a local dev server."
