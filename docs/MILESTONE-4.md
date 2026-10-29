# Milestone 4 — Interactive AI workflow

Date: 2026-10-28. Status: accepted and merged in PR #4 at `a0018bae9986d23b79bf06e220486083eda2504a` after Brady authorized merging and beginning M5. Local checks and GitHub Linux CI passed.

## Delivered

- Corrected the Experience employer to **FatalFox Studios**, with **Swordbound: Protocol** as its project context. No dates or additional studio facts invented; see `CONTENT-DECISIONS.md`.
- Eight connected, selectable workflow stages using the existing titles/descriptions and new explicit purpose, input, and output data.
- One selected detail panel, pressed-state controls, announced selection changes, and a distinct accessible name for the selected region.
- Pointer/touch selection; ordinary Tab/Enter/Space activation; arrow navigation with wrapping; Home/End selection; no keyboard trap. Modified browser shortcuts are preserved.
- Visible **07 Test → 08 Feedback → 06 Implementation** loop with an action that selects/focuses the implementation stage. Existing feedback copy preserves the option to revisit design and requirements.
- Native “Read the full workflow” disclosure with all eight descriptions and fields, available with or without JavaScript.
- Server HTML provides real stage/reference fragment links. After hydration, stable server/client snapshots upgrade them to same-sized selection buttons. Without JavaScript, fragments reveal and focus the native reference content; no inert controls, loading gate, inline-script fallback, or animation prerequisite.
- Responsive layouts and reduced-motion support without new packages, React Flow, or a motion library. The site remains statically generated.

## Files affected

- Content: `src/content/experience.ts`, `src/content/workflow.ts`.
- UI: `src/components/workflow/workflow-explorer.tsx`, `stage-details.tsx`, `src/components/sections/how-i-build.tsx`, and global styles.
- Tests: `tests/unit/workflow.test.tsx` and `tests/e2e/workflow.spec.ts`.
- Documentation: README, architecture decisions, milestone tracker, M3 acceptance record, confirmed-content decisions, and this report.

## Verification evidence

Environment: Windows, Node 24.22.1, npm 11.19.1, production Next.js build.

| Check                                             | Result                                                                                        |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `npm run check`                                   | Format, lint, strict TypeScript, and all 4 unit tests passed                                  |
| `npm run build`                                   | Passed; homepage, project index, and four case studies statically generated                   |
| `npm run test:e2e`                                | All 52 desktop/mobile Chromium checks passed, including the keyboard-shortcut guard           |
| `npm audit --audit-level=high`                    | Zero vulnerabilities reported                                                                 |
| Dependency lockfile and supplied source documents | Unchanged                                                                                     |
| Manual visual review                              | Desktop 1280 px and mobile 390 px; selected details, layout, and employer correction verified |

Desktop and mobile screenshots are retained as local review artifacts outside the repository. GitHub Linux CI is checked on the review PR; its result is separate from these local checks.

Coverage includes all eight selections and fields; one pressed stage; focus return through the feedback loop; pointer and touch; keyboard activation/navigation/exit; native reference disclosure; no-JavaScript fragment reveal/focus; axe scans of the selected and full-reference views; reduced motion; five viewport widths; and 200% root-text enlargement. Existing homepage, project, metadata, and HTTP 404 checks remain in the suite.

The new component tests first identified ambiguous selected/reference region names. The selected region now has an explicit “Selected stage” prefix while visible stage headings remain unchanged. No checks are suppressed to resolve that ambiguity.

## Mobile performance baseline

A Lighthouse 13.6.0 mobile run against the local production homepage measured **99 Performance / 100 Accessibility / 100 Best Practices / 60 SEO**, with 1.0 s LCP, 120 ms Total Blocking Time, and 0.002 CLS. The SEO result reflects deliberate preview noindex/nofollow. This is a single local lab measurement for the new client workflow, not a production or field-performance guarantee; use it alongside the M2 static baseline when evaluating M5's 3D enhancement. Raw JSON is retained outside the repository as a local review artifact.

## Known limits and review gate

- Full screen-reader/manual accessibility review, non-Chromium browsers, actual devices, deployed performance, and Netlify adapter verification remain later QA.
- The documented ESLint deprecation limitation and outstanding media/contact/resume/permission inputs remain unchanged. No dependency, lockfile, or supplied source-document changes are needed.
- Testing is presented as human verification and feedback, with defects and uncertainties recorded. It is not described as a guarantee of vulnerability-free software.
- M5's 3D hero/motion system, command palette, browser audio, production indexing, domain/DNS, and deployment are not part of this change.

PR #3 was merged after Brady's approval to proceed. The M4 review gate is satisfied by his subsequent instruction to merge and begin the next milestone.
