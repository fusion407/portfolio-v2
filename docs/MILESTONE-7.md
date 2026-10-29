# Milestone 7 — Professional contact and SEO preparation

Date: 2026-10-29. Status: implemented and verified; awaiting review.

## Delivered scope

- Merged approved PR #6 at `0643564bf3cc79b3e81e17a83c10033ee8b7d20a`, retargeted the dependent Pong PR #7 to main, then merged it at `6d2aab1a2f38b1e5c16d42e1194d235ede6a86b8`. Both passed Linux CI before merging.
- Added the explicitly confirmed public email `fusion407@gmail.com` to the contact section, palette, and Person JSON-LD. Mailto actions open a mail client; no message is automatically sent.
- Deferred the entire résumé page/download at Brady's instruction until he updates it. No résumé placeholder, download, command, social card, or sitemap URL is included.
- Six unique content-page titles/descriptions, full Open Graph/Twitter metadata, and six statically generated 1200×630 PNG cards, using the existing monogram and color palette.
- One shared indexing policy keeps local/CI/preview builds non-indexable through metadata, HTTP headers, robots, empty sitemap, and omitted canonicals. Future production behavior requires three explicit build inputs and an approved domain; it is tested in mocked environments and is not activated.
- Homepage Person data uses confirmed identity, public email, and profiles only. No dates, education, employer relationship, address, or credentials inferred; JSON-LD text is escaped before rendering.
- Read-only live/source legacy route audit and a draft five-path migration map. No redirects, hosting, DNS, domain assignment, or production content changed.

## Files affected

`src/content/pages.ts` and `professional.ts`; shared metadata/policy/social-image helpers; six `/og/<slug>` routes, robots and sitemap; homepage/layout/project metadata; contact and command UI; Next headers; targeted unit/browser coverage; README, asset/content decisions, architecture, SEO/audit records, accepted M6/Pong records, and this report. No new dependency or supplied source-document change.

## Validation

Windows, Node 24.22.1, npm 11.19.1, production Next.js build:

| Check                                               | Result                                                                                         |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `npm run check`                                     | Format, lint, strict TypeScript, and all 26 unit tests passed                                  |
| `npm run build`                                     | Passed; six content pages, six PNGs, robots, and sitemap are static                            |
| `npm run test:e2e`                                  | All 94 desktop/mobile Chromium checks passed; no skips                                         |
| Dependency audit                                    | Zero vulnerabilities reported                                                                  |
| Dependencies/lockfile and supplied source documents | Unchanged                                                                                      |
| Visual review                                       | Desktop 1280 px and mobile 390 px contact section; home and longest project-title social cards |

New coverage checks metadata uniqueness and complete social fields on all six pages, PNG status/type/dimensions, unknown image 404s, preview canonical omission and exclusion signals, structured data, the exact public mailto destination, no-JavaScript contact, enlarged/narrow layouts, the palette's email entry, and résumé omission. Unit tests exercise future production policy only in mocked environments, including header/robots/sitemap/canonical consistency and malformed/preview configurations. Existing Pong, navigation, project, and workflow checks remain covered.

External mail-client launching/sending is not exercised by browser automation: the public link, action registry, and visible palette destination are verified without opening a native composer. Actual hosting-origin/adapter behavior remains M9 work. Local screenshots and raw performance JSON are outside the repository. Linux CI is checked on the review PR.

A single Lighthouse 13.6.0 mobile run against the final local production homepage measured **99 Performance / 100 Accessibility / 100 Best Practices / 63 SEO**, with **1.0 s LCP, 120 ms TBT, and 0.009 CLS**. Preview noindex/crawl exclusions and omitted preview canonicals deliberately limit SEO. Performance is consistent with the prior 98–99 mobile baselines; lab variation does not establish deployed/device/field behavior or production SEO readiness. The agent-owned review server used port 3200 because an existing local server occupied 3000; that existing server was left intact.

## Audit and remaining limits

The legacy repository at `800441d33ddc3508244ec56f5b5bf62a3917f7a0` and live route JSON agree on `/about`, `/skills`, `/experience`, `/projects`; the root is also confirmed. Apex redirects to www. The current sitemap URL serves HTML and an unknown-path probe returns 200 HTML. Responses identify Vercel, so the earlier Netlify assumption needs owner verification before migration. Details and the inactive draft map are in `LEGACY-URL-AUDIT.md`.

Broader copy refinements remain deferred; absent employment dates, education, and approved real project media are not invented. Résumé absence is an explicit scope deferral, not a fake download or silent acceptance claim. Full manual screen-reader, physical-device, Safari/Firefox, deployed adapter/CDN/canonical behavior, provider/DNS identity, backups, and migration rollback remain later QA/launch work. Preview indexing guidance is not confidentiality protection.

Stop for review before merging M7 or beginning M8. No production deployment is authorized by this milestone.
