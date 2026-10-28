# Milestone 3 — Project showcase system

Date: 2026-10-28. Status: implementation and local validation complete; awaiting Brady's review.

## Delivered

- `/projects` lists all four projects using the same content records and cards as the homepage.
- `/projects/geovis`, `/projects/neonsynth`, `/projects/titanforge-studio`, and `/projects/swordbound-protocol` are statically generated from typed, allowlisted slugs.
- Reusable case-study template: breadcrumb, category/title, summary, status/role/tool facts, conceptual cover, contents navigation, sections, contributions, and next-project/all-projects navigation.
- Shared header, main landmark/skip target, footer, and top anchor live in the root layout. All pages have one consistent shell without duplicate landmarks.
- Homepage cards link to actual project routes. Existing homepage wording is unchanged; refinements are deferred per Brady's instruction.
- GeoVis distinguishes the existing cloud application from in-development desktop/Ollama targets and credits the pre-existing architecture.
- NeonSynth has a passive future-playground boundary under `src/features/neonsynth/`. No audio engine, fake instrument, controls, DSP port, or browser-audio architecture is implemented.
- TitanForge remains a concise early-prototype presentation without claims of delivered planned capabilities.
- Swordbound lists the nine supplied contribution areas and links to its official trailer with third-party attribution. No YouTube player or remote thumbnail is loaded.
- Branded not-found UI offers recovery links and genuine HTTP 404 responses, including `/404` and unknown project paths.
- Project-specific titles/descriptions, preserved preview noindex, responsive styles, asset inventory, and retained Geist notice. No dependency changes.

## Files affected

- Routes/layout: `src/app/layout.tsx`, `page.tsx`, `projects/page.tsx`, `projects/[slug]/page.tsx`, and `not-found.tsx`.
- Content: `src/content/projects.ts` and `navigation.ts`.
- Presentation: `src/components/projects/case-study.tsx`, `project-card.tsx`, shared header/mobile navigation, featured-builds section, and global styles.
- Extension boundary: `src/features/neonsynth/playground-slot.tsx`.
- Verification: homepage route checks, `tests/e2e/projects.spec.ts`, and the unit test adjusted for the header moving to the root layout.
- Documentation/assets: README, architecture decisions, milestone tracker, M2 acceptance record, this report, `docs/ASSETS.md`, and `public/licenses/geist-OFL.txt`.

## Verification evidence

Environment: Windows, Node 24.22.1, npm 11.19.1, production Next.js build.

| Check                                  | Result                                                                                                                                                |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Formatting, lint, strict TypeScript    | Passed                                                                                                                                                |
| Unit tests                             | 2 passed                                                                                                                                              |
| Production build                       | Passed; listing and four allowlisted case studies prerendered                                                                                         |
| Chromium desktop/mobile browser checks | 40 passed                                                                                                                                             |
| Accessibility scans                    | No reported axe violations on listing, all case studies, branded 404, or existing homepage states                                                     |
| Content boundaries                     | Migration targets/architecture ownership, passive synth slot, early prototype, nine contribution areas, and trailer attribution verified              |
| Navigation                             | Card/index routes, next-project loop, breadcrumbs, cross-route mobile section navigation, and no-JavaScript case reading/trailer attribution verified |
| HTTP status                            | `/404`, unknown root path, unknown project slug, and an extra nested project path all return branded 404                                              |
| Layout                                 | No overflow across listing, cases, and 404 at 360/768/1280 CSS pixels; NeonSynth at 390px with 200% root-text enlargement also passes                 |
| Runtime behavior                       | No uncaught page errors on case routes; no YouTube/thumbnail requests on Swordbound load                                                              |
| Dependency audit                       | 0 known vulnerabilities; manifest and lockfile unchanged                                                                                              |
| Source documents                       | Neither supplied source document changed                                                                                                              |
| Visual review                          | Desktop listing, all case studies, branded 404, and mobile future-playground section inspected                                                        |

The first browser run found low 404-number contrast and enlarged-text overflow in the compact header/facts layout. The number now uses the tested muted token; small-screen header text wraps and project facts stack. The final 40-test run passed with those fixes.

GitHub Actions repeats checks and all 40 browser tests on the PR. PR checks are authoritative for Linux results; local verification alone does not establish Linux or Netlify behavior. M2 Lighthouse scores are historical homepage baselines, not measurements of the new case pages. Representative performance audits remain later QA work.

## Known limits and next milestone

- Actual approved screenshots/captures are absent; covers remain labeled conceptual. GeoVis approvals and private permission evidence remain pending in the asset inventory.
- Copywriting refinements are deferred. No employer dates, education, metrics, personal language/framework skills, or planned achievements are invented.
- Resume/contact completion, production SEO, old URL/configuration audit, broader QA, and isolated Netlify preview remain later milestones. Preview noindex stays enabled.
- The documented ESLint 9 deprecation limitation remains. No peer or install-script validation bypass is added.
- Chromium emulation and scans do not replace real devices, other browsers, screen readers, or guarantee vulnerability-free software.

PR #2 was merged only after explicit approval, at `d8d4a459d076e0e2a6fb78e47e3f181a493b5009`. This milestone changes no old repository, live site, Netlify configuration, domain, or DNS. Pause for review before merge and before M4, the interactive eight-stage AI workflow explorer.
