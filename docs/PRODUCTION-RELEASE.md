# Production release — 2026-10-29

Status: authorized by Brady's request to deploy the new portfolio; preflight in progress. No live domain has moved yet.

## Targets and scope

- Canonical URL: https://www.bradydorsey.dev. Preserve the 308 redirect from bradydorsey.dev.
- Team: fusion407s-projects / team_TizSOAhTKyZkUv6hnUm9kd7M.
- New production project: portfolio-v2 / prj_5R6dkwsBC6xJTUxsVbKJgazLZ9E7, linked to fusion407/portfolio-v2; Node 24.x.
- Protected preview project remains portfolio-v2-preview / prj_0RJ1hIENY9vVGLaiW7leECjEOE9v, with indexing disabled and no live domains.
- Old project remains portfolio / prj_FOG6G19vkehUJo5q6QFTrb41XcD6; retained deployment dpl_GAW3G5JHmJqrwryc9DhZcEXVQJA1, source 800441d33ddc3508244ec56f5b5bf62a3917f7a0. Do not rebuild, upgrade or delete it.
- Move only the two existing project-domain assignments, preserving the redirect. Do not change nameservers, authoritative DNS, mail records, registrar ownership, or registration/renewal settings.
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
