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

## Milestone 5 — Deferred 3D and restrained motion

The server-rendered SVG network is extracted intact as the always-present fallback. A homepage-only client wrapper checks viewport/pointer/motion preferences, data-saving hints, core count, intersection, and page visibility before requesting a lazy scene after a 1.5-second delay. It skips 3D for narrow/coarse-pointer/reduced-motion devices, data saving, and devices reporting at most two logical cores. These are conservative hints rather than reliable GPU classification; continuous frame-delivery monitoring handles sustained poor performance after startup.

React Three Fiber 9.8.2 supports the installed React 19.3.1, paired with Three 0.186.1 and matching-major types 0.186.0. The small scene has eight nodes, eighteen connections, two orbit rings, no textures, shadows, postprocessing, network assets, controls library, or moving camera. MeshBasicMaterial and additive shells supply cyan/purple illumination. Demand rendering is requested at roughly 30 fps only while visible and unpaused, with DPR capped at 1.5 and low-power renderer preference. Pointer parallax and ambient rotations are deliberately small.

The SVG remains visible until the first scene frames are rendered. Reserved control space prevents pause-button layout shifts. A visible keyboard-accessible pause/resume button controls continuous movement. Page hiding and intersection changes stop the render timer; re-entry resumes without accumulating elapsed hidden time. A React error boundary handles renderer/import failures; context loss and a sustained 60-frame mean above 90 ms after warmup permanently select the SVG for that mount. Resources, event listeners, observers, timers, and native animations are cleaned up on unmount. No automatic retry loop is used.

Motion 14.7.1 is used through its deferred `motion/mini` entry point for brief heading translations. Server content starts fully visible; no opacity gate, scroll hijacking, focus interception, or animation prerequisite is introduced. CSS provides small route entrances, navigation underlines, card-artwork hover/focus scaling, and pressed-button feedback. The shared template replays route entrances; reduced-motion preferences disable them and finish active heading animations. Project routes do not import the hero wrapper or request the renderer chunk; browser tests verify that boundary and reduced-motion download avoidance.

Performance and bundle evidence, platform limits, and manual review are recorded in `MILESTONE-5.md`.

## Milestone 6 — Deferred command palette

A small shared header client component handles Ctrl/Cmd+K and a visible trigger. Its initial server snapshot offers a project-index link; the cmdk/Radix dialog and command registry are imported only when requested. Download failure announces the issue and focuses a working fallback link. The registry derives confirmed navigation, project titles, and professional profile destinations from existing content; unavailable resume/email destinations are omitted.

Radix's explicit focus lifecycle APIs provide containment, input focus, invoker restoration, and navigation after modal cleanup. Native location navigation then preserves homepage fragment focus from any route. Command filtering is a case-insensitive substring match over titles and explicit aliases, avoiding unrelated fuzzy subsequences. Dialog content is unmounted on close, clearing its search state. No search backend or data transmission is involved.

## Additional approved change — Homepage arcade

Brady's subsequent instruction replaces the 3D hero with an opt-in arcade after M6. `HeroArcade` renders a static court invitation and only imports a game after Play. A typed registry holds loaders and metadata; selection is random over registered games, currently only Pong. An exit unmounts the game and restores Play focus. The completed M6 work is a separate review PR; the arcade branch depends on it.

Pong uses Canvas 2D with a pure, bounded-step simulation. The logical court is 800×480, the player has keyboard or pointer/touch input, and the speed-limited computer has imperfect tracking. The ball's contact position controls its return angle; speed is capped, score resets include a serve delay, and the first side to five ends the match. The UI updates score/status only at meaningful state changes rather than on every frame. Canvas pixels adapt to layout with DPR capped at 2. No audio, server, storage, third-party assets, or new runtime package is needed.

Input is scoped to the focused court, with Tab available to leave it. Leaving the game, opening search, window blur, page hiding, or scrolling the game out of view pauses it. Resuming is explicit. Frame requests, observers, and event listeners are cleaned up; paused and completed matches do not keep a render loop running. Restart creates a fresh simulation; exit releases the entire game. Initial HTML explains JavaScript availability, and download/canvas failures preserve navigation or an exit.

The removed Three/Fiber implementation and its obsolete WebGL tests remain recoverable in Git history. Its dependencies and styles are removed; the independent Motion mini/CSS enhancements remain. The historical M5 architecture above describes the previously delivered feature. Current validation and performance evidence are in `HOMEPAGE-ARCADE.md`.

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
- [React Three Fiber compatibility](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [Fiber demand rendering and performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- [Canvas lifecycle and renderer configuration](https://r3f.docs.pmnd.rs/api/canvas)
- [Motion mini animation API](https://motion.dev/docs/animate)
- [cmdk command menu API](https://github.com/dip/cmdk)
- [Radix dialog focus and modal behavior](https://www.radix-ui.com/primitives/docs/components/dialog)

Package metadata was checked before installation. The lockfile records exact resolution; actual validation results belong in the milestone report.
