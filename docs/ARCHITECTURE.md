# Architecture decisions — Milestone 1

## Runtime and framework

Use Node 24.22.1 LTS for local development and CI, with the same version intended for the future isolated Netlify site. `.nvmrc`, `.node-version`, and the package engine document the runtime. Installing through the existing version manager does not change other projects' runtime files.

Use stable Next.js 16.4.3 and React/React DOM 19.3.1. The framework peer requirements and Netlify documentation were checked before implementation. Actual Netlify adapter behavior remains untested until the isolated preview milestone. No hosting account, domain, or deployment configuration is created in M1.

The project is configured manually in the existing repository to preserve its discovery history and supplied documents. App Router server components are the default; no application client boundary is needed for the initial shell.

## Content and components

`src/content/site.ts` holds confirmed identity, supporting copy, and professional profile links. It does not infer personal skills from the website's technologies. Email, resume, dates, and project artwork remain pending.

`src/app/page.tsx` is a minimal foundation introduction, not the Milestone 2 homepage. Layout and small UI components provide the semantic shell, skip navigation, content width, and profile links. Links navigate in the same tab using native browser behavior.

Create additional content modules, case-study templates, sections, and interactive boundaries when their milestones need them. Avoid unused dependencies and empty placeholder directories. No synthesizer runtime, Three.js, Motion, React Flow, or command palette is installed in M1.

## Design tokens and fonts

Tailwind's CSS-first theme contains the seven supplied colors, typography, gutter, radius, and technical-label tokens. Semantic component classes express the small foundation composition; utilities remain available for layout. Colors are referenced through CSS variables.

Geist Variable is an exact Fontsource dependency served from this application. No build-time Google Fonts request or third-party font script is required. Font licensing stays with the dependency; the repository has no blanket content or code license until Brady decides.

Visible focus, skip navigation, minimum profile-link target height, landmarks, fluid typography, and reduced-motion overrides are established now. Full accessibility and performance acceptance requires later content and interaction checks.

## Indexing and security

The foundation is always noindex/nofollow in metadata and the HTTP response. This deliberate default protects future development previews from accidental indexing. Production SEO and any indexing change require the later approved production process.

Headers disable MIME sniffing, frame embedding, and unneeded camera/microphone/geolocation access, and establish a referrer policy. The framework identification header is disabled. A strict CSP will be evaluated against actual media and interaction requirements during QA. No contact form, secrets, database, analytics, or custom backend is used.

## Tooling and testing

TypeScript is strict with unchecked index access enabled. ESLint uses the Next.js core-web-vitals and TypeScript configurations; formatting is checked separately. Supplied source documents are excluded from formatting and preserved verbatim, including intentional Markdown line breaks. Git marks those files as non-normalized to preserve their original bytes in future updates.

Vitest and Testing Library exercise identity and real professional links. Browser tests use a production build and cover rendering, skip focus, no-JavaScript access, missing-route status, headers, accessibility scans, and viewport overflow. Servers bind only to loopback. Additional browsers, real mobile hardware, screen-reader review, full WCAG coverage, and Lighthouse targets remain later QA work.

GitHub Actions runs locked installation, formatting, lint, type checks, unit tests, dependency audit, build, and browser tests. Workflow permissions are read-only; no deploy job or hosting secrets are used. Passing checks does not establish vulnerability-free software.

### Lint ecosystem limitation

ESLint 10 was checked against the installed dependency tree. Although `eslint-config-next` declares a broad ESLint range, its bundled import, JSX accessibility, and React plugins declare peer ranges ending at ESLint 9. Use exact ESLint 9.39.5 without peer overrides for now. Its registry deprecation notice is a maintenance limitation; revisit when the plugin set supports a maintained newer major. Do not suppress peer validation or claim the deprecated tool is supported. The current dependency audit result is recorded separately from this compatibility decision.

## Milestone 2 — Homepage decisions

The homepage now composes seven server-rendered section components. Typed local modules separate navigation, project summaries, workflow stages, and experience/tool groups from layout. Shared section headings and project cards keep presentation consistent without adding packages.

Project summaries use native `details`/`summary` elements. They provide useful content and touch/keyboard disclosure now without sending visitors to case-study routes that do not exist until M3. All four visuals are authored decorative SVGs with a visible conceptual-artwork label; they are not screenshots, actual product interfaces, or demonstrations of implemented capabilities.

The hero uses an abstract static SVG node network. Three.js and animated/cursor-driven rendering remain M5. The eight-stage methodology is a readable ordered list with a visible feedback-to-implementation note; the selectable detailed explorer remains M4.

Mobile navigation is a native disclosure with one small client helper for Escape, trigger-focus restoration, and closing on selection. Browser-native fragment anchors deliberately preserve focus transfer to section targets. The shared registry retains root-relative section URLs for future reuse from case-study pages. Core links and disclosures still work with JavaScript disabled; in that case the mobile disclosure is closed manually using its summary after navigation.

The supplied purple remains the primary button background. A separate white on-accent token meets small-text contrast requirements; the standard primary text token alone measured 4.36:1 on that purple. All original seven palette tokens remain intact. SVG formatting is configured explicitly and no dependency or lockfile change is needed.

The favicon is an authored SVG App Router metadata asset. The browser and Lighthouse checks use the same loopback-only production build. Performance scores are local baselines, not claims about a deployed site; preview noindex remains intentional.

## References checked

- [Node release support](https://nodejs.org/en/about/previous-releases)
- [Next.js setup](https://nextjs.org/docs/app/getting-started/installation)
- [Tailwind with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [Next.js Vitest guidance](https://nextjs.org/docs/app/guides/testing/vitest)
- [Next.js on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/)

Package metadata was checked before installation. The lockfile records exact resolution; actual validation results belong in the milestone report.
