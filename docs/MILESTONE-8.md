# Milestone 8 — Quality assurance

Date: 2026-10-29. Status: implemented and verified locally; awaiting review and Linux CI.

Approved Milestone 7 PR #8 was merged at `f254213c0c32ec8be8fd84645870369bea5a0d3f`. This milestone expands QA across browser engines, fixes two keyboard-focus failures, and adds a production CSP and repeatable repository/history hygiene check.

## Changes and validation

- `playwright.config.ts`, six responsive test suites, and the CI workflow: Chromium desktop/mobile, Firefox, and WebKit; 320-pixel reflow checks; full Git history and all browser engines installed in CI.
- `skip-link.tsx` and `command-palette.tsx`: reliable first-Tab skip navigation and focus recovery after a failed palette import.
- `next.config.ts` and `security.spec.ts`: production CSP, consistent headers, and interactive policy-violation checks. Static bootstrap/styles require inline allowances; this is not a strict nonce policy.
- `scripts/audit-repository.mjs` and the package script: limited credential-pattern/forbidden-artifact scan over current files and available history, without exposing matched contents.
- QA evidence, architecture, asset inventory, README, SEO notes, and accepted M7/tracker records updated. No new dependency, lockfile change, or supplied source-document change.

`npm run check` passed formatting, lint, strict types, and 26 unit tests. Production build passed. The full browser matrix passed 192 checks without skips or retries; the additional 320-pixel run passed all 24 responsive checks. Dependency audit reported zero vulnerabilities and the repository/history pattern scan found no recognized credentials or forbidden artifacts.

Eight local Lighthouse runs measured 99–100 Performance and 100 Accessibility/Best Practices. Preview SEO was 63 because exclusions and omitted canonicals are intentional. See [the full evidence and limitations](QA.md), including per-page metrics and outstanding manual/device checks.

## Review gate

Résumé remains explicitly deferred. Copy refinements and approved real project media remain pending. Manual screen-reader, physical-device/actual Safari, native zoom, and deployed checks remain unverified; automated scores do not establish full compliance or security.

Next is M9: an isolated preview and launch-readiness documentation, after this milestone is reviewed. Production migration remains separately gated. No live site, DNS, domain assignment, hosting account, or public indexing setting was changed.

## Local indexing experiment

A temporary loopback-only build used the three explicit production indexing inputs. Lighthouse SEO-only runs scored **100** on `/`, `/projects`, and `/projects/swordbound-protocol`. Those inputs existed only in child-process environments; no environment files or hosting settings changed. The launch-mode server was stopped and the default non-indexable production build restored afterward. All 24 security/SEO browser checks passed again against that restored build. This measures generated markup locally, not public-domain or deployed SEO readiness.
