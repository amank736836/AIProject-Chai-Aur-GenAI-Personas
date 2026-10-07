#!/usr/bin/env bash
# Full harness run: quality gates -> unit tests -> API tests -> UI smoke -> security -> performance.
#
#   BASE_URL=http://localhost:3000 bash harness/automation/scripts/run-all.sh [--start-server]
#
# Logs are stored under harness/test-results/latest/raw/ (override with RESULTS_ROOT=<dir>) so they
# can be attached as evidence and archived into test-results/historical/<RUN-ID>/ when superseded.
# This script never writes to the application source tree and never needs provider keys
# (LLM tests self-skip when credentials are absent).
set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
cd "$ROOT"

RUN_ID="${RUN_ID:-RUN-$(date +%Y-%m-%d)-local}"
BASE_URL="${BASE_URL:-http://localhost:3000}"
OUT="${RESULTS_ROOT:-$ROOT/harness/test-results/latest}/raw"
mkdir -p "$OUT"

SUMMARY="$OUT/run-summary.txt"
: > "$SUMMARY"
START_SERVER=0
[ "${1:-}" = "--start-server" ] && START_SERVER=1
SERVER_PID=""

step() { echo; echo "===== $* =====" ; echo "===== $* =====" >> "$SUMMARY"; }

cleanup() { [ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null; }
trap cleanup EXIT

step "RUN $RUN_ID - $(date -u +%Y-%m-%dT%H:%M:%SZ)"
{ echo "base_url=$BASE_URL"; echo "commit=$(git rev-parse --short HEAD 2>/dev/null || echo unknown)";
  echo "node=$(node --version 2>/dev/null || echo unknown)"; } | tee "$OUT/run-context.txt"

if [ "$START_SERVER" = "1" ] && ! curl -sf -o /dev/null --max-time 3 "$BASE_URL"; then
  echo "starting dev server for the run..."
  ( npm run dev -- -H 0.0.0.0 > "$OUT/dev-server.log" 2>&1 ) &
  SERVER_PID=$!
  for _ in $(seq 1 40); do curl -sf -o /dev/null --max-time 2 "$BASE_URL" && break; sleep 1; done
fi

run_gate() { # name, command...
  local name="$1"; shift
  step "$name"
  ( "$@" ) > "$OUT/${name}.log" 2>&1
  local code=$?
  echo "$name exit=$code" | tee -a "$SUMMARY"
  return $code
}

rc=0
run_gate lint npm run lint || rc=1
run_gate typecheck npx tsc --noEmit || rc=1
run_gate unit-tests node --test "harness/automation/utilities/*.test.mjs" || rc=1
run_gate api-tests node --test "harness/automation/api/*.test.mjs" || rc=1
run_gate ui-tests node --test "harness/automation/ui/*.test.mjs" || rc=1
run_gate performance env ITERATIONS="${ITERATIONS:-15}" RESULT_DIR="$OUT" node harness/automation/performance/api-latency.mjs || rc=1
run_gate findings node harness/automation/utilities/repro-findings.mjs || rc=1

step "RESULT"
tail -n 20 "$OUT/api-tests.log" >> "$SUMMARY" 2>/dev/null || true
echo "logs: ${OUT#"$ROOT"/}"
echo "overall exit code: $rc" | tee -a "$SUMMARY"
exit $rc
