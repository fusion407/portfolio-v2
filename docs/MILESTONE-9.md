# Milestone 9 — Isolated Vercel preview and launch preparation

Date: 2026-10-29. Status: protected preview deployed and manually reviewed; full hosted automation/performance awaits an explicit temporary-access choice. PR #10 remains draft until the selected QA scope is completed. Production migration is not authorized.

## Delivered preview

| Item                        | Verified evidence                                                                               |
| --------------------------- | ----------------------------------------------------------------------------------------------- |
| Team                        | fusion407s-projects / `team_TizSOAhTKyZkUv6hnUm9kd7M`                                           |
| New isolated project        | portfolio-v2-preview / `prj_0RJ1hIENY9vVGLaiW7leECjEOE9v`                                       |
| Source                      | fusion407/portfolio-v2; milestone-9-preview; automatic Git/PR deployments verified              |
| Tested application revision | `fc189487a9375e8c8cccd5c456fc14b4f6aa0496`                                                      |
| READY Preview deployment    | `dpl_62tSpNgiTJJF9UYgvMDWoCQvpiUH`                                                              |
| Review URL                  | https://portfolio-v2-preview-ma0e79x3l-fusion407s-projects.vercel.app (Vercel sign-in required) |
| Production branch tracking  | main, verified read-only in the new project's environment settings                              |
| Domains                     | Generated Vercel hostnames only; neither live business domain assigned to the new project       |
| Protection                  | Default all_except_custom_domains retained; no public share link created                        |
| Build                       | Native Next.js 16.4.3; project Node 24.x; pinned npm clean install; hosted build completed      |

Brady corrected the original Netlify assumption, supplied the old Vercel project, and approved team access and the GitHub connection. The unused Netlify draft was removed. M8 was accepted and merged at `3c6f365c11bddc96c79ba1c702ffda47e7ebad44`. Supplied source documents remain unchanged.

The old portfolio project `prj_FOG6G19vkehUJo5q6QFTrb41XcD6`, its two verified domains, 308 apex-to-www rule, and READY serving deployment were inspected read-only. Exact rollback candidate and incomplete backup gates are in ROLLBACK.md. A newer ERROR deployment and old-runtime setting were recorded without changing or rebuilding them. No old project/source/domain/DNS mutation occurred.

## Implementation and files

vercel.json selects Next.js, pinned npm clean install, lint/type/unit validation and build:preview, plus three exact legacy 301 redirects without a catch-all. scripts/build-preview.mjs forces NODE_ENV production and indexing disabled in the child without environment files. Future launch requires a deliberate configuration change and separate approval.

site-policy.ts validates VERCEL_URL/VERCEL_BRANCH_URL, prioritizes VERCEL_ENV over stale legacy context, and retains explicit flag/approved-domain production gates. Three new unit cases bring the total to 36. Generated .vercel/.netlify output/linkage stays outside authored-source tooling and Git. The repository audit handles deleted working-tree paths while retaining historical blob coverage.

The hosted command separates React unit-test NODE_ENV=test from production app builds. Source formatting remains mandatory in CI; the hosted environment reported a formatting difference only for its vercel.json copy. No assertion was removed or test skipped to fix the two initial hosting-only failures.

playwright.preview.config.ts and tests/preview/deployment.spec.ts provide 28 hosted cases across the four existing browser configurations, with a strict HTTPS vercel.app target and no local/default-live fallback. Optional protected access requires a same-origin authorized share URL, receives input through stdin via scripts/verify-protected-preview.mjs, stores no credential file, disables traces for private access, and redacts authentication errors. This path has not been executed or granted a link; it is opt-in, not a protection bypass.

README, PREVIEW.md, LAUNCH.md, ROLLBACK.md and tracker/architecture/SEO/audit records document provider correction, current evidence, extension commands and open launch gates. No dependency lockfile or supplied source-document change.

## Validation

| Check                                        | Actual result                                                                                                                                                                                                                                        |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Format/lint/strict types/unit tests          | Passed locally; all 36 unit tests                                                                                                                                                                                                                    |
| Production-flagged preview build             | Passed; child still disables indexing                                                                                                                                                                                                                |
| Metadata/security regression                 | All 24 local browser checks passed on that build                                                                                                                                                                                                     |
| Source GitHub CI on application revision     | Passed; full 216 browser checks remain enabled                                                                                                                                                                                                       |
| Vercel build on application revision         | READY; lint/types/unit/build completed                                                                                                                                                                                                               |
| Authenticated browser review                 | Six routes, titles/robots/canonical omission/OG origins; six social cards at 1200x630; three redirects preserving query/fragment and target section; both games/input/pause/exit focus; mobile contact/menu and palette navigation; 390-pixel layout |
| Hosted 28-case HTTP/header/status/axe matrix | Not run; protected access choice pending                                                                                                                                                                                                             |
| Hosted Lighthouse performance                | Not run; protected access choice pending. M8 local measurements remain baseline only                                                                                                                                                                 |

Browser observation of branded missing pages and redirect navigation does not establish numeric HTTP status/security headers. Manual signed-in Chromium review is not a substitute for the unrun cross-browser hosted matrix or physical devices. Screenshots remain in the local task visualization directory outside Git.

## Remaining gates

Finish the selected hosted access/verification scope and representative performance measurements, fix actual deployment defects, recheck unchanged old domain assignments/serving artifact, and request M9 review. Do not mark unrun hosted checks passed.

Complete private configuration/zone backup and recovery rehearsal, manual screen-reader/physical-device/actual Safari/native zoom, and permission for any additional real media remain launch decisions. Resume is explicitly deferred. Production migration remains a separate approval.

Rechecked old/new project domain assignments after deployment: the old project still owns both live domains with the same 308 rule; the new project still has only its generated vercel.app domain. The public www root still returns 200 HTML from Vercel. The protected runner rejected a mismatched-origin dummy link and malformed stdin without launching a browser; same-origin dummy configuration listed 28 cases without network requests. No real access credential or share link was used.
