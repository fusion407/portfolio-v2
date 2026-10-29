# Rollback and recovery plan

Updated: 2026-10-29. Status: procedure drafted; **production rollback is not yet validated**. Account/project/domain/DNS identities and a recoverable hosted-deployment/configuration backup are missing. No live change has been made.

## Isolated preview recovery

The preview must use a new Netlify project with no production custom domain and only `fusion407/portfolio-v2` source. A failed preview build does not justify touching the current live project. Inspect its build/deploy log, fix on `milestone-9-preview`, and redeploy to the same isolated identity. If a prior good preview exists, use its recorded immutable deploy URL for review while fixing the next build. Record both deploy IDs/SHAs; do not describe a new site's default deploy as the old production deployment.

If preview noindex, headers, social origins, redirects, or game/navigation checks fail, stop review at that defect. Correct/rebuild/retest before acceptance. Keep indexing disabled. Pausing an unintended preview build is limited to the verified new project. Deleting a site or deploy is unnecessary for this milestone.

## Required production backup manifest

Before authorizing migration, record these facts in an owner-controlled location outside the public repository. Put only redacted identity/status evidence in public docs.

| Backup item                               | Current status                                                                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Old Git source                            | Main SHA `800441d33ddc3508244ec56f5b5bf62a3917f7a0` verified; repository access/source hash alone is not a full recovery backup |
| Current provider/team/project             | Unverified; live response is Vercel despite earlier Netlify description                                                         |
| Immutable current deployment ID/URL       | Missing                                                                                                                         |
| Build command/runtime/output/dependencies | Live project settings not captured; do not assume the source main is the exact deployed artifact                                |
| Environment settings                      | Names/scopes and secure recoverability not captured; keep values private and out of logs/screenshots/Git                        |
| Domain assignments/certificates           | Apex/www/project assignments and recovery method not captured                                                                   |
| DNS/registrar                             | Provider, exact records, TTLs, export time, recovery access not captured                                                        |
| Routing/headers/redirects                 | Actual hosted rules, SPA fallback, and proxy behavior need capture                                                              |
| Public asset/content inventory            | Known route shell audited; complete recoverable asset/config inventory remains missing                                          |
| Backup integrity                          | Record export hashes/timestamps and verify the previous deployment/configuration is recoverable                                 |
| Owner/recovery access                     | Confirm the person/account able to restore the current host and DNS                                                             |

## Future production rollback procedure

This must be finalized against actual provider controls before migration. No account-specific restoration command or DNS value is invented here.

1. Define rollback triggers and the authorized operator/window during launch review. Examples are loss of HTTPS, critical page/asset failures, broken primary navigation/game entry, or incorrect canonical/legacy redirects. Name the exact old deployment and project as the restore target.
2. If a same-provider deployment switch was approved, restore the recorded previous immutable deployment using that provider's verified deployment controls. If project/domain assignment changed, restore the captured domain assignment and certificate configuration. Do not apply Netlify-specific restore instructions to an unverified Vercel project.
3. If DNS changed, restore only the captured prior records at the verified authoritative DNS provider. Respect recorded TTLs and propagation uncertainty; do not replace unrelated mail or verification records. A previous Git commit cannot restore DNS or certificate routing.
4. Verify apex/www HTTPS and the original 308 canonical direction, root and four known legacy routes, existing assets, and old application behavior. Record actual response/deploy evidence and the restoration time. Keep the v2 project non-indexable while investigating.
5. Preserve the failed release and logs for diagnosis, without exposing secrets. Fix and re-review on the isolated preview; do not repeat production migration until separately authorized.

## Recovery rehearsal

Before launch, demonstrate that the owner can locate/access the old immutable deployment and configuration/DNS snapshot and identify the exact restore controls. A non-production rehearsal may be used if available without affecting live routing. Until that evidence exists, the rollback plan is a draft and launch remains blocked by missing recovery proof, not by a presumed working backup.
