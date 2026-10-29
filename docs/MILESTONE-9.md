# Milestone 9 — Isolated Vercel preview and launch preparation

Date: 2026-10-29. Status: in progress. Brady corrected the original Netlify assumption, supplied the existing Vercel project URL, and approved access to team fusion407s-projects. The user connected GitHub, and the separate project/source link is created; deployment verification is in progress.

## Accepted dependency and isolation

M8 PR #9 passed Linux CI (33 unit tests / 216 browser checks) and was accepted/merged at `3c6f365c11bddc96c79ba1c702ffda47e7ebad44`. M9 is on milestone-9-preview in draft PR #10. Earlier Netlify preparation was never deployed and is superseded by the current Vercel configuration; supplied source documents remain unchanged.

Read-only Vercel inspection verified the live team/project/domain identities and the READY deployment serving both domains. See PREVIEW.md and ROLLBACK.md for exact IDs. A newer ERROR record is not the active restore candidate. Project Node 18.x/old-runtime warning was recorded without upgrading or rebuilding the old project. No existing project/source/domain/DNS setting changed.

## Prepared implementation

- Removed unused netlify.toml; added vercel.json with native Next.js configuration, pinned npm clean install, preview-only build wrapper, and three exact legacy 301 redirects. No custom domain, project ID, catch-all rewrite, adapter dependency, or secret is committed.
- scripts/build-preview.mjs forces PORTFOLIO_INDEXING disabled in the child build without writing environment files, even if the parent requests indexing. A future production launch must deliberately change this preview configuration after separate approval.
- site-policy.ts supports validated VERCEL_URL/VERCEL_BRANCH_URL origins; VERCEL_ENV overrides legacy CONTEXT. Preview/development cannot inherit a stale production signal. Existing backward-compatible legacy tests remain.
- test:preview accepts only a clean HTTPS vercel.app origin, without a default server or live-domain fallback. Seven hosted smoke cases per browser (28 total) cover six routes/metadata/PNGs, exclusions/security, 404s, legacy queries/fragments, navigation/search/contact, both games, assets/axe/reflow.
- .vercel and legacy .netlify generated output/linkage are excluded from Git and authored-source formatting/lint/type discovery.
- PREVIEW.md, LAUNCH.md, ROLLBACK.md and current README/tracker/architecture/SEO/legacy-audit records reflect the corrected host and actual evidence. No dependency lockfile or supplied source-document changes.

## Validation and remaining work

After the provider-policy changes, format/lint/strict types and all 36 unit tests passed. A build:preview run succeeded with parent production indexing flags enabled; the wrapper still forces the child to disable indexing. Hosted tests must run against the actual new project, not a placeholder URL. Updated local/deployed/CI results are recorded here when complete.

Team authorization succeeded. Native Git import returned repo-not-found; read-only account inspection showed no GitHub sign-in connection, and the user was asked to connect GitHub as fusion407. A name-filtered project list confirmed the failed import created no project. No paid plan, app repository grant, source link, or protected preview bypass was silently applied.

Remaining: create the separate portfolio-v2-preview project with no live domains; link only fusion407/portfolio-v2; deploy the reviewed M9 revision; verify deployment identities/protection and PR integration; run all hosted checks and representative performance/visual/input review; recheck unchanged live domain/project state; fill evidence fields and request M9 review.

Production migration is not authorized. Full private configuration/zone backup, restore rehearsal, manual screen-reader/physical-device/actual Safari/native zoom and real-media permissions remain launch decisions. Resume is explicitly deferred.

The user completed the GitHub connection. Created `portfolio-v2-preview` / `prj_0RJ1hIENY9vVGLaiW7leECjEOE9v` in the verified team, linked to repository ID 1437641219 (portfolio-v2), and verified its only domain is generated `portfolio-v2-preview-two.vercel.app`. Node 24.x is selected; default `all_except_custom_domains` deployment protection is retained. An attempted combined update to system-variable exposure was rejected by automatic approval review, so that setting was left unchanged and the Node-only update succeeded. No old-project setting was changed.

The production-flagged preview build passed all 24 local metadata/security browser checks. The repository scan now ignores missing working-tree paths (such as the intentionally deleted Netlify draft) while still scanning their historical blobs.
