# Milestone 8 — QA evidence

Date: 2026-10-29. Local production builds on Windows, Node 24.22.1, npm 11.19.1. This report records measured coverage and remaining checks; automated results do not establish universal accessibility, security, or deployed behavior.

## Behavior and accessibility

The clean full run passed **216 browser checks**, with no skips or retries: 54 each in desktop Chromium, Pixel 7 Chromium emulation, desktop Firefox, and desktop WebKit. Playwright browser versions were Chromium 156, Firefox 157, and WebKit 27.2. WebKit is engine coverage, not an actual Safari device test. A subsequent targeted run passed all 24 responsive checks after adding 320 CSS pixels to the existing width matrices.

Coverage includes six content pages, real unknown-path 404s, metadata and social PNGs, navigation, palette shortcuts/filtering/focus/failure recovery, workflow selection, the minimal cover, game picker, opt-in Pong and Asteroids controls/lifecycle/fallbacks, reduced motion, no-JavaScript content, axe scans, narrow layouts, and security headers. No résumé is published. Browser tests validate the email destination without launching or sending mail.

Cross-browser testing exposed two focus defects that were fixed:

- WebKit skipped the skip-navigation anchor on the first Tab. Explicit `tabIndex={0}` makes it reachable; the regression passes, and manual keyboard review confirmed Tab then Enter reaches the main content.
- Firefox could run a scheduled focus callback before React committed the palette's import-failure fallback. Focus now moves through the fallback anchor's callback ref after it exists. The failure-recovery regression passes.

Format, lint, strict TypeScript, all **33 unit tests**, and the static production build passed. CI repeats these checks with a fresh locked install and all three browser engines on Linux.

## Performance baseline before the arcade extension

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

The production Content Security Policy limits resources to local origins and disallows frames, objects, form submission, media embedding, and camera/microphone/geolocation permissions. Header tests cover normal pages, PNGs, robots, sitemap, and 404s. Opening the palette and playing/exiting Pong and Asteroids produced no policy violations in all browser configurations. The policy retains inline scripts/styles for statically generated Next bootstrap and styling: it is a baseline origin policy, not strict nonce-based XSS protection. No production `unsafe-eval` is allowed; development omits this CSP for HMR. Existing framing, MIME, referrer, and preview indexing headers remain covered. Hosting/CDN enforcement still requires deployed checks.

## Links, provenance, and remaining checks

Read-only external checks returned GitHub 200 and the official YouTube trailer 200. LinkedIn returned 999 to automated access; its human-browser destination still needs manual verification. Public email is the exact user-confirmed address. No message or native composer was opened.

The asset inventory was reviewed: project art is authored conceptual SVG, the trailer is an attributed external link, and Geist retains its font notice. No new company screenshots, private files, third-party footage, résumé, or blanket content license were added. Supplied source documents remain unchanged. Real project media and associated permissions remain pending.

Remaining review limits: manual screen-reader assessment, physical Android/iOS, actual Safari, native browser zoom, and deployed adapter/CDN behavior have not been established. Automated 320-pixel/reflow and enlarged-text checks do not replace those manual checks. Provider/DNS identity, legacy backups, deployed headers/canonicals/redirects, and rollback verification belong to launch preparation. The legacy live site identifies Vercel while the planned preview uses Netlify; owner verification is still required. No deployment or production change occurred.

## Linux CI follow-up

The first Linux matrix passed 191/192 checks; WebKit did not render the required keyboard paddle displacement inside the test's fixed 180 ms hold, including its retry. The test now holds the key while polling the actual rendered paddle displacement, with a bounded assertion timeout and key release in `finally`. It still requires the same movement and pause/focus behavior, without assuming a fixed animation-frame schedule. All four targeted local browser checks passed after the test change; the clean rerun on `b044493061f24e510571ffb703cc99fc079725eb` passed all 192 checks. The subsequent arcade extension increases the matrix to 216.

## Final arcade extension verification

After adding the minimal cover, explicit Pong/Asteroids picker, and short-tap Fire fix, the final full matrix passed **216 checks with no skips or retries** (54 per configuration). All **33 unit tests**, format/lint/strict types, production build, dependency audit (zero vulnerabilities), and repository/history pattern scan passed. Six new browser cases per configuration cover picker focus/lazy loading, rendered ship motion, pause/restart/switching, touch/pointer shots, interruptions, reflow, and failure recovery. Security tests run both games under the CSP. Manual review covered the desktop cover/picker and 390-pixel game controls; local images remain outside Git.

Final homepage Lighthouse 13.6.0 runs, measured sequentially after tests completed:

| Mode    | Performance | Accessibility | Best practices | Preview SEO | LCP    | TBT    | CLS   |
| ------- | ----------- | ------------- | -------------- | ----------- | ------ | ------ | ----- |
| Mobile  | 98          | 100           | 100            | 63          | 1.04 s | 162 ms | 0.024 |
| Desktop | 100         | 100           | 100            | 63          | 0.27 s | 0 ms   | 0.007 |

These initial-load lab scores meet the performance/accessibility/best-practice targets. Preview SEO exclusions remain deliberate. The earlier project-page and loopback launch-mode measurements above predate this extension; they are retained as baseline evidence, not fresh measurements of the final build. No deployed, physical-device gameplay/frame-rate, native zoom, or nonvisual-equivalence claim is made. No public indexing or hosting setting changed.

## M9 — Vercel hosted verification (2026-10-29)

The Netlify assumption in the earlier historical M8 notes is superseded by the user-confirmed Vercel account. The new isolated project is portfolio-v2-preview; the original live project and both live domain assignments were rechecked unchanged.

Tested immutable preview: https://portfolio-v2-preview-ma0e79x3l-fusion407s-projects.vercel.app, deployment dpl_62tSpNgiTJJF9UYgvMDWoCQvpiUH, application revision fc189487a9375e8c8cccd5c456fc14b4f6aa0496. Subsequent QA/documentation changes do not change app source, the lockfile, platform configuration, or preview build wrapper. GitHub CI passed all 36 unit and 216 browser checks on 28eaf930e6fd1646dc61d85491a2ac1ff8cb323c; Vercel automatically deployed that commit too.

All **28 hosted cases passed** across desktop Chromium, mobile Chromium emulation, Firefox, and WebKit, without skips/retries. Coverage includes six content routes, correct HTTP statuses and security/noindex headers, metadata/origins, six social cards, robots/empty sitemap, real 404s, legacy 301/query/fragment behavior, contact/search/mobile disclosure, both games/focus/pause/restart/exit and CSP, axe, assets and narrow layout. The first run passed 27/28 because the new mobile test assumed a button instead of the existing native summary disclosure; the corrected full run passed 28/28. Signed-in visual review additionally covered keyboard/touch game controls at desktop and 390-pixel layouts.

Lighthouse 13.6.0 ran six sequential hosted lab samples using fresh headless Playwright Chromium processes, mobile defaults and the explicit desktop API configuration. The user-authorized 23-hour share link bootstrapped isolated authenticated requests; only credential-free summaries were saved outside Git. Full Lighthouse reports containing authentication settings were discarded. Initial measurement setup was corrected to isolate browser processes and select the actual desktop configuration before recording the final six-run set.

| Page       | Mode    | Performance | Accessibility | Best practices | Preview SEO | LCP     | TBT    | CLS    |
| ---------- | ------- | ----------- | ------------- | -------------- | ----------- | ------- | ------ | ------ |
| Home       | Mobile  | 98          | 100           | 100            | 54          | 1.743 s | 78 ms  | 0      |
| Home       | Desktop | 100         | 100           | 100            | 54          | 0.328 s | 0 ms   | 0.0069 |
| Projects   | Mobile  | 99          | 100           | 100            | 54          | 0.931 s | 124 ms | 0.0027 |
| Projects   | Desktop | 100         | 100           | 100            | 54          | 0.282 s | 0 ms   | 0.0018 |
| Swordbound | Mobile  | 99          | 100           | 100            | 54          | 0.930 s | 117 ms | 0.0209 |
| Swordbound | Desktop | 100         | 100           | 100            | 54          | 0.269 s | 0 ms   | 0.0013 |

Performance/accessibility/best-practice targets are met. Preview SEO includes deliberate noindex and protected crawling restrictions; it is not a production SEO measurement. These single samples are not field data, physical-device/frame-rate testing, actual Safari, screen-reader equivalence, or native zoom validation. The M8 loopback launch-mode SEO evidence remains historical. Full private configuration/DNS backup and recovery rehearsal remain separate production prerequisites. No production migration occurred.
