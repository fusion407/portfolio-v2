# Isolated Netlify preview

Updated: 2026-10-29. Status: prepared; deployment awaits Netlify sign-in and verified new-project identity. No deployed preview URL or passing remote check is claimed yet.

## Deployment identity

| Item                               | Verified value/status                                                     |
| ---------------------------------- | ------------------------------------------------------------------------- |
| Source repository                  | `fusion407/portfolio-v2`                                                  |
| Approved M8 merge                  | `3c6f365c11bddc96c79ba1c702ffda47e7ebad44` (PR #9)                        |
| M9 branch                          | `milestone-9-preview`                                                     |
| Netlify account/team               | Pending authenticated inspection                                          |
| New project ID/name                | Pending creation and verification; must be separate from any current site |
| Linked repository/branch           | Pending; use only portfolio-v2 and the reviewed M9 revision               |
| Custom domains                     | Must be empty on the new project                                          |
| Preview URL / deploy ID / revision | Pending a successful build                                                |
| Netlify adapter / build log        | Pending actual hosted build                                               |
| PR-preview integration             | Pending repository connection and verification                            |

The login page was reached in the in-app browser. The user must establish their account session; no credential, OAuth grant, billing agreement, new account, or paid plan was created. Never reuse an existing production project or attach `bradydorsey.dev` / `www.bradydorsey.dev` here.

## Repository configuration

`netlify.toml` defines `npm run check && npm run build`, publish directory `.next`, Node 24.22.1, npm 11.19.1, and disabled indexing. Netlify uses its automatically detected OpenNext adapter; no adapter/runtime package is pinned in this repository. Keep the adapter version/build ID in the final deployment record. GitHub CI performs a clean `npm ci`; Netlify documents its own dependency-install phase separately, so do not label an unobserved Netlify install a clean locked install.

The explicit `PORTFOLIO_INDEXING=disabled` setting applies to this preview project, including its main-branch context (which Netlify calls production). Do not set the production `SITE_URL` or activate indexing. The build-provided preview URL must populate metadata/social-image origins. Check actual responses because local Next behavior does not establish adapter/CDN behavior. Preview noindex is crawler guidance, not password protection.

Three exact compatibility redirects are configured for the isolated preview only: `/about` to `/#about`, `/skills` to `/#stack`, and `/experience` to `/#experience`. Root and `/projects` retain their routes; unknown paths retain 404s. There is no SPA catch-all. Query/fragment behavior must pass the deployed test before these mappings are described as verified. Existing live hosting does not consume this file.

## Deploy and verify

1. Authenticate and verify the intended Netlify account/team. Create a new project from the public `fusion407/portfolio-v2` repository; verify the exact repository, branch/revision, and an empty custom-domain list before deploying. If GitHub requires installing/granting a new app, the user handles that access grant. Do not purchase or upgrade a plan.
2. Use the separate Netlify-generated hostname. Record project ID, team, branch, build/deploy IDs, commit SHA, adapter version, deploy context, and build log result. Distinguish the new project's default deployment from PR Deploy Previews; neither replaces the existing live portfolio.
3. Open the new PR against main, verify the repository connection generates its Deploy Preview, and record its exact URL and revision. Do not claim automatic PR previews from a manual deploy alone.
4. Run the smoke command against the verified Deploy Preview alias (not an arbitrary immutable permalink, whose metadata may intentionally point at its alias). The test configuration rejects production domains, HTTP, credentials, custom ports, paths, queries, and fragments.

```powershell
$env:PORTFOLIO_PREVIEW_URL = '<verified HTTPS netlify.app preview origin>'
npm run test:preview
Remove-Item Env:\PORTFOLIO_PREVIEW_URL
```

The smoke suite checks six content routes, titles/descriptions/OG origins, all six 1200x630 PNGs, noindex/robots/empty sitemap, security headers, true 404s, the three legacy redirects with queries and fragments, navigation/search/contact/mobile menu, both games and focus restoration, CSP compatibility, initial assets, axe, and narrow reflow. Four browser configurations match M8 (Chromium desktop/mobile emulation, Firefox, WebKit). No mail is sent and no production origin is a test target.

5. Review actual desktop/mobile rendering, Pong and Asteroids input, touch controls, keyboard paths, and share images; measure representative deployed performance. Inspect domain settings again and confirm the existing live root/apex behavior remains unchanged. Record evidence and failures, not anticipated success.

## Remaining acceptance

No hosted build or remote tests have run yet. Account/project/domain separation, deployment metadata origin, adapter compatibility, legacy redirects, deployed headers, PR previews, and browser/performance behavior remain unverified until access is available. Complete this record with actual evidence before marking M9 delivered. Production migration remains a separate approval; see `LAUNCH.md` and `ROLLBACK.md`.

References: [Next.js adapter](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/), [configuration precedence](https://docs.netlify.com/build/configure-builds/file-based-configuration/), [runtime/dependencies](https://docs.netlify.com/build/configure-builds/manage-dependencies/), [Deploy Previews](https://docs.netlify.com/deploy/deploy-types/deploy-previews/), [redirect query behavior](https://docs.netlify.com/manage/routing/redirects/redirect-options/).

Generated `.netlify/` files are ignored by formatting/lint/type source discovery as well as Git, so a subsequent adapter build does not cause authored-code checks to traverse generated output. No linkage/credential file is committed.
