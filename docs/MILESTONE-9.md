# Milestone 9 — Isolated preview and launch preparation

Date: 2026-10-29. Status: **in progress; hosted deployment awaits Netlify account access**. Do not mark this milestone complete from the prepared configuration/documents alone.

## Accepted dependency

Brady authorized beginning M9. Approved M8 PR #9, head `d88523911b55d163e694fcc0411403c4f57e7449`, had successful Linux CI (33 unit tests and 216 browser checks) and was merged at `3c6f365c11bddc96c79ba1c702ffda47e7ebad44`. M9 starts from that accepted merge on `milestone-9-preview`.

## Prepared work

- `netlify.toml`: isolated Next.js build/publish configuration, pinned Node/npm, disabled indexing across contexts, three exact preview compatibility redirects. No site ID, production domain, DNS setting, SPA catch-all, or runtime dependency was added.
- `playwright.preview.config.ts`, `tests/preview/deployment.spec.ts`, package command: a separate deployed smoke matrix with a required HTTPS Netlify origin. It refuses the live domain before starting a browser. Seven cases across four browser configurations cover routes/metadata/social PNGs, noindex/security, 404s, legacy queries/fragments, navigation/search/contact, both games, assets/axe/reflow. Listing 28 checks is not a passing deployed run.
- `PREVIEW.md`: exact source/revision, account/site/deploy evidence fields, isolated setup steps, command, and acceptance checks.
- `LAUNCH.md`: explicit production approval gate, content/manual-device decisions, provider/DNS/backup prerequisites, proposed future migration and SEO steps.
- `ROLLBACK.md`: required private backup manifest, preview recovery, and production restore procedure that remains conditional on actual host/DNS identities and recovery evidence.
- README, accepted M8/arcade/tracker, architecture, SEO, asset, and legacy-audit records updated.

## Evidence and limits

The Netlify login page is reachable but no authenticated account/new project/deploy has been verified. Plugin discovery returned no Netlify connector. The browser is open for the user to sign in; no credential, new access grant, paid plan, or new account was created. No preview URL, adapter compatibility, hosted headers/origins/redirects, PR preview integration, or deployed performance result is claimed.

Read-only M9 verification: legacy repo main remains `800441d33ddc3508244ec56f5b5bf62a3917f7a0`; live www root returns 200 HTML with Vercel headers; apex returns 308 to www. Current owner/provider/DNS identities and immutable deployment/configuration backups remain missing. Source and HTTP checks do not establish a recoverable backup.

TOML parsed successfully with Python `tomllib`. The preview command rejected `https://www.bradydorsey.dev` before browser launch, then listed 28 cases against a placeholder Netlify origin without making requests. Final local code/build/scan and PR CI results are recorded below when completed. No supplied source-document, dependency lockfile, live project, domain, or DNS change.

## Remaining work

1. Establish the user Netlify session; verify the intended account/team and create a separate project linked only to portfolio-v2, with no production custom domain.
2. Deploy the reviewed revision, record project/deploy/commit/adapter identities, and verify actual PR-preview linkage.
3. Run the deployed smoke matrix, review desktop/mobile games and navigation, measure deployed performance, and fix observed deployment issues.
4. Recheck empty production-domain assignments and unchanged existing live behavior. Fill actual evidence fields and request M9 review.

Production migration remains a separate approval. Manual screen-reader/physical-device/actual Safari/native zoom and absent real media permissions remain visible launch decisions; resume remains explicitly deferred.

## Completed local preflight

Format, lint, strict TypeScript, all 33 unit tests, and the static production build passed after adding the preview configuration/tests. Python `tomllib` parsed the deployment configuration. The live-domain rejection and 28-case listing checks passed without launching a remote browser. The deployed smoke cases remain **not run**, not passing or skipped. Repository/dependency scans and GitHub CI are tracked on the draft review PR. No application runtime behavior or dependency resolution was changed by this preparation.
