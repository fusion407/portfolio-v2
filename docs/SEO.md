# Metadata and indexing policy

M7 prepares metadata for review and future launch. It does not publish or enable indexing on the existing portfolio.

## Default preview behavior

`src/lib/site-policy.ts` defaults to non-indexable for local builds, CI, deploy previews, branch deploys, and a new hosting site's main branch. All pages receive `noindex, nofollow` in metadata and `X-Robots-Tag`; `robots.txt` disallows `/`; the sitemap contains no URLs; canonical links are omitted. This avoids advertising preview or unlaunched production routes as canonical pages. It is indexing guidance, not access control.

Open Graph and Twitter cards remain available. Their base origin is the first valid HTTPS origin from Netlify's `DEPLOY_PRIME_URL`, `DEPLOY_URL`, or `URL`; local fallback is `http://127.0.0.1:3000`. Origins containing credentials, paths, query strings, or fragments are rejected. The local review server may use a different port; tests request the generated image's pathname against that server. Deployment-origin behavior still needs the isolated Netlify check in M9.

## Future production behavior — not activated

Indexing requires all three build-time inputs together:

- `PORTFOLIO_INDEXING=enabled`.
- `CONTEXT=production`.
- `SITE_URL` is a valid HTTPS origin for `www.bradydorsey.dev` or `bradydorsey.dev`.

The domain and explicit flag are both required because a separate netlify.app preview site's main branch also has a production context. Local `NODE_ENV=production` alone never enables indexing. A valid production policy emits per-page canonical and Open Graph URLs, an allow rule and sitemap reference, and exactly the six content URLs in the sitemap. It omits the preview `X-Robots-Tag` header. Unknown pages still receive Next's 404 noindex behavior.

No environment variable, hosting account, domain, or deploy configuration is changed by M7. Enabling these values requires the separately authorized migration procedure, verified deployment identity, backup, redirect behavior, canonical-host decision, and rollback. The currently observed apex redirect points to `www`; preserve that canonical choice unless Brady approves a change. Unit tests exercise the production policy in isolated mocked environments, not a public deployment. Rebuild after changing policy values so static metadata, headers, robots, and sitemap stay aligned.

## Metadata and social assets

`src/content/pages.ts` supplies six unique titles/descriptions and social-card labels for the homepage, project index, and four case studies. `pageMetadata` composes full Open Graph/Twitter metadata and 1200×630 image references. `/og/<slug>` is statically generated with Next's bundled ImageResponse renderer, authored typography, monogram, and purple/cyan tokens. No remote image/font request or new dependency is required by the authored renderer. Unknown image slugs return 404.

Homepage Person JSON-LD includes only the confirmed name, description, public email, and supplied profile URLs; a production URL is added only under the production policy. It does not infer birth date, address, employer relationships, employment dates, education, or credentials. Script serialization escapes `<` before rendering. Structured data is preparation, not a promise of a search-engine rich result.

## Professional content inputs

Brady confirmed `fusion407@gmail.com` for public contact on 2026-10-29; `src/content/professional.ts` is the shared source for the contact mailto link, palette action, and Person metadata. Selecting the action opens a mail client; no form/backend or automatic message is involved. Brady explicitly deferred the résumé until he updates it, so there is no résumé page, placeholder, download, command, sitemap entry, or share card. Adding a PDF later requires inspecting its contents and public-repository permission, copying the approved file into public assets, recording provenance, and validating the real download. Old repository content is not automatic proof of current résumé facts or permission to republish media.

Broader wording changes remain deferred. The legacy audit and draft redirects are in `LEGACY-URL-AUDIT.md`; they are not active configuration.

References: [Next metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots), [sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap), [ImageResponse](https://nextjs.org/docs/app/api-reference/functions/image-response), [JSON-LD](https://nextjs.org/docs/app/guides/json-ld), and [Netlify build metadata](https://docs.netlify.com/build/configure-builds/environment-variables/).

## M8 local policy verification

A loopback-only future launch-mode build scored 100 in Lighthouse SEO-only runs on the homepage, project index, and Swordbound case study. The three policy inputs were set only in child-process environments, with no environment file or hosting change. The server was then stopped and the default preview build restored. Preview SEO remains intentionally limited by crawl/index exclusions and omitted canonicals. Public-origin redirects, CDN headers, deployment adapters, and real crawler behavior still require deployment checks; local scores do not activate or establish production indexing.

## M9 preview configuration

`netlify.toml` explicitly sets `PORTFOLIO_INDEXING=disabled` for the isolated project build. Because file configuration takes precedence, changing a dashboard flag alone is not the future launch procedure: production activation requires a reviewed configuration change plus the existing explicit context/approved-domain policy and a rebuild. Actual deployed metadata/social origins, HTTP exclusions, robots, and sitemap remain unverified until the isolated deployment is available. `PREVIEW.md` records that evidence; `LAUNCH.md` retains the separate production approval gate.
