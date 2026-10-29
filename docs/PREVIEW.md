# Isolated Vercel preview

Updated: 2026-10-29. Status: protected Vercel Preview verified and awaiting review; all 28 hosted cases passed, with six Lighthouse measurements at 98–100 Performance and 100 Accessibility/Best Practices. Brady corrected the original Netlify assumption and supplied the existing Vercel project; this replaces the earlier Netlify draft.

## Verified separation

| Item                              | Value/status                                                                                                                                                                                                                |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vercel team                       | `fusion407s-projects` / `team_TizSOAhTKyZkUv6hnUm9kd7M`                                                                                                                                                                     |
| Existing live project — read-only | `portfolio` / `prj_FOG6G19vkehUJo5q6QFTrb41XcD6`                                                                                                                                                                            |
| Existing live domains — preserve  | `bradydorsey.dev` redirects 308 to `www.bradydorsey.dev`; both verified on the old project                                                                                                                                  |
| Existing serving deployment       | `dpl_GAW3G5JHmJqrwryc9DhZcEXVQJA1`, READY, source `800441d33ddc3508244ec56f5b5bf62a3917f7a0`, aliases include both live domains                                                                                             |
| New source                        | `fusion407/portfolio-v2`, M9 branch `milestone-9-preview`, PR #10 awaiting review                                                                                                                                           |
| Accepted M8                       | `3c6f365c11bddc96c79ba1c702ffda47e7ebad44`                                                                                                                                                                                  |
| Intended separate project         | `portfolio-v2-preview` / `prj_0RJ1hIENY9vVGLaiW7leECjEOE9v`; only generated domain `portfolio-v2-preview-two.vercel.app`; READY Preview dpl_62tSpNgiTJJF9UYgvMDWoCQvpiUH at source fc189487a9375e8c8cccd5c456fc14b4f6aa0496 |
| New custom domains                | Must contain no business/custom domain; only generated Vercel hostnames                                                                                                                                                     |
| Account/source access             | Team access approved and GitHub connected by the user; repository-ID filtering verifies the new project links to portfolio-v2                                                                                               |

A failed Git import created no project (verified by an empty name-filtered project list). Do not retry under a different team or reuse the existing portfolio project. No source, runtime setting, domain, or deployment on the existing project was changed.

## Repository configuration

`vercel.json` selects Next.js, uses `npx --yes npm@11.19.1 ci`, then lint, strict types, unit tests and `build:preview`. Node 24.x comes from the existing package engines; record Vercel's actual managed patch version in build evidence rather than promising the local exact patch. No runtime adapter package is installed. `.vercel/` linkage/output is ignored by Git and source quality tools.

`build:preview` launches Next through a Node wrapper with `PORTFOLIO_INDEXING=disabled` in the child environment, regardless of a parent production flag. It writes no environment file. Set the new project's non-secret indexing variable to disabled for preview/production/development too. Do not set the live SITE_URL or attach its domains. A future launch requires a reviewed build/configuration change, explicit indexing opt-in, production context, and approved domain.

`site-policy.ts` uses validated `VERCEL_URL` (immutable deployment hostname) before `VERCEL_BRANCH_URL`, then legacy hosting fallbacks. No protocol is assumed from arbitrary input, no credentials/path/query are accepted, and preview metadata omits canonicals. `VERCEL_ENV` takes precedence over legacy CONTEXT so preview/development cannot inherit a stale production signal. The production-project URL is deliberately not used as a preview origin. Noindex is crawler guidance, not access control.

Three exact 301 redirects are prepared for preview verification: `/about` to `/#about`, `/skills` to `/#stack`, and `/experience` to `/#experience`. Root and `/projects` stay intact; no catch-all rewrites or invented resume route are introduced. Hosted checks verified all three 301 statuses, preserved queries/fragments, and destination section navigation.

## Deployment and evidence

1. Confirm the GitHub connection/repository access, then create only the separate project in the verified team. Confirm its distinct project ID and no live/custom-domain assignment before deploying. Preserve default deployment protection and avoid paid upgrades.
2. Build the exact reviewed M9 branch SHA as a preview. Record project/deployment IDs, immutable URL, commit, target, Node/npm/Next versions, build result, source linkage, and protection/access method. A manually created deployment alone is not proof of automatic PR previews.
3. Use the immutable Vercel hostname for smoke checks so metadata/social origins match the build-generated VERCEL_URL. Access protected previews through the authorized account/temporary access method; do not disable protection just to run a test. Keep any share/bypass credentials out of Git, public docs, logs, and final links.

```powershell
$env:PORTFOLIO_PREVIEW_URL = '<verified isolated HTTPS vercel.app origin>'
npm run test:preview
Remove-Item Env:\PORTFOLIO_PREVIEW_URL
```

The command accepts only a clean HTTPS `*.vercel.app` origin and never defaults to the live custom domain. Seven smoke cases across Chromium desktop/mobile emulation, Firefox, and WebKit cover six routes, metadata/origins/PNGs, preview exclusions/security headers, 404s, legacy query/fragment redirects, navigation/search/contact, both games, assets/axe/reflow. Listing cases is not a deployed pass.

4. Review desktop/mobile games and navigation, measure deployed performance, and verify the PR's automatic deployment association. Recheck both old domain assignments and live responses. Complete this record with actual evidence before M9 review.

## Remaining acceptance

The separate project and source link are created, Node 24.x selected, and generated-only domain verified. READY Preview deployment, signed-in browser access and automatic PR association are verified. All 28 hosted HTTP/header/status/axe/interaction checks passed; six Lighthouse measurements scored 98–100 Performance and 100 Accessibility/Best Practices. Milestone acceptance awaits Brady's review. Production migration, complete authenticated configuration/zone backup, restore rehearsal, and manual screen-reader/physical-device/actual Safari/native zoom remain separate open launch gates. Resume stays deferred. See `LAUNCH.md`, `ROLLBACK.md`, and `MILESTONE-9.md`.

References: [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json), [system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables), [Git deployments](https://vercel.com/docs/git), [deployment protection](https://vercel.com/docs/deployment-protection).

## Hosted build gate

The first Vercel build reported a formatting failure only for vercel.json while the source file passed both local and GitHub CI formatting. Formatting therefore remains a full source-level CI gate; the hosted command runs lint, strict types, unit tests, and build:preview after platform configuration handling. Source formatting is not skipped in CI. No app behavior or test assertion was relaxed.

Vercel sets NODE_ENV to production during hosted builds. The unit-test step explicitly runs with NODE_ENV=test so React Testing Library uses React's test helpers; build:preview separately forces NODE_ENV=production for the actual application build. The initial hosted test failure was environmental (React.act absent in React's production test runtime), not an omitted assertion or skipped test. All tests remain enabled.

## Current hosted evidence

Protected review URL: https://portfolio-v2-preview-ma0e79x3l-fusion407s-projects.vercel.app. READY Preview `dpl_62tSpNgiTJJF9UYgvMDWoCQvpiUH` builds source `fc189487a9375e8c8cccd5c456fc14b4f6aa0496`. Automatic Vercel checks are associated with PR #10. Production branch is main; default system-variable exposure was inspected as enabled without changing it. Only the new project's Node/build/feedback/indexing configuration was set; old project settings are untouched.

Authenticated browser review confirmed all six page titles, noindex/nofollow, no canonicals, preview OG origins, all six 1200x630 cards, three legacy query/fragment destinations, both games/input/pause/exit focus, mobile contact/menu and palette navigation, robots Disallow and empty sitemap, and branded missing/resume pages. The subsequent 28-case hosted matrix additionally verified numeric HTTP statuses, headers, axe, assets and interaction behavior across four browser configurations. This remains emulated/desktop testing rather than physical-device proof. See MILESTONE-9.md for exact limits and source CI evidence.

## Protected test access

Keep Vercel protection enabled. The optional test:preview:protected runner receives a one-line JSON payload containing the clean origin and an explicitly authorized temporary access URL through stdin. It disables terminal input echo and never uses a credential file or CLI argument. The configuration accepts only a share parameter for the same exact origin; isolated browser/API contexts bootstrap their own cookies, authentication errors omit URLs, and traces are disabled when access is supplied. Do not put access URLs, tokens, cookies, or storage state in Git or public reports. Brady explicitly authorized the 23-hour test link, which was created and used for the passing hosted matrix and Lighthouse measurements. Its value is omitted from Git, reports and final links; normal protection remains enabled. Lighthouse summaries omit authentication settings and full reports were not retained.
