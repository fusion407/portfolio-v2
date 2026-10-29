# Portfolio 2.0 — Milestone tracker

Updated: 2026-10-29. Milestones 1–8 and the arcade extensions are accepted and merged. M9 is in progress; isolated deployment awaits Netlify sign-in, with the public email confirmed and résumé explicitly deferred by Brady.

Specification: `source/product-requirements-v1.0.md`. Process: `source/master-prompt.md`. Proposed architecture and inventories: `DISCOVERY.md`.

## Working rules

Work sequentially after explicit approval. At each milestone, report work delivered, actual files changed, checks run and results, known issues, and the next milestone; stop for review. Planned paths below are not existing application files. Update status using evidence, never anticipated success. Do not advance with unresolved acceptance failures unless Brady explicitly accepts the limitation or changes scope.

Statuses: awaiting review, not started, in progress, blocked, completed, deferred. Each milestone completion needs both verified acceptance and human review. Current public-site audit limitations must remain visible through launch preparation.

## M0 — Discovery and architecture

- Status: architecture approved for implementation by Brady's instruction to continue development; existing-site/configuration audit remains incomplete and tracked for launch readiness.
- Objective: turn the specification into a concrete, reviewable implementation plan without application code.
- Scope: source review, workspace/asset inventory, documented compatibility, architecture, routes/components, risks, deployment boundaries, milestone gates.
- Files affected: `README.md`, `docs/DISCOVERY.md`, `docs/MILESTONES.md`, immutable source copies in `docs/source/`.
- Dependencies: supplied specification and master prompt; public documentation; existing site/configuration when accessible.
- Steps: read sources; inspect workspace/instructions; attempt public-site audit; verify documented platform support; inventory unknowns; propose architecture and tests; request M1 approval.
- Testing: documentation consistency review, source-copy verification, workspace inspection, official compatibility documentation checks. No application tests apply.
- Acceptance: proposal accounts for all required routes, sections, interactions, content constraints, and production safeguards; missing information and audit limitations are explicit; Brady approves proceeding.
- Result: source documents read; initially empty non-Git workspace confirmed; no assets found; documented compatibility checked; site/robots/sitemap retrieval failed through the research tool. Later, under explicit authorization, created public `fusion407/portfolio-v2`, initialized local Git, and pushed the discovery documents to `main`. Old repository inspected read-only; live configuration/URL audit remains incomplete. No application build, dependency install, or deployment performed.

## M1 — Foundation

- Status: completed and accepted; Brady explicitly authorized merging PR #1 and continuing. Merge commit `10f12eb29d9ef5e3c41092a69df1319cc0b5a634`. Local verification and GitHub Linux CI passed; see `MILESTONE-1.md`.
- Objective: establish a reproducible, maintainable application foundation.
- Scope: Next.js/TypeScript/Tailwind, tokens, directory boundaries, tooling, baseline tests, local docs and CI; no advanced feature implementation.
- Files/components: package/lockfile, runtime version file, TypeScript/Next/PostCSS/ESLint/Prettier/test configs, `src/app/layout.tsx`, initial `page.tsx`/`globals.css`, `src/components/ui/`, `.gitignore`, `.github/workflows/`, `README.md`, architecture decisions. License only after decision.
- Dependencies: approved architecture; supported local Node; package access. GitHub account/name/new-or-existing decision required before remote creation, not before isolated local setup.
- Steps: confirm runtime and peer compatibility; scaffold; pin package resolution; establish supplied tokens and base semantics; configure meaningful baseline route/render tests; add commands/CI; document setup; inspect public-file safety.
- Testing: clean locked install, lint, format check, TypeScript check, baseline tests, production build; record dependency-audit findings and any unavailable checks.
- Acceptance: clean build, type checks, lint, and baseline tests pass; setup reproducible; no secrets or proprietary media; no production linkage; documentation accurately lists commands.

## M2 — Homepage and navigation

- Status: completed and accepted; Brady explicitly authorized merging PR #2 and beginning M3. Merge commit `d8d4a459d076e0e2a6fb78e47e3f181a493b5009`. Local checks and Linux CI passed. Copywriting refinements deferred by Brady; see `MILESTONE-2.md`.
- Objective: deliver the complete responsive introduction before expensive effects.
- Scope: hero copy, seven homepage sections, header/mobile navigation, footer, shared cards/type/buttons, static hero visual.
- Files/components: `src/app/page.tsx`, `globals.css`, `content/site.ts`, initial projects/experience/tool content, `components/layout/`, `ui/`, `sections/`, navigation registry.
- Dependencies: M1 accepted; supplied identity/project facts. Missing contact/PDF assets use honest pending states.
- Steps: compose semantic sections; implement anchor/mobile navigation; establish card layout; add approved or clearly conceptual visual slots; tune viewport layout and focus states.
- Testing: link/anchor and mobile-menu behavior, keyboard navigation, responsive/zoom/overflow review, heading order and contrast; capture production performance baseline.
- Acceptance: complete homepage readable at target sizes without advanced motion/WebGL; all available links work; no fabricated biography or unsupported tool skills.

## M3 — Project showcase system

- Status: completed and accepted; Brady confirmed the work and authorized M4 with the employer correction. PR #3 merged at `acf6142ed01d1f26d03f27ae5d4775ab606f1aeb` after Linux CI passed. See `MILESTONE-3.md` and `CONTENT-DECISIONS.md`.
- Objective: represent all four projects accurately through a reusable content system.
- Scope: project index, statically generated case studies, status/role/contribution metadata, approved media or conceptual placeholders, future NeonSynth slot, branded 404.
- Files/components: `content/projects.ts`, `app/projects/page.tsx`, `app/projects/[slug]/page.tsx`, `app/not-found.tsx`, `components/projects/`, approved `public/` assets and safe attribution records.
- Dependencies: M2 accepted; supplied facts; approval before public use of restricted details/media.
- Steps: define typed schema; generate four slugs; implement shared template and index; preserve per-project distinctions; add third-party trailer attribution; return real 404 for unknown paths.
- Testing: each required route, unknown slug and `/404` status, navigation and media labels; human content/provenance review; image loading/layout checks.
- Acceptance: all four pages accurately state project maturity and Brady's role; no original GeoVis architecture claim, no implemented TitanForge promises, no fake synth, no attribution of official trailer to Brady.

## M4 — Interactive AI workflow

- Status: completed and accepted. Brady authorized merging PR #4 and beginning the next milestone. Merged at `a0018bae9986d23b79bf06e220486083eda2504a` after local checks and Linux CI passed. Includes the FatalFox Studios correction; see `MILESTONE-4.md`.
- Objective: explain human-led development and continuous verification interactively.
- Scope: eight selectable connected stages, purpose/input/output details, visible feedback loop to implementation; semantic nonanimated representation.
- Files/components: `content/workflow.ts`, `components/workflow/`, HowIBuild section, behavioral tests.
- Dependencies: M3 accepted; agreed stage content based on source documents.
- Steps: write concise factual details; implement native accessible controls and selected-state details; draw responsive connections; label validation/feedback loop; support touch and reduced motion.
- Testing: keyboard and pointer/touch selection, focus/selected-state association, screen-reader order, all stage details, no-animation and narrow-screen readability.
- Acceptance: all eight stages understandable without animation; feedback loop explicit; testing never described as guaranteeing security.

## M5 — 3D hero and motion

- Status: completed and accepted. Brady authorized merging PR #5 and continuing; merged at `f77a2e493bbcd2fa2685508960a8eb9e1b03138a` after local and Linux CI passed. See `MILESTONE-5.md`. Its original 3D hero will be superseded by the separately requested Pong enhancement after M6.
- Objective: add the signature node network without impairing core usability.
- Scope: isolated deferred Three/Fiber scene, gentle ambient/cursor response, restrained component motion, static and low-performance fallbacks.
- Files/components: `components/three/`, `components/motion/`, Hero integration, dependency lockfile, relevant styles/tests.
- Dependencies: M4 accepted; React/Fiber/Three compatibility rechecked; M2 performance baseline.
- Steps: retain static network; lazy-load scene; tune small node/connection count; cap rendering resolution; pause hidden/offscreen work; support reduced motion/coarse pointers; recover from WebGL failure/context loss and sustained poor performance.
- Testing: WebGL disabled/failure/context loss, reduced motion, coarse pointers, background/offscreen pause, mobile layout, production bundle and Lighthouse comparison; manual motion/readability review.
- Acceptance: core content remains readable and actionable on all fallback paths; no material unexplained performance regression; scene absent from unrelated route bundles; performance limits recorded.

## M6 — Command palette

- Status: completed and accepted. PR #6 merged at `0643564bf3cc79b3e81e17a83c10033ee8b7d20a` after local and Linux CI passed; Brady approved continuing. See `MILESTONE-6.md`.
- Objective: provide fast, accessible navigation and project search.
- Scope: Ctrl/Cmd+K, visible trigger, project-title filtering, homepage section actions from every route, supplied professional profiles, resume route and download when available.
- Files/components: `components/command/`, shared navigation/command registry, layout mount, dependency lockfile, palette tests.
- Dependencies: M5 accepted; stable route IDs and available contact/resume data.
- Steps: install compatible cmdk; mount minimal client shell; add/search actions; implement opening, selection, Escape, focus trap/restoration, and empty state.
- Testing: both shortcuts, arrows/Enter/Escape, filtering/empty state, focus containment/restoration, pointer/touch trigger, cross-route section navigation, accessible naming; no unavailable download actions.
- Acceptance: fully usable with keyboard and pointer; no dead actions or stranded focus.

## Additional approved change — Homepage arcade

- Status: completed and accepted. PR #7 was retargeted to main after M6 merged, then merged at `6d2aab1a2f38b1e5c16d42e1194d235ede6a86b8` under Brady's approval. See `HOMEPAGE-ARCADE.md`.
- Scope: opt-in lazy-loaded Pong against the computer, first-to-five scoring, keyboard/mouse/touch controls, pause/resume, restart, exit and focus restoration, responsive layout, and a registry for future random game selection. This original delivery had only Pong; the subsequent `ARCADE-SELECTOR.md` extension adds explicit game selection and Asteroids during M8.
- Result: original 3D components/dependencies removed; restrained general motion retained. Format, lint, strict TypeScript, 13 unit tests, static build, and 84 browser checks pass with no skips; audit reports zero vulnerabilities. Local mobile Lighthouse: 98 Performance / 100 Accessibility / 100 Best Practices / 60 SEO (intentional noindex). See `HOMEPAGE-ARCADE.md`.
- Review: satisfied. Brady authorized proceeding to M7; production deployment remains separately gated.

## M7 — Professional content and SEO

- Status: completed and accepted; Brady authorized merging PR #8 and beginning M8. Merged at `f254213c0c32ec8be8fd84645870369bea5a0d3f` after Linux CI passed. Confirmed public email, metadata/share images, preview-safe indexing policy, structured identity data, and legacy URL audit/draft map delivered. Format, lint, TypeScript, 26 unit tests, static build, and 94 browser checks pass; audit reports zero vulnerabilities. Résumé page/download explicitly deferred until Brady updates it. See `MILESTONE-7.md` and `SEO.md`. Review gate satisfied.
- Objective: validate professional facts and make pages discoverable and shareable.
- Scope: confirmed experience/tools/about/contact; resume page/PDF when supplied; titles, descriptions, canonical/OG metadata, structured data where justified, sitemap/robots, legacy URL review.
- Files/components: `content/site.ts`, `experience.ts`, professional sections, `app/resume/`, metadata helpers, sitemap/robots, social assets, approved PDF, draft redirect inventory.
- Dependencies: M6 accepted; email/GitHub/resume/dates/education if provided; existing URL inventory when accessible. Missing data prevents claiming complete professional content or migration readiness.
- Steps: validate copy with Brady; include only real available contact/download actions; inspect PDF/content permissions; set unique metadata; implement production-versus-preview indexing behavior; audit old URLs and draft redirects without touching production.
- Testing: content approval review; contacts/downloads; metadata/canonical/OG/sitemap consistency; preview noindex; redirect-map coverage against verified old URLs.
- Acceptance: facts and metadata validated; missing inputs explicitly tracked; no unsupported Person/job dates or dummy PDF; old URL audit complete or recorded as an unresolved launch blocker.

## M8 — Quality assurance

- Status: completed and accepted. Brady authorized M9; PR #9 merged at `3c6f365c11bddc96c79ba1c702ffda47e7ebad44` after Linux CI passed. Local checks passed: 33 unit tests, 216 browser checks, 24 additional reflow checks, build, dependency audit, and repository/history pattern scan. Two focus bugs fixed; browser policy added. The subsequent minimal cover, game picker, and Asteroids extension is implemented and included in QA. See `MILESTONE-8.md` and `QA.md` for measured performance, SEO conditions, and outstanding manual/deployed checks.
- Objective: verify release behavior, accessibility, performance, and public-repository hygiene.
- Scope: functional/browser tests, accessibility, representative mobile/desktop Lighthouse, dependency review, responsive/manual review, links, fallbacks, permissions and secret review, headers.
- Files/components: tests/configs, targeted application fixes, security header configuration, `docs/QA.md`, updated asset/permission inventory and tracker.
- Dependencies: M7 accepted, real production build, approved assets, available QA runtimes/devices.
- Steps: run complete checks; test required routes and meaningful interactions; scan dependencies and tracked files; review manual accessibility/device behavior; measure and fix regressions; document evidence and limits.
- Testing: locked install, lint/type/tests/build, browser interactions, axe plus manual keyboard/screen-reader/zoom, all links, reduced-motion/WebGL fallbacks, Lighthouse, dependency audit, CSP/header compatibility. Scores are targets, not guarantees.
- Acceptance: critical defects resolved; Performance 90+ and Accessibility/Best Practices/SEO 95+ evaluated with conditions/results recorded; remaining deviations receive review; no unapproved or sensitive public files. Tests do not guarantee absence of vulnerabilities.

## M9 — Isolated preview and launch readiness

- Status: in progress. Preview configuration, a guarded 28-case deployed smoke matrix, and preview/launch/rollback documents are prepared. Netlify is signed out; account/project identity, hosted deploy, PR-preview integration, and remote verification remain pending. See `MILESTONE-9.md` and `PREVIEW.md`.
- Objective: demonstrate the release on Netlify and document remaining launch decisions.
- Scope: separate preview site, PR previews where configured, deploy-specific verification, launch checklist, migration and rollback plans; no production-domain deployment.
- Files/components: new-site-only Netlify settings/configuration, `docs/PREVIEW.md`, `docs/LAUNCH.md`, `docs/ROLLBACK.md`, verified redirect plan, milestone report.
- Dependencies: M8 accepted; confirmed GitHub and isolated Netlify identities/linkage/access; approved public content; existing URL/config inventory and backup for migration readiness.
- Steps: verify separate site/repo; deploy to netlify.app; verify output, images, 404s, security/noindex headers and canonical behavior; record preview URL/deploy identity; prepare launch prerequisites and rollback; request review.
- Testing: deployed route/interaction/media checks, platform/header verification, noindex, project/resume links, mobile smoke test; verify new site has no production domain and old site remains unchanged.
- Acceptance: isolated preview verified and reviewed; launch/rollback instructions concrete; unresolved inputs documented; no claim of launch readiness while asset permissions, required audits, backups, or checks remain open. Production migration remains separately gated.

## Future — NeonSynth browser playground

- Status: deferred; explicitly excluded from release 1.
- Objective: expose authentic NeonSynth behavior in a browser where practical.
- Scope: inspect actual synthesizer code and licensing, assess DSP portability, choose Web Audio/AudioWorklet/WASM strategy, then plan implementation separately.
- Files/components: future `features/neonsynth/`, audio runtime/worker assets, dedicated compatibility/audio tests; exact changes undetermined until source inspection.
- Dependencies: synthesizer source supplied, rights verified, explicit authorization and new approved architecture.
- Steps: audit source and DSP behavior; assess browser constraints; define fidelity and performance criteria; propose plan for approval before coding.
- Testing: later behavior comparisons to actual synth, audio lifecycle/gesture requirements, latency, performance, touch/keyboard and browser coverage.
- Acceptance: a separately approved plan and demonstrated fidelity; no unrelated substitute demo.

## Separate future task — Production migration

- Status: not authorized.
- Objective: replace the current site through a controlled, reversible migration.
- Scope: only the approved migration procedure after preview acceptance.
- Files/components: verified redirects, approved production-only configuration, migration/rollback evidence; exact live changes require explicit approval.
- Dependencies: approved preview, complete URL/config/content backup, verified permissions/content, explicit authorization naming the production operation.
- Steps: confirm target/site/domain identities; execute approved procedure; verify HTTPS/canonical/redirects; monitor and roll back if acceptance fails.
- Testing: preflight and post-deploy route/link/HTTPS/domain verification, backup recoverability and rollback procedure review.
- Acceptance: explicit authorization obtained and approved production behavior verified; never inferred from M1 or preview approval.
