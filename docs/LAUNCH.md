# Production launch readiness

Updated: 2026-10-29. Status: **production release authorized; preflight in progress**. Brady accepted the working preview and requested deployment on 2026-10-29. The concrete scope, backup/recovery evidence, target production project and live verification are tracked in [PRODUCTION-RELEASE.md](PRODUCTION-RELEASE.md). Historical gates below describe the original preview handoff; the release record supersedes their authorization/backup status.

## Confirmed live identity

Brady supplied `https://vercel.com/fusion407s-projects/portfolio` and approved Vercel team access. Read-only API inspection verified team `team_TizSOAhTKyZkUv6hnUm9kd7M`, project `prj_FOG6G19vkehUJo5q6QFTrb41XcD6` / portfolio, and both live domains assigned there. Apex redirects 308 to www. READY deployment `dpl_GAW3G5JHmJqrwryc9DhZcEXVQJA1` has both domain aliases and source main `800441d33ddc3508244ec56f5b5bf62a3917f7a0` in fusion407/portfolio.

The project's newest deployment record is ERROR (`dpl_4wAPhuS211LcNEreFSP4UtejruFp`), so newest is not the restore target. Its project setting reports Node 18.x and the dashboard warns about old Node versions; no runtime was upgraded. Do not assume a fresh build of the old source will succeed. Preserve the verified serving artifact and validate recovery separately.

The earlier Netlify assumption is superseded. New source is fusion407/portfolio-v2; the intended separate Vercel project is portfolio-v2-preview. New project/deploy evidence belongs in PREVIEW.md. Existing identity evidence is not a complete private configuration/DNS backup.

## Required gates

| Gate                  | Current status / required action                                                                                                                           |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| M8                    | Accepted; PR #9 merged at `3c6f365c11bddc96c79ba1c702ffda47e7ebad44`                                                                                       |
| Isolated preview      | Separate READY protected Preview, automatic PR association and hosted QA verified; M9 awaits review                                                        |
| Hosted behavior       | Manual review and all 28 hosted checks passed; six hosted Lighthouse runs: Performance 98–100, Accessibility/Best Practices 100                            |
| Live provider/project | Vercel team/project/domain identities verified read-only; no settings changed                                                                              |
| DNS                   | Public Vercel NS and apex/www A answers recorded; registrar access, full zone, configured TTLs, mail/verification records, and secure export still missing |
| Recovery              | Serving READY deploy identified; full config/env/domain/DNS backup and restore rehearsal still unverified                                                  |
| Copy                  | Core wording approved for now; later refinements optional. Confirm facts again before launch                                                               |
| Media                 | Use only existing conceptual art and attributed external trailer link. No permission inferred for absent company/project captures                          |
| Resume                | Explicitly deferred; no mandatory placeholder or download                                                                                                  |
| Manual QA             | Screen-reader, physical Android/iOS, actual Safari, native zoom remain unverified; remediate or record explicit acceptance before launch                   |
| Legacy inventory      | Five known old content routes; confirm any additional inbound asset/route URLs with the owner                                                              |
| License               | Undecided; public visibility grants no blanket content/media license                                                                                       |
| Production approval   | Must name exact old/new project IDs, release SHA, domain/routing/indexing operations, window, and rollback target                                          |

## Proposed future launch sequence

This is a plan, not authorization to execute it.

1. Accept the isolated preview and exact release SHA. Close or explicitly accept remaining content/device/accessibility decisions. Record its immutable deployment ID and protection/access behavior.
2. Securely capture the old hosted configuration, environment scopes/values, all domain assignments, DNS/registrar records and TTLs outside the public repository. Verify the serving artifact can be restored without relying on an unsupported-runtime rebuild. See ROLLBACK.md.
3. Agree the exact future Vercel project and www canonical direction. Review the three narrow legacy redirects, preserved project index, new case studies, query/fragment handling, and genuine 404s. Keep unrelated DNS/mail/verification records intact.
4. Present the concrete domain-transfer/routing/indexing and rollback actions to Brady for separate production approval. Same-provider migration may avoid a nameserver change, but do not assume that before actual domain/DNS checks. Never change nameservers just to attach a new project.
5. Only after approval: apply the named production actions. Change the preview-only build wrapper/config deliberately, set the explicit indexing flag and VERCEL_ENV production with the approved SITE_URL, and rebuild metadata, robots, sitemap, and headers together. Do not activate indexing on the preview project as a shortcut.
6. Verify apex/www HTTPS, canonical host and six page canonicals, OG origins/PNGs, six-URL sitemap, robots allow behavior, headers, legacy redirects/queries/fragments, 404s, navigation/contact and both games. Confirm actual deployed indexing before search-engine submission.
7. Monitor against agreed acceptance criteria and use the verified rollback if core behavior fails. Keep the old project, serving artifact, and backup through the review window; do not delete them as a migration step.

M9 may deliver an accepted preview while production readiness remains incomplete. Production migration still requires separate approval.
