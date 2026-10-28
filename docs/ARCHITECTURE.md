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

## Milestone 3 — Shared project system

The root layout now owns the header, main/skip target, footer, and top anchor so all routes and 404s share exactly one shell. The homepage composes sections within that layout. A Projects navigation entry and case links expose only implemented routes; native root-relative section anchors still work from case-study pages.

`src/content/projects.ts` extends the existing summaries with typed public slugs, section content, and optional migration/playground/trailer data. Existing homepage text is retained. `generateStaticParams` emits four known slugs, `dynamicParams = false` rejects unknown paths, and lookup returns undefined for unknown strings rather than falling through to a project. Page metadata is unique; preview robots/header protections are inherited.

The shared case template renders optional capabilities from data rather than duplicated page implementations. Sidebar anchors, next-project links, and index cards use the same project records. Heading level is explicit for index versus homepage cards. The NeonSynth extension component is a passive server-rendered content boundary, with no audio runtime or controls. The official trailer remains a direct attributed link with no third-party script/embed cost.

`app/not-found.tsx` provides branded recovery UI. Direct HTTP tests verify `/404`, unknown root paths, unknown slugs, and extra nested paths return 404 rather than successful placeholder pages. No separate `/404` page that could accidentally return 200 is created.

All project covers remain conceptual SVGs. See `ASSETS.md` for source/provenance and outstanding approvals. The installed Geist OFL notice is retained with public assets; no code license is assumed. No dependency changes are needed.

## Milestone 4 — Progressive workflow explorer

The interactive workflow uses a small client boundary with typed stage data and a shared detail renderer. Ordinary pressed-state buttons control one labeled detail region; keyboard behavior stays local to those buttons and preserves modifier shortcuts. A concise status announcement avoids reading the entire detail panel after every selection. The explicit feedback action selects and focuses implementation rather than implying a terminal “done” stage.

For progressive enhancement, stable `useSyncExternalStore` server/client snapshots render native stage fragment links in server HTML, then upgrade them to identically styled buttons after hydration. The native full-reference disclosure is always available. Fragment navigation without JavaScript invokes the browser's ancestor-revealing behavior, opening the disclosure and focusing the referenced stage. This avoids effect-driven initial hiding, inert server controls, layout-sized loading placeholders, or a diagram library.

Purpose/input/output data follows the supplied methodology. It does not make new claims about completed work or automatic code security. FatalFox Studios is a separately confirmed employer correction, documented in `CONTENT-DECISIONS.md`; the Swordbound project title and route are unchanged.

## References checked

- [Node release support](https://nodejs.org/en/about/previous-releases)
- [Next.js setup](https://nextjs.org/docs/app/getting-started/installation)
- [Tailwind with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [Next.js Vitest guidance](https://nextjs.org/docs/app/guides/testing/vitest)
- [Next.js on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/)
- [Static project parameters](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [Next.js not-found behavior](https://nextjs.org/docs/app/api-reference/functions/not-found)
- [React server/client snapshots](https://react.dev/reference/react/useSyncExternalStore)
- [HTML fragment navigation and ancestor reveal](https://html.spec.whatwg.org/multipage/browsing-the-web.html#scroll-to-fragid)

Package metadata was checked before installation. The lockfile records exact resolution; actual validation results belong in the milestone report.
