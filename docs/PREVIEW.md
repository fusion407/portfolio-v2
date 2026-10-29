# Isolated Vercel preview

Updated: 2026-10-29. Status: Vercel team/GitHub access approved; the separate project is created and deployment verification is in progress. No hosted pass is claimed yet. Brady corrected the original Netlify assumption and supplied the existing Vercel project; this replaces the earlier Netlify draft.

## Verified separation

| Item                              | Value/status                                                                                                                                 |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Vercel team                       | `fusion407s-projects` / `team_TizSOAhTKyZkUv6hnUm9kd7M`                                                                                      |
| Existing live project — read-only | `portfolio` / `prj_FOG6G19vkehUJo5q6QFTrb41XcD6`                                                                                             |
| Existing live domains — preserve  | `bradydorsey.dev` redirects 308 to `www.bradydorsey.dev`; both verified on the old project                                                   |
| Existing serving deployment       | `dpl_GAW3G5JHmJqrwryc9DhZcEXVQJA1`, READY, source `800441d33ddc3508244ec56f5b5bf62a3917f7a0`, aliases include both live domains              |
| New source                        | `fusion407/portfolio-v2`, M9 branch `milestone-9-preview`, draft PR #10                                                                      |
| Accepted M8                       | `3c6f365c11bddc96c79ba1c702ffda47e7ebad44`                                                                                                   |
| Intended separate project         | `portfolio-v2-preview` / `prj_0RJ1hIENY9vVGLaiW7leECjEOE9v`; only generated domain `portfolio-v2-preview-two.vercel.app`; deployment pending |
| New custom domains                | Must contain no business/custom domain; only generated Vercel hostnames                                                                      |
| Account/source access             | Team access approved and GitHub connected by the user; repository-ID filtering verifies the new project links to portfolio-v2                |

A failed Git import created no project (verified by an empty name-filtered project list). Do not retry under a different team or reuse the existing portfolio project. No source, runtime setting, domain, or deployment on the existing project was changed.

## Repository configuration

`vercel.json` selects Next.js, uses `npx --yes npm@11.19.1 ci`, then lint, strict types, unit tests and `build:preview`. Node 24.x comes from the existing package engines; record Vercel's actual managed patch version in build evidence rather than promising the local exact patch. No runtime adapter package is installed. `.vercel/` linkage/output is ignored by Git and source quality tools.

`build:preview` launches Next through a Node wrapper with `PORTFOLIO_INDEXING=disabled` in the child environment, regardless of a parent production flag. It writes no environment file. Set the new project's non-secret indexing variable to disabled for preview/production/development too. Do not set the live SITE_URL or attach its domains. A future launch requires a reviewed build/configuration change, explicit indexing opt-in, production context, and approved domain.

`site-policy.ts` uses validated `VERCEL_URL` (immutable deployment hostname) before `VERCEL_BRANCH_URL`, then legacy hosting fallbacks. No protocol is assumed from arbitrary input, no credentials/path/query are accepted, and preview metadata omits canonicals. `VERCEL_ENV` takes precedence over legacy CONTEXT so preview/development cannot inherit a stale production signal. The production-project URL is deliberately not used as a preview origin. Noindex is crawler guidance, not access control.

Three exact 301 redirects are prepared for preview verification: `/about` to `/#about`, `/skills` to `/#stack`, and `/experience` to `/#experience`. Root and `/projects` stay intact; no catch-all rewrites or invented resume route are introduced. Confirm real query/fragment behavior on Vercel before calling these verified.

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

The separate project and source link are created, Node 24.x selected, and generated-only domain verified. Deployment, protected access, actual hosted checks/performance, and PR-preview integration remain pending. Production migration, complete authenticated configuration/zone backup, restore rehearsal, and manual screen-reader/physical-device/actual Safari/native zoom remain separate open launch gates. Resume stays deferred. See `LAUNCH.md`, `ROLLBACK.md`, and `MILESTONE-9.md`.

References: [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json), [system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables), [Git deployments](https://vercel.com/docs/git), [deployment protection](https://vercel.com/docs/deployment-protection).

## Hosted build gate

The first Vercel build reported a formatting failure only for vercel.json while the source file passed both local and GitHub CI formatting. Formatting therefore remains a full source-level CI gate; the hosted command runs lint, strict types, unit tests, and build:preview after platform configuration handling. Source formatting is not skipped in CI. No app behavior or test assertion was relaxed.
