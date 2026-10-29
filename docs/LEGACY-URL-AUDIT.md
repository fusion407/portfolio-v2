# Legacy URL audit and draft mapping

Read-only inspection: 2026-10-28 local / 2026-10-29 UTC. No live configuration, DNS, hosting, or content was modified. This is migration evidence and a draft plan, not an applied redirect file or authorization to migrate.

## Evidence

- Old repository: `fusion407/portfolio`, exact main revision `800441d33ddc3508244ec56f5b5bf62a3917f7a0`. `public/profile/routes.json` declares `/about`, `/skills`, `/experience`, `/projects`; `src/MainApp.jsx` declares `/` and renders those React Router routes. The source tree does not contain a résumé PDF, sitemap, Netlify configuration, or GitHub Actions workflow.
- Live `https://www.bradydorsey.dev/profile/routes.json` returned the same four route definitions. The root and all four paths returned HTTP 200 HTML. The root identifies a Create React App shell, title `Portfolio`, description `Brady Dorsey - Web Designer / Game Developer`, and `/static/js/main.b486d073.js` plus `/static/css/main.5889f258.css`. This shell evidence does not independently validate every rendered paragraph or asset permission.
- `https://bradydorsey.dev` returned HTTP 308 with `Location: https://www.bradydorsey.dev/`. The observed canonical-host direction is apex → www.
- Live `robots.txt` returned HTTP 200 `text/plain` with `User-agent: *` and empty `Disallow`, matching the old repository's public file.
- Live `sitemap.xml` returned HTTP 200 `text/html`, the 590-byte app shell, rather than an XML sitemap. A probe at `/codex-migration-audit-missing` also returned 200 HTML, consistent with an SPA fallback. A 200 alone does not prove a route exists.
- Responses included `Server: Vercel` and `X-Vercel-*` headers. Earlier project information described Netlify; current hosting/project/domain ownership and proxy configuration must be verified with the owner before migration. These headers identify the responding infrastructure, not the complete account or DNS setup.
- The web research reader could not retrieve the live domain; direct curl GET/HEAD requests succeeded. Raw bodies were read for audit only, not copied as portfolio assets or professional facts.

## Draft content-route mapping

| Verified old path | Proposed v2 destination | Proposed treatment                  |
| ----------------- | ----------------------- | ----------------------------------- |
| `/`               | `/`                     | Preserve homepage                   |
| `/about`          | `/#about`               | Future 301 after migration approval |
| `/skills`         | `/#stack`               | Future 301 after migration approval |
| `/experience`     | `/#experience`          | Future 301 after migration approval |
| `/projects`       | `/projects`             | Preserve project index              |

All proposed destinations exist in v2 and are covered by the browser suite. The four case-study URLs are additions; no verified legacy case-study/resume route is invented. Résumé work is deferred by Brady. There is no catch-all redirect proposal: unknown v2 routes keep genuine 404 responses. Query-string and trailing-slash behavior must be checked in the eventual hosting implementation. Fragment focus and redirect behavior must then be verified on the isolated preview before migration.

## Remaining migration work

Verify provider/project/domain identities, DNS and redirect configuration, complete content/configuration backup, recovery access, additional externally linked URLs/assets, permission to reuse media, and the production canonical decision. Validate HTTPS, path/query/fragment behavior and rollback on the authorized target. Asset/permission inventory remains in `ASSETS.md`. Live-rendered accessibility, screenshot/content comparison, and production-provider configuration are not established by this HTTP/source audit.

No `_redirects`, middleware, Next redirects, domain assignment, or live deployment was added here. M9 still uses a separate preview site; production replacement requires separate explicit approval.

## M9 preparation update

A fresh read-only check on 2026-10-29 confirmed the same old main revision, www root 200 HTML with Vercel headers, and apex 308 to www. Account/provider/DNS identity and a recoverable deployment/configuration backup remain missing. The M9 `netlify.toml` prepares the three narrow redirects for the isolated new preview only; hosted query/fragment behavior must pass `test:preview` before it is called verified. Existing live hosting does not consume this repository configuration. No catch-all, live redirect, DNS change, or production migration was applied.

### Public DNS observation — 2026-10-29 18:19 UTC

Read-only Windows DNS queries returned `ns1.vercel-dns.com` and `ns2.vercel-dns.com` as the domain NS records. Apex A answers were `216.198.79.65` and `64.29.17.65`; www A answers were `216.198.79.1` and `64.29.17.1`. These are observations of public answers through the local resolver at this time, not proposed new-site records or an instruction to change DNS. Resolver TTLs were not treated as authoritative configured TTLs.

The nameserver answers reinforce the responding Vercel infrastructure evidence. They do not identify the owner/team, registrar account, complete zone, aliases/proxy settings, certificate configuration, or recovery access. No MX/TXT/AAAA/other-service inventory or authenticated zone export was taken, and no complete DNS/configuration backup or recoverability is claimed. Capture the full owner-controlled zone/configuration before any separately approved migration; preserve unrelated records.
