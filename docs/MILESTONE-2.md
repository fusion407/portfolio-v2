# Milestone 2 — Homepage and navigation

Date: 2026-10-28. Status: completed and accepted. Brady approved the current work, deferred copywriting refinements, and explicitly authorized merging PR #2 and starting Milestone 3. Merge commit: `d8d4a459d076e0e2a6fb78e47e3f181a493b5009`; Linux CI passed before merge.

## Delivered

- Complete responsive homepage: hero, featured builds, how I build, experience, technology stack, about, and contact.
- Sticky desktop navigation and a mobile disclosure with keyboard Escape, focus restoration, close-on-selection, and native section-focus behavior.
- Reusable section headings, project cards, status badges, technology tags, and typed content modules.
- Four accurate project summaries with expandable overviews and clearly labeled conceptual SVG covers. No proprietary screenshots, simulated product interfaces, audio demo, or invented project achievements.
- Static abstract network in the hero; readable eight-stage workflow and a clear validation feedback loop.
- Confirmed Kohola/Swordbound experience and supplied tools grouped by runtime, development, and creative use. No invented dates, education, employers, metrics, languages, or personal framework skills.
- Real GitHub/LinkedIn contact actions; missing public email and resume download explicitly pending. No contact form or dummy links.
- SVG favicon and responsive typography/focus/reduced-motion styles. No added dependencies.

## Files and components

Application composition and styles: `src/app/page.tsx`, `src/app/globals.css`, and `src/app/icon.svg`.

Content: `src/content/navigation.ts`, `projects.ts`, `experience.ts`, and `workflow.ts`.

Layout/UI: `components/layout/site-header.tsx`, `mobile-navigation.tsx`, `site-footer.tsx`, and `components/ui/section-heading.tsx`.

Sections: `components/sections/hero.tsx`, `featured-builds.tsx`, `how-i-build.tsx`, `experience.tsx`, `technology-stack.tsx`, `about.tsx`, and `contact.tsx`.

Project presentation: `components/projects/project-card.tsx` and `project-artwork.tsx`.

Verification/documentation: `tests/e2e/homepage.spec.ts`, SVG formatting override, README, architecture decisions, milestone tracker, M1 acceptance record, and this report. All component paths above are under `src/`.

## Verification evidence

Environment: Windows, Node 24.22.1, npm 11.19.1, production Next.js build.

| Check                               | Result                                                                                                   |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Formatting, lint, strict TypeScript | Passed                                                                                                   |
| Unit tests                          | 2 passed                                                                                                 |
| Production build                    | Passed; homepage, framework not-found output, and SVG icon statically generated                          |
| Chromium browser checks             | 20 passed across desktop and Pixel 7 emulation                                                           |
| Automated accessibility             | No reported axe violations on the full page, expanded project details, or open mobile menu               |
| Responsive layout                   | No horizontal overflow at 360, 390, 768, 1280, and 1536 CSS pixels                                       |
| Enlarged text                       | No horizontal overflow at 390px with root text enlarged to 200%                                          |
| Navigation                          | All local fragments resolve; mobile Escape/focus restoration and section focus transfer pass             |
| Progressive enhancement             | Native navigation and project disclosures work without JavaScript; reduced-motion controls remain usable |
| Dependency audit                    | 0 known vulnerabilities reported; no dependency changes                                                  |
| Visual review                       | Narrow homepage, 390px project navigation, and complete 1280px desktop layout inspected                  |

The first scan exposed insufficient primary-button contrast; white on-accent text corrected it. Browser tests also exposed Next.js fragment navigation leaving focus outside the selected section after closing the mobile menu; native anchors corrected that behavior. Lighthouse identified a missing default favicon request; the SVG metadata icon addresses it.

GitHub Actions repeats formatting, lint, type checks, unit tests, audit, production build, and all 20 browser checks on the review PR. Remote check status is visible in the PR; local Windows checks alone do not establish Linux or Netlify behavior.

## Performance baseline

Sequential Lighthouse 13.6.0 local production runs using Playwright Chromium 156, with default mobile emulation and the desktop preset:

| Measurement              | Mobile | Desktop |
| ------------------------ | ------ | ------- |
| Performance              | 98     | 100     |
| Accessibility            | 100    | 100     |
| Best Practices           | 100    | 100     |
| SEO                      | 60     | 60      |
| Largest Contentful Paint | 0.9 s  | 0.2 s   |
| Total Blocking Time      | 150 ms | 0 ms    |
| Cumulative Layout Shift  | 0.002  | 0.006   |

The only failed binary audit in the final reports is crawlability, because both metadata and HTTP headers deliberately send noindex/nofollow. Do not remove preview protections to improve that score. Production SEO remains M7 and launch work. The earlier favicon 404 is resolved; final Best Practices is 100.

The CLI was run with `--chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo --output=json` against `http://127.0.0.1:3000`; desktop adds `--preset=desktop`. `CHROME_PATH` selected the installed Playwright Chromium binary. Raw JSON reports are local review artifacts outside the public source tree. Each is a single lab run on the development machine; scores can vary with machine load and do not establish deployed/CDN performance or field Core Web Vitals. Future M5 measurements should compare against this static baseline.

## Remaining scope and inputs

- M3: project index and dedicated case studies, route-aware shared templates, and branded 404. Current project cards expose local summaries rather than unfinished links.
- M4: selectable workflow stages with detailed inputs/outputs and connected interaction.
- M5/M6: animated 3D, motion, and command palette.
- M7+: resume, supplied contact details, production SEO, old URL audit, broader QA, and isolated Netlify preview.
- Approved media, GeoVis publication permissions, email, resume, dates/education, and licensing remain outstanding. Missing data is not invented.
- ESLint 9's upstream deprecation limitation remains as documented in M1. No peer-validation or install-script policy bypass is added.
- Automated Chromium emulation and axe scans do not replace real mobile hardware, other browsers, screen-reader review, or complete accessibility evaluation.

PR #1 was merged with Brady's explicit authorization. This milestone has no deployment job and changes no live site, hosting configuration, domain, or DNS. The review gate for [PR #2](https://github.com/fusion407/portfolio-v2/pull/2) was subsequently satisfied by Brady's explicit approval to merge and begin M3. M3 has its own review gate.
