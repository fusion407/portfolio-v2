# Milestone 9 — Isolated Vercel preview and launch preparation

Date: 2026-10-29. Status: completed and accepted by Brady's request to deploy the working preview. PR #10 merged at 3cb8a5b72ad7209768cc96c4dad25d97906f66e9. The subsequently authorized and verified production launch is recorded in PRODUCTION-RELEASE.md; it was separate from the original M9 scope.

## Delivered preview

| Item                        | Verified evidence                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Team                        | fusion407s-projects / team_TizSOAhTKyZkUv6hnUm9kd7M                                                                 |
| Separate project            | portfolio-v2-preview / prj_0RJ1hIENY9vVGLaiW7leECjEOE9v                                                             |
| Source                      | fusion407/portfolio-v2; milestone-9-preview; automatic Git/PR deployment verified                                   |
| Tested application revision | fc189487a9375e8c8cccd5c456fc14b4f6aa0496                                                                            |
| READY Preview deployment    | dpl_62tSpNgiTJJF9UYgvMDWoCQvpiUH                                                                                    |
| Review URL                  | https://portfolio-v2-preview-ma0e79x3l-fusion407s-projects.vercel.app (Vercel sign-in required)                     |
| Production branch tracking  | main, verified in the new project's environment settings                                                            |
| Domains                     | Generated Vercel hostnames only; neither live domain assigned                                                       |
| Protection                  | Default all_except_custom_domains retained; user-authorized 23-hour test link used privately                        |
| Build                       | Native Next.js 16.4.3; project Node 24.x; pinned npm clean install; hosted lint/types/36 unit tests/build completed |

M8 was accepted and merged at 3c6f365c11bddc96c79ba1c702ffda47e7ebad44. The hosting plan now uses the user-confirmed Vercel account and separate project. Supplied source documents remain unchanged. Later QA/documentation commits do not change application source, the lockfile, Vercel configuration, or the preview build wrapper relative to the tested application revision.

The old portfolio project prj_FOG6G19vkehUJo5q6QFTrb41XcD6, both verified live domains, 308 apex-to-www rule, and READY serving deployment were inspected read-only and rechecked after hosted QA. The new project still owns only its generated domain. No old project/source/domain/DNS changes occurred. See ROLLBACK.md for the serving artifact and incomplete private backup/recovery gates.

## Implementation

- vercel.json configures Next.js, pinned npm clean installation, hosted lint/types/unit checks, the preview build, and three exact legacy 301 redirects without a catch-all.
- scripts/build-preview.mjs forces production application mode and indexing disabled, regardless of parent flags, without writing environment files. Unit tests use NODE_ENV=test independently.
- site-policy.ts validates deployment-specific Vercel origins, prioritizes VERCEL_ENV over legacy context, and preserves explicit production indexing gates. Three added unit cases bring the total to 36.
- Generated Vercel/Netlify linkage and output stay outside Git and source tools. The repository/history audit handles deleted tracked paths.
- The guarded hosted Playwright configuration targets only an explicit isolated HTTPS vercel.app origin, without starting a local server or falling back to the live domain.
- The private runner accepts authorized access through stdin, disables terminal echo and traces, bootstraps isolated API/browser cookies, and saves no credential file. Share URLs and cookies are omitted from Git, reports, and final review links.
- Preview, launch, rollback, SEO, architecture, legacy inventory, README, and tracker records describe actual hosting and remaining launch decisions. No dependency/lockfile change.

Source formatting remains mandatory in GitHub CI. Hosted validation runs after Vercel configuration handling; the platform reported a formatting difference only in its vercel.json copy. Both initial hosted build failures were corrected without skipping unit assertions or weakening application policy.

## Verification

| Check                               | Actual result                                                                                               |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Format/lint/strict types/unit tests | Passed; all 36 unit tests                                                                                   |
| Production-flagged preview build    | Passed; child still disables indexing                                                                       |
| Local metadata/security regression  | All 24 checks passed on that build                                                                          |
| Source GitHub CI                    | Passed on fc189487 and 28eaf930; full 216 browser checks enabled                                            |
| Vercel builds                       | READY previews for both revisions; automatic PR association verified                                        |
| Signed-in browser review            | Six routes, metadata, six 1200x630 cards, redirects, both games/input/focus, mobile menu/contact and search |
| Hosted matrix                       | All 28 checks passed across desktop Chromium, mobile Chromium emulation, Firefox, and WebKit                |
| Hosted Lighthouse 13.6.0            | Six sequential measurements: Performance 98–100, Accessibility 100, Best Practices 100; preview SEO 54      |
| Isolation                           | Both live domains and their original READY serving artifact remain on the old project                       |

The hosted matrix verifies actual HTTP 200/301/404 statuses, security/noindex headers, metadata and origins on six content routes, social PNGs, robots/empty sitemap, preserved redirect queries/fragments and section navigation, contact/search/mobile menu, both games/focus/pause/restart/exit under CSP, asset responses, axe, and narrow layout. The initial run passed 27/28; the new test's mobile button selector was corrected to the existing native summary disclosure, then the full suite passed. No application change was required.

Lighthouse used fresh headless Chromium instances, mobile defaults and the explicit desktop API configuration, against the exact protected deployment using temporary authenticated requests. Only credential-free summaries were saved outside Git; full reports containing authentication settings were discarded. See QA.md for per-page scores and metrics. These are single hosted lab samples, not field data or physical-device gameplay measurements. Preview SEO includes the deliberate noindex/protected crawling restrictions and is not production SEO validation.

## Review and remaining launch decisions

Brady accepted the protected preview and authorized deployment. PR #10 is merged; production release PR #11 and the live verification are recorded in PRODUCTION-RELEASE.md. The temporary test link was explicitly authorized and expires after 23 hours; the clean review URL retains normal Vercel sign-in.

The subsequent authorized production release completed the private configuration/zone/source backup, retained-artifact recovery rehearsal and live verification; see PRODUCTION-RELEASE.md. Manual screen-reader/physical-device/actual Safari/native zoom, additional real-media permission and unconfirmed legacy URLs remain documented limits. Resume stays deferred.
