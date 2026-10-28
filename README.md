# Brady Dorsey — Portfolio 2.0

Personal portfolio for **Brady Dorsey — AI Engineer & Builder of Things**.

Primary headline: **I build things.**

## Current status

Milestone 1 establishes the application foundation and a minimal introduction. The complete homepage, case studies, workflow, 3D scene, and command palette will be developed in sequential milestones with human review. See the milestone tracker for verified status and remaining inputs. This repository is independent of `fusion407/portfolio`; the existing portfolio and production hosting remain unchanged.

## Local setup

Use **Node 24.22.1** from `.nvmrc` and `.node-version`, with the npm version in `package.json`. Install/select that runtime with your preferred version manager, then:

```sh
npm ci
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000). Servers bind to loopback by default. No environment variables, API keys, or service accounts are needed. Installation requires registry access; installed fonts are served locally.

## Commands

| Command                | Purpose                                                   |
| ---------------------- | --------------------------------------------------------- |
| `npm run dev`          | Local development server                                  |
| `npm run build`        | Production build and static page generation               |
| `npm start`            | Serve an existing production build locally                |
| `npm run lint`         | ESLint checks with no warnings                            |
| `npm run format:check` | Verify formatting                                         |
| `npm run format`       | Format authored files; supplied source documents excluded |
| `npm run typecheck`    | Generate route types and run strict TypeScript            |
| `npm test`             | Unit tests once                                           |
| `npm run test:watch`   | Unit tests in watch mode                                  |
| `npm run check`        | Formatting, lint, type checks, and unit tests             |
| `npm run test:e2e`     | Production browser and accessibility checks               |
| `npm audit`            | Inspect dependency advisories                             |

Browser tests need a production build and Chromium:

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

On Linux CI, `npx playwright install --with-deps chromium` installs required system libraries too. The test runner starts and stops its own production server on port 3100; keep that port free.

## Architecture

```text
src/app/                 App Router layout, introduction, global tokens
src/content/             Confirmed local content
src/components/layout/   Layout helpers and skip navigation
src/components/ui/       Reusable presentation components
tests/unit/              Vitest and Testing Library
tests/e2e/               Playwright and axe accessibility checks
.github/workflows/       Quality checks; no deployment steps
docs/                    Requirements, decisions, milestones, verification
```

Content stays in server components; future heavy interactions will be isolated and deferred. See [architecture decisions](docs/ARCHITECTURE.md).

## Planning documents

- [Discovery, proposed architecture, content inventory, and risks](docs/DISCOVERY.md)
- [Milestone tracker and review gates](docs/MILESTONES.md)
- [Authoritative product requirements v1.0](docs/source/product-requirements-v1.0.md)
- [Master prompt and delivery process](docs/source/master-prompt.md)

## Proposed implementation

Next.js App Router, React, TypeScript, Tailwind CSS, typed local content, and isolated interactive enhancements. The full dependency and component plan is in the discovery document. Exact versions and compatibility will be verified during the approved foundation milestone.

Exact versions are recorded in the lockfile. See the milestone report for checks actually executed and their limitations.

## Deployment boundaries

Development and eventual Netlify previews must stay isolated from the live portfolio. The foundation sends noindex/nofollow metadata and headers. No production deployment, domain assignment, DNS change, or live Netlify configuration change is authorized. There is no deploy job or site linkage in this repository. Production migration and the NeonSynth browser playground are separate future tasks.

## Licensing and assets

A license has not been selected. Public repository visibility does not grant blanket permission to reuse personal content or third-party/company materials. Only approved assets may be added; project statuses and public-content permissions remain subject to review.
