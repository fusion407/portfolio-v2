# Rollback and recovery plan

Updated: 2026-10-29. Status: live identity/serving artifact verified read-only; **complete backup and production restore rehearsal remain unverified**. No live change or rollback was performed.

## Verified old restore candidate

- Team: fusion407s-projects / `team_TizSOAhTKyZkUv6hnUm9kd7M`.
- Existing project: portfolio / `prj_FOG6G19vkehUJo5q6QFTrb41XcD6`.
- Serving READY deployment: `dpl_GAW3G5JHmJqrwryc9DhZcEXVQJA1`, `portfolio-ei0sva0p3-fusion407s-projects.vercel.app`.
- Its API aliases include www.bradydorsey.dev, bradydorsey.dev, and the existing generated hostnames. Source SHA: `800441d33ddc3508244ec56f5b5bf62a3917f7a0`.
- Both custom domains are verified on that old project; apex uses a 308 redirect to www.
- A newer ERROR deployment exists. Do not select newest blindly. The old project reports Node 18.x and the dashboard has an old-runtime warning; do not depend on rebuilding the source as the only recovery strategy. No runtime setting was changed.

These facts identify a concrete restore candidate. They do not prove restore permissions, continued artifact retention, complete configuration recovery, or successful rollback.

## Isolated preview recovery

Use only the new portfolio-v2-preview project and fusion407/portfolio-v2 source. A failed preview build does not justify touching the old portfolio project. Inspect the new build log, fix on milestone-9-preview, and redeploy the exact revised SHA. Retain recorded good immutable preview URLs while fixing a failed build. Preserve deployment protection; use authorized temporary access for testing rather than disabling it.

If noindex, metadata origins, headers, legacy redirects, or game/navigation checks fail, correct and rebuild before review. No site/deploy deletion, domain transfer, old-runtime upgrade, production promotion, or DNS change is necessary for M9.

## Required private backup manifest

Store a complete export in an owner-controlled location outside this public repository. Public docs contain only redacted identity/status evidence.

| Item                        | Current evidence / remaining requirement                                                                                                                        |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source                      | Exact old main SHA verified; not a full hosted/configuration backup                                                                                             |
| Provider/team/project       | Vercel identities above verified read-only                                                                                                                      |
| Serving artifact            | READY deploy and active aliases identified; confirm retention and recoverability                                                                                |
| Build/runtime configuration | Node 18.x project setting observed; complete current settings/export and effective build runtime still need capture                                             |
| Environment                 | Names/scopes and secure recoverability not captured; never commit values or expose them in logs/screenshots                                                     |
| Domains/certificates        | Current project assignment and apex redirect verified; capture complete domain/TLS configuration and reassignment recovery                                      |
| DNS/registrar               | Partial public NS/A observations only; secure full zone export, actual configured TTLs, registrar identity, access, unrelated mail/verification records missing |
| Routes/headers/proxies      | Full hosted configuration/export remains incomplete                                                                                                             |
| Assets/content              | Known route/source audit is not a complete recoverable deployment/configuration export                                                                          |
| Integrity/access            | Record backup hashes/time and verify the authorized operator can restore the artifact, project/domain routing and DNS                                           |

## Future production rollback procedure

Finalize this against actual approved migration actions before launch. Do not execute it during M9.

1. Define rollback triggers, operator and window. Pin the old project and the READY deployment above, plus the accepted v2 release, in the approval record. Verify that Vercel still retains the old artifact and that the operator has the exact required controls.
2. If only a deployment changed within one project, use that project's verified Instant Rollback/promotion controls to restore its recorded good deployment. An old project's artifact cannot be assumed interchangeable with a new project's deployment.
3. If live domains moved from old portfolio to the new project, restore their captured assignment to `prj_FOG6G19vkehUJo5q6QFTrb41XcD6` and the recorded serving artifact, preserving apex-to-www behavior and TLS. Review the exact Vercel reassignment actions before approval. Do not rebuild or upgrade the old runtime as an improvised rollback.
4. If any DNS record changed, restore only the captured prior values at the verified authoritative provider. Respect TTL/propagation uncertainty and preserve unrelated records. A Git revert alone cannot restore domain assignments, DNS, or certificates.
5. Verify apex/www HTTPS, 308 direction, root/four known old routes, old assets and application behavior, actual project/deploy/alias state, and restoration time. Keep v2 non-indexable while investigating.
6. Preserve the failed release/logs without secrets; fix and re-review on the isolated preview. Obtain new approval before retrying production migration.

## Recovery rehearsal

Before launch, demonstrate that the owner can locate the old artifact and private backup and identify/use the exact restore controls safely. Use a non-production rehearsal when possible without live routing changes. Until then, rollback is a concrete draft with a known candidate, not a validated recovery guarantee.
