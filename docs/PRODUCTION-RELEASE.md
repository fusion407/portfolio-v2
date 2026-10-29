# Production release — 2026-10-29

Status: **live and verified**. Brady authorized deployment after accepting the working preview. Both domains moved to the READY main-branch production artifact on 2026-10-29 at approximately 20:05:28 UTC.

## Targets and scope

- Canonical URL: https://www.bradydorsey.dev. Preserve the 308 redirect from bradydorsey.dev.
- Team: fusion407s-projects / team_TizSOAhTKyZkUv6hnUm9kd7M.
- New production project: portfolio-v2 / prj_5R6dkwsBC6xJTUxsVbKJgazLZ9E7, linked to fusion407/portfolio-v2; Node 24.x.
- Protected preview project remains portfolio-v2-preview / prj_0RJ1hIENY9vVGLaiW7leECjEOE9v, with indexing disabled and no live domains.
- Old project remains portfolio / prj_FOG6G19vkehUJo5q6QFTrb41XcD6; retained deployment dpl_GAW3G5JHmJqrwryc9DhZcEXVQJA1, source 800441d33ddc3508244ec56f5b5bf62a3917f7a0. Do not rebuild, upgrade or delete it.
- Moved only the two existing project-domain assignments, preserving the 308 redirect. No nameserver, mail, registrar, registration/renewal or manual DNS operation occurred. Vercel automatically changed its system-managed apex ALIAS target as part of the project-domain move; the other four records are unchanged.
- M9 accepted by the deployment request and merged as PR #10 at 3cb8a5b72ad7209768cc96c4dad25d97906f66e9. Final M9 CI passed all 36 unit and 216 browser tests; the protected hosted matrix passed 28/28.

## Backup and recovery evidence

The owner's local task visualization directory contains the private launch-backup-2026-10-29 folder, outside this public repository. It holds eight configuration/inventory files and their SHA-256 manifest, a bare Git source backup verified by git fsck and the exact serving commit, and rendered dashboard build settings. No project environment variables or hidden production values exist (both counts zero). All five Vercel authoritative DNS records were captured with configured TTLs of 60 seconds and no pagination remainder. Registrar/domain metadata and project assignments were captured without publishing their private contents.

The connector's project response omits some build settings; dashboard capture supplements it: Create React App, build npm run build --force, install npm install --force, development npm start, empty root, default output, Node 18.x project setting, production runtime override present. No old configuration was modified.

Recovery rehearsal assigned portfolio-rollback-20261029-fusion407s-projects.vercel.app to the old READY artifact, and a signed-in browser rendered the original site through that new alias. This establishes retained artifact usability and alias controls without rebuilding or changing live traffic. It is not a completed live-domain rollback drill. The old project, deployment, source backup and domain/DNS inventories remain available.

If core live routes, metadata, indexing, assets, HTTPS or interactions fail after cutover, move www and its apex redirect back to the recorded old project and verify the retained artifact serves them. Preserve the new release/logs for diagnosis. No DNS changes are planned, so a zone restore should be unnecessary; restore only verified prior values if an actual unintended change is found.

## Release implementation and verification

The hosted build entry point uses the existing site-policy opt-in gates. Only explicit indexing enabled, production context and an approved HTTPS canonical domain select the production build; all other cases import the existing forced-exclusion preview wrapper. Only the new production project's production environment has the enabling flag and www SITE_URL. Default protection remains enabled for generated Vercel deployments; publishing the approved custom domains provides normal public access.

Local production preflight passed all six canonical/indexable pages, social-image origins, security headers, robots allow behavior, six-URL sitemap and a real deferred-resume 404. Default hosted build also completed through the preview path. Format/lint/strict types and all 36 unit tests passed. The release PR repeats the full 216-case browser matrix before cutover. The shared hosted suite now checks either preview exclusions or production indexing explicitly; the production command targets only the approved www domain and starts no server. The preview config clears any inherited production-test mode.

Before cutover: deploy the reviewed source to the new production project, inspect the generated protected artifact, verify CI, and confirm exact domain targets. After cutover: run all 28 production checks across four configurations, verify apex redirect/HTTPS and unchanged DNS, and measure representative public Lighthouse results. Record actual release/deployment IDs and results below; do not infer them from a successful build.

## Remaining documented limits

Manual screen-reader, physical Android/iOS, actual Safari and native zoom remain unverified. Existing conceptual media and copy are the accepted content; no new rights, professional facts or screenshots are inferred. Resume remains deferred. The source is public without a blanket content license. Deployment approval does not authorize later paid upgrades, new media, domain purchases or deletion of the retained old site.

## Completed release evidence

| Item                             | Verified result                                                                                                                          |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Release PR                       | #11 merged after all source CI checks passed                                                                                             |
| Validated release head           | 1ab49d38172dc0a7c214245b9a90e5cab9fb9e78                                                                                                 |
| Main release revision            | 0321758073bf909f025c6018d46e7afaad465e75; identical application/configuration to validated head                                          |
| Initial live production artifact | dpl_5mVGTTY16d5EtWqLojji7NPzEHHa; portfolio-v2-dpb04xk02-fusion407s-projects.vercel.app; READY, target production, source main           |
| Domain-to-artifact proof         | Authoritative www alias lookup returned that deployment ID and production project ID                                                     |
| Public www                       | HTTPS 200; new portfolio; canonical www; index/follow; no protection login                                                               |
| Apex                             | HTTPS 308 to www; original canonical direction preserved                                                                                 |
| Source CI                        | All 36 unit and 216 browser tests passed, plus format/lint/types/build/dependency and repository audits                                  |
| Public production matrix         | All 28 checks passed across desktop/mobile Chromium emulation, Firefox and WebKit, with no skips/retries                                 |
| Public Lighthouse                | Six sequential samples on home, projects and Swordbound: Performance 98–100, Accessibility/Best Practices/SEO 100                        |
| Separate preview                 | New hosting entry point still produces noindex/nofollow, omitted canonicals and deployment-specific social origin                        |
| Main tracking                    | Production branch main and automatic production domain assignment verified without changing their defaults                               |
| Old site                         | Original project/artifact/build settings/source retained; business domains moved, generated old host and rehearsed recovery alias remain |

The initial domain-add attempt was stopped by automatic approval review while the selected main artifact was BUILDING. No domain moved at that point. After the API reported READY and the signed-in browser verified the main artifact, the normal Vercel Move Domain dialog transferred exactly www.bradydorsey.dev and bradydorsey.dev together. Both project-domain entries subsequently reported verified/valid configuration, and the public checks passed.

DNS comparison found one expected platform-managed routing update: apex ALIAS changed from ae6ee657f1973500.vercel-dns-017.com to a418fe0d302d5a2a.vercel-dns-017.com, with the same record ID and 60-second TTL. Vercel marks it as automatically managed. The wildcard ALIAS and three CAA records remained identical; no records were added/removed, and nameservers remain ns1.vercel-dns.com / ns2.vercel-dns.com. Do not manually force the old managed target onto the working new project. A rollback should move the domains back through Vercel and verify its resulting managed routing.

The protected staged artifact was reviewed on all six pages before cutover. Public validation additionally checked numeric HTTP statuses, six production canonicals/social origins and PNG dimensions, six-URL sitemap, robots allow behavior, security headers, 404s, legacy query/fragment redirects and destination navigation, contact/search/mobile menu, both games/focus/pause/restart/exit and CSP, assets/axe/reflow. Lighthouse used clean headless Chromium processes with mobile defaults or explicit desktop configuration, without private headers or a share link. Detailed metrics are in QA.md; these are single lab samples, not field or physical-device results.

The local production-test server was stopped and the workspace's default non-indexable preview build restored. A public-home screenshot and credential-free measurement summaries are stored in the local task visualization directory outside Git. Later documentation-only commits may receive automatic deployments; the initial cutover artifact above is the recorded tested application release.
