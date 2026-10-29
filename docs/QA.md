# Milestone 8 — QA evidence

Date: 2026-10-29. Local production builds on Windows, Node 24.22.1, npm 11.19.1. This report records measured coverage and remaining checks; automated results do not establish universal accessibility, security, or deployed behavior.

## Behavior and accessibility

The clean full run passed **192 browser checks**, with no skips or retries: 48 each in desktop Chromium, Pixel 7 Chromium emulation, desktop Firefox, and desktop WebKit. Playwright browser versions were Chromium 156, Firefox 157, and WebKit 27.2. WebKit is engine coverage, not an actual Safari device test. A subsequent targeted run passed all 24 responsive checks after adding 320 CSS pixels to the existing width matrices.

Coverage includes six content pages, real unknown-path 404s, metadata and social PNGs, navigation, palette shortcuts/filtering/focus/failure recovery, workflow selection, opt-in Pong controls/lifecycle/fallbacks, reduced motion, no-JavaScript content, axe scans, narrow layouts, and security headers. No résumé is published. Browser tests validate the email destination without launching or sending mail.

Cross-browser testing exposed two focus defects that were fixed:

- WebKit skipped the skip-navigation anchor on the first Tab. Explicit `tabIndex={0}` makes it reachable; the regression passes, and manual keyboard review confirmed Tab then Enter reaches the main content.
- Firefox could run a scheduled focus callback before React committed the palette's import-failure fallback. Focus now moves through the fallback anchor's callback ref after it exists. The failure-recovery regression passes.

Format, lint, strict TypeScript, all **26 unit tests**, and the static production build passed. CI repeats these checks with a fresh locked install and all three browser engines on Linux.

## Performance

Lighthouse 13.6.0 ran sequentially against loopback production pages using installed Playwright Chromium. These are single local lab runs, not field measurements or physical mobile hardware results. Scores can vary by run and hosting environment.

| Page       | Mode    | Performance | Accessibility | Best practices | Preview SEO | LCP   | TBT    | CLS   |
| ---------- | ------- | ----------- | ------------- | -------------- | ----------- | ----- | ------ | ----- |
| Home       | Mobile  | 99          | 100           | 100            | 63          | 1.0 s | 120 ms | 0.024 |
| Home       | Desktop | 100         | 100           | 100            | 63          | 0.3 s | 10 ms  | 0.006 |
| Projects   | Mobile  | 100         | 100           | 100            | 63          | 0.8 s | 70 ms  | 0.003 |
| Projects   | Desktop | 100         | 100           | 100            | 63          | 0.2 s | 0 ms   | 0     |
| GeoVis     | Mobile  | 100         | 100           | 100            | 63          | 0.8 s | 70 ms  | 0.002 |
| GeoVis     | Desktop | 100         | 100           | 100            | 63          | 0.2 s | 0 ms   | 0.001 |
| Swordbound | Mobile  | 100         | 100           | 100            | 63          | 0.8 s | 60 ms  | 0.014 |
| Swordbound | Desktop | 100         | 100           | 100            | 63          | 0.2 s | 0 ms   | 0     |

Performance, accessibility, and best-practice score targets were met. Preview SEO is deliberately below 95 because preview pages exclude indexing/crawling and omit canonicals. The future indexing configuration is checked separately on loopback only; see the milestone report for its actual results. Production indexing remains disabled. Raw Lighthouse JSON and the keyboard screenshot are retained outside the public repository in the local task visualization directory.

## Repository and browser policy

`npm audit --audit-level=high` reported zero vulnerabilities; direct dependencies matched the pinned manifest. `npm run audit:repo` checks current nonignored files and all locally available historical blobs for forbidden build/credential paths and recognizable credential patterns. CI fetches full history. Findings print locations and rule names, never matched values. This limited pattern scan skips binary contents and cannot establish that every possible secret is absent. Source/provenance review remains necessary.

The production Content Security Policy limits resources to local origins and disallows frames, objects, form submission, media embedding, and camera/microphone/geolocation permissions. Header tests cover normal pages, PNGs, robots, sitemap, and 404s. Opening the palette and playing/exiting Pong produced no policy violations in all browser configurations. The policy retains inline scripts/styles for statically generated Next bootstrap and styling: it is a baseline origin policy, not strict nonce-based XSS protection. No production `unsafe-eval` is allowed; development omits this CSP for HMR. Existing framing, MIME, referrer, and preview indexing headers remain covered. Hosting/CDN enforcement still requires deployed checks.

## Links, provenance, and remaining checks

Read-only external checks returned GitHub 200 and the official YouTube trailer 200. LinkedIn returned 999 to automated access; its human-browser destination still needs manual verification. Public email is the exact user-confirmed address. No message or native composer was opened.

The asset inventory was reviewed: project art is authored conceptual SVG, the trailer is an attributed external link, and Geist retains its font notice. No new company screenshots, private files, third-party footage, résumé, or blanket content license were added. Supplied source documents remain unchanged. Real project media and associated permissions remain pending.

Remaining review limits: manual screen-reader assessment, physical Android/iOS, actual Safari, native browser zoom, and deployed adapter/CDN behavior have not been established. Automated 320-pixel/reflow and enlarged-text checks do not replace those manual checks. Provider/DNS identity, legacy backups, deployed headers/canonicals/redirects, and rollback verification belong to launch preparation. The legacy live site identifies Vercel while the planned preview uses Netlify; owner verification is still required. No deployment or production change occurred.

## Linux CI follow-up

The first Linux matrix passed 191/192 checks; WebKit did not render the required keyboard paddle displacement inside the test's fixed 180 ms hold, including its retry. The test now holds the key while polling the actual rendered paddle displacement, with a bounded assertion timeout and key release in `finally`. It still requires the same movement and pause/focus behavior, without assuming a fixed animation-frame schedule. All four targeted local browser checks passed after the test change; the PR workflow reruns the complete Linux matrix.
