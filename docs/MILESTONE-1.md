# Milestone 1 — Foundation report

Date: 2026-10-28. Status: completed and accepted. Brady authorized merging PR #1 and continuing to Milestone 2. PR #1 was merged at `10f12eb29d9ef5e3c41092a69df1319cc0b5a634` after its quality workflow passed.

## Delivered scope

- Next.js App Router, React, strict TypeScript, Tailwind CSS theme tokens, and a statically generated foundation introduction.
- Confirmed identity and profile data in a local content module; shared content container, profile links, and skip navigation.
- Locally served Geist Variable typography; responsive spacing, focus indicators, reduced-motion defaults, and semantic landmarks.
- Node 24.22.1 and npm 11.19.1 configuration with exact direct dependencies and an npm lockfile.
- ESLint, Prettier, Vitest/Testing Library, Playwright, and axe integration.
- Read-only CI quality workflow without deployment steps; local-only servers; noindex metadata and headers.
- Setup/development/build/test instructions and architecture decisions.

This is the foundation shell. It does not implement the complete Milestone 2 homepage, case studies, advanced motion, 3D, workflow, command palette, or browser synthesizer.

## Files affected

Framework/configuration: `package.json`, `package-lock.json`, `next.config.ts`, `next-env.d.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`, `playwright.config.ts`, runtime/format/Git ignore files, and `.github/workflows/ci.yml`.

Application: `src/app/`, `src/content/site.ts`, `src/components/ui/`, and `src/components/layout/skip-link.tsx`.

Tests: `tests/setup.ts`, `tests/unit/home.test.tsx`, and `tests/e2e/foundation.spec.ts`.

Documentation: `README.md`, `docs/ARCHITECTURE.md`, `docs/MILESTONES.md`, this report, and formatting normalization in the authored discovery document. Supplied source-document content is not edited.

## Verification

Local environment: Windows, Node 24.22.1, npm 11.19.1.

| Check                              | Result                                                                                                                                               |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm ci`                           | Clean locked installation passed; 457 packages installed                                                                                             |
| `npm run format:check`             | Passed                                                                                                                                               |
| `npm run lint`                     | Passed with no lint warnings                                                                                                                         |
| `npm run typecheck`                | Next.js route generation and strict TypeScript passed                                                                                                |
| `npm test`                         | 2 tests passed                                                                                                                                       |
| `npm run build`                    | Passed; `/` and framework not-found output statically generated                                                                                      |
| `npm run test:e2e`                 | 8 checks passed across desktop Chromium and Pixel 7 Chromium emulation                                                                               |
| axe scan within browser tests      | No reported violations on the foundation at either viewport                                                                                          |
| `npm audit --audit-level=high`     | Passed; 0 known vulnerabilities reported across all dependencies                                                                                     |
| `npm ls --depth=0`                 | Passed with all exact direct dependencies resolved                                                                                                   |
| Source-document SHA-256 comparison | Both local supplied-document copies match the attachments                                                                                            |
| Visual review                      | Narrow browser-pane layout and complete 1280px desktop layout inspected; readable copy, working composition, no observed clipping in the full layout |

Browser tests exercise page identity and metadata, preview noindex and nosniff headers, visible heading, keyboard skip-link focus transfer, functioning confirmed GitHub URL without JavaScript, horizontal overflow, and genuine missing-route HTTP 404 status. The first axe run found a wordmark accessible-label mismatch; the redundant override was removed and both scans passed afterward. Profile destinations are verified as supplied URLs; no claim is made about external LinkedIn page availability.

The GitHub Actions workflow repeats checks on PRs and main-branch pushes using Linux and the same pinned runtime. The PR checks are the authoritative remote-run outcome; local Windows validation alone is not evidence of Linux CI or Netlify success.

The supplied source documents remain untouched in this milestone. Git whitespace checks on those originals may flag intentional Markdown hard-break spaces; formatting deliberately excludes them. npm also reports the existing resolver postinstall script as unapproved under its install-script policy; no approval bypass was added, and all checks passed with that policy intact.

## Known limits

- ESLint 9.39.5 is peer-compatible with the installed Next.js plugin set but emits an upstream deprecation warning. ESLint 10 fails those plugins' peer requirements; see the architecture decision.
- No Netlify deployment or adapter test has occurred. Production configuration and old live URL behavior remain unverified.
- Current automation covers Chromium desktop/mobile emulation, not actual mobile hardware or all browsers. Full manual accessibility, performance scores, media permissions, and launch checks belong to later milestones.
- Email, resume PDF, dates/education, approved project media, and GeoVis publication details remain pending. Licensing is undecided.
- Passing automated checks does not guarantee accessibility conformance or absence of vulnerabilities.

## Review gate

The original review gate was satisfied by Brady's explicit instruction to merge [PR #1](https://github.com/fusion407/portfolio-v2/pull/1) and continue. Milestone 2 is authorized; its own completion still requires review before advancing to Milestone 3.
