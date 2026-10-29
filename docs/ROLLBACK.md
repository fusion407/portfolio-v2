# Production rollback and recovery

Updated: 2026-10-29 after the authorized launch. The new site is live and verified. No live rollback was performed. Original configuration/source is backed up privately, and retained-artifact/alias recovery was rehearsed without changing live traffic.

## Current and retained identities

| Role                       | Identity                                                                                        |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| Team                       | fusion407s-projects / team_TizSOAhTKyZkUv6hnUm9kd7M                                             |
| Current production project | portfolio-v2 / prj_5R6dkwsBC6xJTUxsVbKJgazLZ9E7                                                 |
| Initial live release       | 0321758073bf909f025c6018d46e7afaad465e75; dpl_5mVGTTY16d5EtWqLojji7NPzEHHa                      |
| Current business domains   | www.bradydorsey.dev; bradydorsey.dev redirects 308 to www                                       |
| Protected preview          | portfolio-v2-preview / prj_0RJ1hIENY9vVGLaiW7leECjEOE9v; no business domains; indexing disabled |
| Retained original project  | portfolio / prj_FOG6G19vkehUJo5q6QFTrb41XcD6                                                    |
| Retained READY artifact    | dpl_GAW3G5JHmJqrwryc9DhZcEXVQJA1; portfolio-ei0sva0p3-fusion407s-projects.vercel.app            |
| Original source            | fusion407/portfolio at 800441d33ddc3508244ec56f5b5bf62a3917f7a0                                 |
| Rehearsed recovery alias   | portfolio-rollback-20261029-fusion407s-projects.vercel.app                                      |

The old project's newer ERROR artifact is not a recovery target. Its Node 18.x project setting is discontinued, with a production override present. Do not rebuild, upgrade or delete the old site as part of recovery. The working READY artifact, original generated hostname and rehearsal alias remain the recovery route. Later documentation-only v2 deployments may share the same application content; record the actual current artifact before any future application rollback.

## Backup and rehearsal

The local task visualization directory contains launch-backup-2026-10-29 outside the public repository. Its SHA-256 manifest covers the captured old project/domain/registrar/DNS/environment/deployment inventories and dashboard build settings, with recovery proof and a bare source backup. Hashes were checked; git fsck passed and the exact serving source commit exists. Both environment and hidden-production counts are zero. All five DNS records were captured with no pagination remainder and 60-second configured TTLs. No credential values or private backup contents belong in Git.

The dashboard capture supplements the connector's partial project response: Create React App; build npm run build --force; install npm install --force; development npm start; default output; empty root; Node 18.x setting. No build/runtime/source setting was changed.

A non-production rehearsal assigned a new Vercel alias to the retained old READY artifact, then rendered the original site through that alias in the authenticated browser. This proves retained artifact usability and alias controls; it is not a timed live-domain rollback drill or a guarantee of future artifact retention.

## Rollback procedure

Use rollback when a release causes critical HTTPS/route/asset failures, broken essential navigation/games, incorrect canonical/indexing behavior, or another core acceptance failure. The authorized operator uses the same Vercel account/team. Preserve evidence and avoid unrelated changes.

1. Confirm the exact live www alias, project and failing deployment. Verify the retained old artifact and generated/recovery alias still render. Do not select newest blindly.
2. To undo the project migration, open Domains on the retained old portfolio project, add www.bradydorsey.dev with apex-to-www redirect selected, and confirm Vercel's Move Domain dialog lists exactly www.bradydorsey.dev and bradydorsey.dev, moving from portfolio-v2 back to portfolio. Preserve the 308 redirect. Do not remove team/domain registration or delete either project.
3. Verify both project-domain assignments returned to the old project and www resolves to dpl_GAW3G5JHmJqrwryc9DhZcEXVQJA1. If alias repair is necessary, assign the recorded old artifact, not a rebuild or ERROR deployment.
4. Verify public HTTPS, apex 308 direction, the root/four known old content routes, old assets, and contact/navigation behavior. Record actual recovery time and status. Preserve v2 for diagnosis and obtain the appropriate authorization before retrying a failed migration.
5. Compare DNS with the private snapshot. The forward move automatically changed Vercel's system-managed apex ALIAS target; a project-domain rollback may update it automatically again. Preserve wildcard ALIAS, CAA records, TTLs, nameservers and unrelated records. Do not force the old target into the current new-project assignment. Make a manual DNS restore only for a verified unintended change using the correct current project and captured values.

For a later application release within portfolio-v2, use that project's recorded good production deployment and its Instant Rollback/promotion controls. That is a different operation from moving domains back to the old project. A Git revert cannot restore domain assignments by itself.

## Current outcome

The live cutover passed all 28 public checks; source CI passed all 36 unit/216 browser checks. Six public Lighthouse samples met targets, including SEO 100. No rollback was triggered. Keep the old project, artifact and private backup through the owner's review window. Manual screen-reader, physical-device, actual Safari and native-zoom limitations remain recorded in the release report.
