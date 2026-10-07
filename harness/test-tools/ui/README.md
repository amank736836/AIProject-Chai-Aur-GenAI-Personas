# UI testing tools

## What is automated here

```bash
node --test "harness/automation/ui/*.test.mjs"     # 6 cases: SSR HTML surface + static markup checks
```

`ssr-smoke.test.mjs` fetches `/` and asserts the rendered HTML contains the expected surface (TC-039…TC-042),
that `/data/<persona>-tone.json` is served (TC-043, currently failing), and that chat anchors carry
`rel="noopener noreferrer"` (TC-049). The full HTML snapshot is stored as evidence
(`../../evidence/api-responses/TC-039-home-ssr.html`).

## What is **not** automated (and why)

The environment cannot download browser binaries (no access to Playwright/Cypress CDNs), so no real browser
session was executed. Every interaction case (TC-044…TC-048, TC-050…TC-053) is therefore
`NOT_EXECUTED (manual)` and backed by a written checklist.

## Manual checklist

See [`manual-checklist.md`](manual-checklist.md) for the step-by-step script, the expected result per step, the
mapping to `TC-*` cases and the screenshots to capture.

## Tool recommendation for the future (documented, not added)

| Tool | Why | Requirement |
|---|---|---|
| Playwright (`@playwright/test`) | real browser automation for the 10 manual UI cases; can also cover responsive viewports and clipboard permissions | one new devDependency + browser download; needs a CI runner with network access |
| axe-core (`@axe-core/playwright`) | automated accessibility assertions (contrast, roles, labels) | uses the existing browser runtime |
| Lighthouse CI | performance/accessibility budget for the SSR page | Node runner, network |

**Nothing was installed** because the harness must stay runnable from a plain `npm install` in this environment.
If a browser runtime becomes available, implement the manual cases first (they are already specified with
expected results) and keep the `TC-*` ids unchanged.
