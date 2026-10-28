# Portfolio 2.0 — Discovery and proposed architecture

Date: 2026-10-28. Status: proposed; awaiting Brady's approval for Milestone 1.

## Authority and boundaries

The supplied Product Requirements & Design Specification v1.0 is authoritative. The supplied master prompt defines the delivery process. Unmodified copies live in `docs/source/`. Changes to these requirements require explicit decisions, recorded here rather than silent edits to the supplied documents.

This milestone writes planning documentation only. No application scaffolding, dependencies, Git initialization, repository creation, account configuration, or deployment is authorized by this milestone. Stop for human review after every subsequent milestone. The existing bradydorsey.dev deployment, DNS, domain assignments, and production Netlify settings must remain unchanged. Production migration and the NeonSynth browser playground require separate future authorization.

## Discovery evidence

- Read both supplied documents completely.
- The selected workspace was empty, including hidden entries; it is not a Git checkout. No application, approved media, resume, deployment configuration, or local project instructions were found. No `AGENTS.md` was found at the workspace or its checked ancestors.
- Node, npm, and Git executables are available. Their versions, supported Node LTS selection, package peer dependencies, and clean install/build still need verification in Milestone 1.
- Attempts to read https://www.bradydorsey.dev/, https://bradydorsey.dev/, https://www.bradydorsey.dev/robots.txt, and https://www.bradydorsey.dev/sitemap.xml through the web research tool failed. This is a tool access result, not proof the site is down. No current design, content, URLs, redirects, technology stack, or account configuration was verified.
- Public-site audit and current Netlify configuration inventory remain open. They do not block an isolated local foundation, but block claims of complete migration readiness.

## Proposed architecture

Use Next.js App Router, TypeScript, React, and Tailwind CSS. Render portfolio copy, project descriptions, navigation links, and metadata on the server and statically generate the known routes. No database, authentication, API keys, contact form, or custom application backend is needed.

Prefer a standard Next.js build using Netlify's OpenNext adapter, with static generation for the portfolio pages, rather than committing to `output: export`. This retains native image optimization and hosting integration. Netlify may provision framework infrastructure; this is distinct from adding a custom backend. Verify the actual build on an isolated Netlify site before claiming deployment compatibility.

Keep client-side code limited to mobile navigation, workflow selection, command palette, and decorative motion/3D. Load Three.js only within a deferred hero enhancement, behind a client boundary. Show a static node-network visual and readable hero content immediately. Other pages should not import the hero scene.

Use typed local content rather than MDX initially. Four curated case studies do not justify an additional content compiler. Model project slug, title, category, role, status, summary, contributions, media provenance/approval, external links, and future sections explicitly. Preserve the distinction between delivered contributions and migration targets. Missing links and downloads are optional data, never dummy URLs.

Maintain a shared navigation/command registry so section anchors, project routes, and available professional links agree. Publish only approved content; keep permission evidence and private materials outside a public repository. A public asset manifest should contain only safe attribution and usage information.

## Dependency plan and compatibility

| Layer | Proposed dependency | Timing and rationale |
| --- | --- | --- |
| Framework | Stable Next.js with its supported React/React DOM pair | M1; no canary releases; inspect peer dependencies and lock exact resolution |
| Types and styling | TypeScript, Tailwind CSS and its documented Next.js/PostCSS integration | M1; strict types, shared CSS tokens |
| Motion | `motion` via `motion/react` | M5; use CSS for simple feedback and avoid a global client wrapper |
| Hero | `three`, `@react-three/fiber`, `@types/three` | M5; Fiber 9 pairs with React 19 in current documentation; verify selected releases again |
| Command palette | `cmdk` | M6; dialog behavior still requires keyboard, focus, and screen-reader verification |
| Workflow | Native buttons, ordered HTML, CSS/SVG connections | M4; omit React Flow unless a later approved need justifies its weight |
| Quality | ESLint, Prettier, Vitest, Testing Library, Playwright, axe integration | M1 infrastructure; add meaningful coverage as behavior arrives |

Use npm and a committed lockfile unless the selected repository establishes another package manager. Pin one supported Node LTS across local tooling, CI, and Netlify. Install interaction libraries only in their milestones. Avoid initial Drei, postprocessing, state-management, MDX, CMS, and audio packages.

Documentation checked during discovery:

- [Next.js installation](https://nextjs.org/docs/app/getting-started/installation): current setup supports TypeScript, Tailwind, and App Router; exact package/runtime versions must be pinned during M1.
- [Next.js on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/): documents OpenNext, App Router, static generation, image optimization, and platform limitations.
- [React Three Fiber introduction](https://r3f.docs.pmnd.rs/getting-started/introduction): documents matching Fiber and React majors; avoid the documented alpha line.
- [Motion installation](https://motion.dev/docs/react-installation): documents React 18.2+ compatibility and Next.js integration.
- [Tailwind with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs): use the current integration, not assumptions from older major versions.
- [cmdk source and documentation](https://github.com/dip/cmdk): candidate palette implementation; inspect current package dependencies at installation.
- [Netlify Deploy Previews](https://docs.netlify.com/deploy/deploy-types/deploy-previews/): basis for PR review deployments on a separate site.

These checks establish documented feasibility, not a tested dependency matrix. M1 must verify the selected versions with clean installation, lint, type checks, tests, and build. M9 must verify Netlify behavior.

## Proposed route structure

| URL | Implementation | Content |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Complete seven-section introduction |
| `/projects` | `src/app/projects/page.tsx` | All four featured projects |
| `/projects/geovis` | Shared `src/app/projects/[slug]/page.tsx` | Ongoing cloud-to-local migration |
| `/projects/neonsynth` | Same static template | VST3 showcase and nonfunctional future-module area |
| `/projects/titanforge-studio` | Same static template | Concise early-prototype concept |
| `/projects/swordbound-protocol` | Same static template | Contributions, third-party trailer attribution |
| `/resume` | `src/app/resume/page.tsx` | Confirmed information; download only after PDF supplied |
| `/404` and unmatched URLs | `src/app/not-found.tsx`; verify `/404` behavior | Branded recovery navigation; genuine HTTP 404 |

Generate only the four allowed case-study slugs; unknown project paths must return 404. Add sitemap and robots metadata routes, not an unnecessary application API.

## Component hierarchy and files proposed for implementation

```text
src/
  app/
    layout.tsx                 # server layout, metadata, self-hosted fonts
    page.tsx                   # homepage composition
    globals.css                # supplied palette, spacing, type, focus, motion tokens
    projects/page.tsx
    projects/[slug]/page.tsx
    resume/page.tsx
    not-found.tsx
    sitemap.ts
    robots.ts
  content/
    site.ts                    # identity, optional contact/resume links
    projects.ts                # typed case studies and public media attribution
    experience.ts              # confirmed roles; optional dates
    workflow.ts                # eight stages, purpose, inputs, outputs
  components/
    layout/                    # header, navigation, section, footer, skip link
    ui/                        # links/buttons, badges, cards, typography
    sections/                  # Hero, FeaturedBuilds, HowIBuild, Experience,
                               # TechnologyStack, About, Contact
    projects/                  # ProjectCard, CaseStudy, Media, ContributionList
    workflow/                  # WorkflowExplorer, StageDetails, FeedbackLoop
    motion/                    # small opt-in enhancement boundaries
    three/                     # HeroEnhancement, NodeNetwork, StaticNetwork
    command/                   # CommandPalette and keyboard trigger
  features/neonsynth/           # reserved extension boundary; no DSP in release 1
  lib/                         # typed routes, navigation, metadata helpers
public/                        # approved images, icons, supplied resume
tests/                         # meaningful behavior and route checks
.github/workflows/             # CI only after M1 approval
docs/                          # requirements, decisions, milestones, deployment notes
```

`RootLayout` owns header, main content, footer, and a small palette mount. Homepage sections use shared content; `ProjectCard` and `CaseStudy` use the same project records. `WorkflowExplorer` owns only selection state, with all stage content readable without animation. The decorative hero is isolated from semantic hero copy and link behavior. No application files listed above exist yet.

## Visual and interaction decisions proposed

- Preserve the seven supplied colors exactly as initial tokens. Test actual text/background pairs; do not assume accent colors pass for small text. Use modern self-hosted sans typography, restrained monospace labels, a responsive 12-column layout, and generous spacing.
- Lead with Brady's name, “I build things.”, identity, supporting sentence, and project/contact actions. Keep the network behind or beside copy without compromising reading or pointer access.
- Give each project a distinct conceptual visual marked as conceptual whenever real approved media is missing. Do not simulate product screenshots or build a fake NeonSynth.
- Implement all eight workflow stages with purpose, input, and output. Use a visible 7/8-to-6 feedback connection and explain revisiting architecture/design when feedback demands it. Keyboard and touch controls must expose selected state and associated details.
- Keep native scrolling and standard navigation. Use restrained reveals and feedback; never hide essential content pending animation. No scroll hijacking or loading screen.
- Palette behavior: Ctrl/Cmd+K, visible button, search titles, section navigation from any route, Escape, arrow/Enter selection, focus containment and restoration, and clear empty results. Missing GitHub or resume download actions remain absent with pending information explained on relevant pages.
- Honor reduced motion, disable pointer parallax on coarse pointers, pause offscreen/background rendering, cap pixel ratio/node count, and adapt or disable animation under sustained poor frame times. Handle WebGL failure and context loss by retaining the static network. Manual fallback control is a useful option if adaptive detection proves unreliable.

## Content and asset inventory

| Item | Available facts/material | Missing or restricted | Initial handling |
| --- | --- | --- | --- |
| Identity | Name, headline, identity, supporting statement | Additional biography | Use supplied copy only |
| GeoVis | Kohola role, existing architecture, migration responsibilities, Ollama target; in development | Public-detail approval; approved map image | Local supplied summary; public release requires approval, conceptual labeled cover |
| NeonSynth | Custom VST3 project for Ableton Live; in development | Approved screenshots, detailed technical source | Showcase supplied facts; future module area only |
| TitanForge | Specialized-agent game workspace concept; early prototype | Real screenshots, verified implemented capabilities | Concise concept; labeled conceptual visual |
| Swordbound | Supplied contribution list; unreleased; technical-art/gameplay role | Approved captures; employment dates/details | Attribute third-party official trailer; do not imply it depicts Brady's own cinematic work |
| Experience | Kohola AI Software Engineer; Swordbound contributions | Dates, education, additional history, metrics, updated resume | No invented chronology, employers, claims, or accomplishments |
| Tools | Ollama; Replit; Claude Code; Codex; Gemini/Google Antigravity; Unreal; Niagara; Sequencer; VST3; Ableton | Languages/frameworks as personal skills | Separate runtime AI, development tools, and creative/game tools; site stack is not a personal-skills claim |
| Contact | LinkedIn URL and GitHub profile `https://github.com/fusion407` supplied | Public email | Supplied profiles may be linked; email pending, no broken links |
| Resume | Route requested | Updated PDF and validated content | Honest pending state until supplied; no dummy download |
| Hosting and URLs | Domain and Netlify hosting stated by user | Current URL/config inventory; account access; backup | No changes to live site; migration audit remains open |
| Source | Public `fusion407/portfolio-v2` created; discovery upload approved | Code license | Independent repository; application implementation still requires M1 approval |

Supplied LinkedIn: https://www.linkedin.com/in/brady-dorsey-9a582279

Supplied official trailer: https://www.youtube.com/watch?v=lIJIB93M_BQ

Prefer a normal trailer link or a consent/click-to-load embed with attribution to avoid initial third-party scripts. Asset permission includes public-repository redistribution, not just viewing on the website. Choose a code license separately from ownership/rights to personal copy and third-party media. No license grant is assumed.

## GitHub and preview strategy

Before creating or connecting a remote, obtain the GitHub account, repository name, and new-versus-existing choice. If using an existing repository, inspect its instructions, history, and deploy hooks before pushing. Do not push to a branch linked to the current production site. A new independent portfolio repository is the preferred isolation strategy, subject to confirmation.

Use milestone/feature branches, clear commits, and reviewable PRs. CI should run locked installation, separate lint and type checks, meaningful tests, and a production build. Add browser/accessibility checks as interactions arrive. Review ignored files, licenses, media, and secrets before any public push. Keep private approval evidence outside the repository. Do not add a blanket license until decided.

At preview time, create or select a separate Netlify site, verify its identity and repository linkage, and use its netlify.app address/PR Deploy Previews. Never link bradydorsey.dev or alter the old site. Any default branch deployment must belong only to this separate preview site. Apply noindex headers/meta to previews and exclude preview URLs from the production sitemap; verify response headers in the deployed preview. Search-engine exclusion is not confidentiality protection, so unapproved material must never be uploaded. Validate the adapter's routing, images, security headers, metadata, and 404 status there.

Production preparation later requires a verified URL inventory, redirect map, current configuration/content backup, HTTPS/canonical verification, asset approvals, deploy identity verification, migration and rollback instructions, and explicit approval. None of these are satisfied by a successful preview alone.

## Risks and controls

| Risk | Control and evidence required |
| --- | --- |
| Accidental live deployment | Separate repo/site where possible; inspect existing hooks before push; never use old site credentials/configuration for previews |
| Oversized 3D/client bundle | Deferred scene chunk; server-rendered core; compare M2 baseline to M5; keep Three off project pages |
| Mobile GPU/battery pressure | Low-complexity scene, capped pixel ratio, visibility pause, adaptive fallback, actual device review |
| WebGL or motion failure | Static network always available; reduced-motion and WebGL-disabled/context-loss checks |
| Hydration and accessibility defects | Deterministic server markup; isolated client state; keyboard and screen-reader checks; progressive enhancement |
| Inaccurate or unapproved content | Typed status and provenance, explicit pending items, human content review before public push/deploy |
| Version/adapter incompatibility | Stable peer-compatible releases, committed lockfile, clean CI build, isolated Netlify verification |
| Missed old URLs | Do not infer URL inventory from an inaccessible site; audit later and test redirects before migration |
| Missing professional inputs | Honest pending states permit review; launch readiness remains conditional |
| Future synth scope expansion | No audio engine or controls in initial release; inspect actual DSP source only under separate authorization |

## Quality and review plan

M1 verifies tooling and baseline integrity; later tests focus on actual user behavior rather than trivial implementation mirrors. Check route/status handling, palette focus/keyboard behavior, workflow selection and feedback, all available links, download behavior if supplied, and rendering without WebGL or motion. Include mobile navigation and overflow checks at roughly 360, 390, 768, 1280, and 1536 CSS pixels. Browser QA should include Chromium, Firefox, and WebKit where available; real-device/manual limits must be recorded.

Evaluate production builds with Lighthouse on homepage, project index, representative case studies including media, and resume, across mobile and desktop. Targets: Performance 90+, Accessibility/Best Practices/SEO 95+. Measure load stability, font/image sizing, interaction responsiveness, and network/bundle impact; record environment and limitations, not guaranteed scores. Preview noindex settings may affect SEO audits; document this without removing preview protections. Use automated accessibility scans plus manual keyboard, reading order, contrast, zoom, screen-reader, and motion checks. Audit dependencies and repository exposure, and test security headers against framework assets and any approved embed. Passing tests does not guarantee vulnerability-free software.

## Decisions needed

### GitHub discovery update — 2026-10-28

Brady supplied https://github.com/fusion407 as his GitHub profile and https://github.com/fusion407/portfolio as the old portfolio repository. The connected GitHub service confirmed the authenticated account is `fusion407` and successfully read the old repository. The old repository is reference material; do not push to it or connect the new work to its deployment.

Read-only inspection of its main tree at `800441d33ddc3508244ec56f5b5bf62a3917f7a0` and `package.json` identified React 17, Create React App/react-scripts 5, React Router 5, Bootstrap, and JSON content under `public/profile/`, plus existing images. The recursive tree was not truncated and contained no tracked Netlify configuration or GitHub Actions workflow. This does not establish the live Netlify account configuration or deploy hooks. Old content/assets require review and confirmation before reuse; their presence is not approval or proof of current accuracy. Live routes, URL behavior, and production configuration remain unverified.

The GitHub connector supports repository reads and content operations but exposes no repository-creation tool. GitHub CLI authentication initially failed inside the sandbox. A subsequent check outside the failing sandbox helper confirmed a valid `fusion407` login using the existing keyring. No new credentials or permissions were created. Milestone 1 application-code approval is still pending.

Brady subsequently approved creating the public repository `fusion407/portfolio-v2` and pushing the discovery documents there. Repository name, account, new-repository choice, and publication of these discovery documents are confirmed. The separate repository was created through GitHub's signed-in creation form at https://github.com/fusion407/portfolio-v2. Discovery-only initial commit `24e6a3a` was successfully pushed to `main`; the local branch tracks `origin/main`. This authorization does not include Milestone 1 application implementation or any deployment.

The initial Git push selected an unrelated saved `BradyKohola` credential and was rejected with HTTP 403. The successful push used the already authenticated `fusion407` GitHub CLI credential helper for that command only. Global credential settings and other accounts were not changed.

The browser automation surface could not access the existing signed-in Chrome session. Brady completed sign-in himself in the separate in-app browser; repository creation then succeeded. No credentials were read or changed. No existing repository, production hosting configuration, domain assignment, or DNS settings were modified.

1. Approve this architecture and Milestone 1 scope before any application code.
2. Remote setup complete: public `fusion407/portfolio-v2` created and discovery documents pushed to `main`. Code licensing remains undecided; do not add a license grant automatically.
3. Before completing professional content: public email, updated resume, confirmed dates/education, approved project assets and public GeoVis details. GitHub profile is confirmed above.
4. Before preview: confirm separate Netlify preview site/account access and verify no production linkage.
5. Before production readiness: complete current URL/configuration audit and backup; separately authorize production migration later.

Missing media, email, resume, and production configuration do not block a local M1 after approval. M0 planning deliverables are prepared for review; public-site/configuration discovery is explicitly incomplete. See `MILESTONES.md` for scope, dependencies, tests, and review gates.
