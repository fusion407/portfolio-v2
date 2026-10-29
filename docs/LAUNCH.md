# Production launch readiness

Updated: 2026-10-29. Status: **not ready / not authorized**. Milestone 9 authorizes an isolated preview, not replacement of the current portfolio. No DNS or custom-domain change is part of M9.

## Known targets

New source: `fusion407/portfolio-v2`. Accepted M8 revision: `3c6f365c11bddc96c79ba1c702ffda47e7ebad44`. New Netlify preview identity/deploy/revision must be recorded in `PREVIEW.md` before launch planning is accepted.

Existing source: `fusion407/portfolio`, main `800441d33ddc3508244ec56f5b5bf62a3917f7a0`, unchanged in the M9 read-only check. The live root returned 200 HTML with `Server: Vercel`; apex returned 308 to `https://www.bradydorsey.dev/`. The original brief described Netlify. Account/project ownership, DNS authority, proxies, domain routing, current immutable deployment, and recovery access are therefore still unverified. HTTP headers and source revision are not a configuration backup.

## Required gates

| Gate                         | Current evidence / required action                                                                                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| M8 acceptance                | Accepted by instruction to begin M9; PR #9 merged                                                                                                                                                |
| Isolated preview             | Pending authenticated Netlify access, new-project identity, successful deploy and review                                                                                                         |
| Actual deployment behavior   | Pending routes, redirects/query/fragment handling, six OG PNGs/origins, true 404, CSP/noindex, both games, navigation/contact, performance and mobile smoke                                      |
| Content                      | Core copy approved for now; later wording refinements remain optional. Confirm current public project/role statements before launch                                                              |
| Media permissions            | Existing conceptual art and attributed trailer link recorded; no permission inferred for absent real project/company media. Publish only the reviewed existing set unless separately approved    |
| Resume                       | Explicitly deferred by Brady; no route/download. It is not a missing mandatory launch asset under the current scope                                                                              |
| Manual accessibility/devices | Screen-reader review, physical Android/iOS, actual Safari, native zoom remain unverified; decide on and record acceptance or remediation before launch                                           |
| Legacy inventory             | Root and four old routes known; verify additional inbound URLs/assets with the owner and available analytics/search data                                                                         |
| Live-provider identity       | Confirm current provider/project/team, registrar/DNS provider, apex/www assignments, redirect rules, and owners/recovery access                                                                  |
| Recoverable backup           | Capture and validate current immutable deploy and configuration/DNS snapshot outside the public repository; see `ROLLBACK.md`                                                                    |
| License                      | Code license remains undecided; public visibility is not a blanket content/media license                                                                                                         |
| Canonical/SEO                | Preserve observed www canonical direction unless Brady approves otherwise; preview remains non-indexable. Future launch flag/context/approved-domain changes require a rebuild and actual checks |
| Approval                     | Obtain explicit authorization naming the production site/domain, exact release revision, migration actions, and rollback target/window                                                           |

## Proposed future launch sequence

This sequence is a plan, not authorization to execute it.

1. Complete and review the isolated preview evidence. Freeze the intended release SHA and retain its successful deploy URL/ID. Close or explicitly accept remaining content/accessibility/device issues.
2. Verify the current provider and owner-controlled recovery path. Capture the backup manifest and verify a concrete way to restore the previous site before changing routing. Record actual DNS records and TTLs; do not guess them or copy account secrets into this public repository.
3. Agree whether the future production target is the new Netlify project or another verified host. Specify the exact current/new project IDs and apex/www treatment. Review the three narrow legacy redirects; preserve `/projects`, add four case studies, and keep genuine 404s. Do not introduce a blanket homepage rewrite.
4. Present the final action list and rollback record to Brady for separate approval. Include any DNS/domain reassignments, certificate steps, account-specific constraints, and expected propagation behavior based on actual settings. Do not promise instant reversal of DNS caches.
5. Only after approval: apply the named production changes. Enable indexing only on the approved target with `PORTFOLIO_INDEXING=enabled`, `CONTEXT=production`, and `SITE_URL=https://www.bradydorsey.dev` (or a separately approved apex choice). Remove/change the preview-only override in the production configuration deliberately; the current TOML disables indexing. Rebuild metadata, headers, robots, and sitemap together.
6. Verify HTTPS on apex/www, chosen canonical redirect, six page canonicals, OG URLs/PNGs, six-URL sitemap, robots allow behavior, expected security headers, legacy queries/fragments, 404s, both games, navigation/contact, and no client/policy failures. Verify the indexability conditions using actual deployed responses before any search-engine submission.
7. Monitor against agreed acceptance criteria. If core routes, HTTPS, redirects, assets, or primary navigation/games fail, use the verified rollback path. Retain old source/configuration/deploy until the agreed review window ends; do not delete the old project as a migration step.

M9 can establish a reviewed preview while production readiness remains incomplete. Never infer migration authorization from approval to merge a development PR.

## Public DNS follow-up

Read-only queries at 2026-10-29 18:19 UTC returned Vercel nameserver hostnames (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`) and public apex/www A answers recorded in `LEGACY-URL-AUDIT.md`. This narrows the provider investigation but does not establish owner/team/registrar access, complete zone contents, original TTL settings, or a recoverable export. Account identity and authenticated configuration backup remain required. No record was changed.
