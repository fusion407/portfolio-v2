# Milestone 6 — Command palette

Date: 2026-10-28. Status: accepted and merged in PR #6 at `0643564bf3cc79b3e81e17a83c10033ee8b7d20a` after Brady approved continuing to the next task. Local checks and Linux CI passed.

## Delivered

- Merged approved PR #5 at `f77a2e493bbcd2fa2685508960a8eb9e1b03138a` before beginning M6.
- Global search trigger, Ctrl+K / Cmd+K, keyboard selection with arrow wrapping and Enter, Escape, pointer/touch selection, close button, and overlay dismissal.
- Fourteen actions derived from confirmed navigation, project, and profile content: home, six homepage sections, project index, four project pages, GitHub, and LinkedIn. Case-insensitive title/alias substring filtering and an announced empty state; no invented resume/email destinations.
- A small shared client shell defers cmdk/dialog code until search is requested. Initial HTML offers a working project-index link. Failed dialog download restores a focused fallback link and announces the failure.
- Radix modal focus containment, initial input focus, and restoration to the actual invoking element. Selected actions navigate after modal cleanup so native fragment navigation can focus the requested homepage section, including from a case study. Profile destinations open in the current tab.
- Responsive layout, scrollable results, 200% text support, clear selected/focus states, and no animation prerequisite.

## Files and dependencies

`src/components/command/`, `src/content/commands.ts`, shared header, global styles, exact dependency/lockfile updates, command unit/browser tests, scoped workflow status assertion, and milestone/README records. cmdk 1.1.1 and its Radix dialog dependency 1.3.1 support React 19; the dialog is declared directly because its focus lifecycle API is used explicitly. Registry peer requirements and official documentation were checked. No peer overrides, hosting changes, or supplied source-document edits.

## Verification

Windows, Node 24.22.1, npm 11.19.1, production Next.js build:

| Check                           | Result                                                         |
| ------------------------------- | -------------------------------------------------------------- |
| Format, lint, strict TypeScript | Passed                                                         |
| Unit tests                      | All 8 passed                                                   |
| Production build                | Passed; existing routes remain static                          |
| Browser suite                   | 82 passed; 8 platform-inapplicable M5 cases skipped            |
| Dependency audit                | Zero vulnerabilities reported                                  |
| Accessibility                   | Open-dialog and existing route/workflow axe checks passed      |
| Manual visual review            | 1440 px desktop and 390 px mobile, including project filtering |

New browser coverage verifies both shortcuts, query reset, selected-state navigation/wrapping, empty results, every action category, same-tab profile destinations (intercepted by the test), cross-route section focus, Tab/Shift+Tab containment, Escape/button/overlay restoration, five widths, enlarged text, reduced motion, deferred requests, failed downloads, and no JavaScript. Existing 64 passing browser checks remain covered. No assertions are suppressed; the existing workflow status query is now scoped to its own section because the page has another independent status region.

Checks identified library-generated input labeling and visible shortcut/close text mismatches; these were corrected. Default fuzzy matching also allowed unrelated subsequences, so explicit substring matching now provides predictable project-title results. Raw screenshots remain local review artifacts outside Git. M5's performance measurements are historical; no new M6 Lighthouse score is claimed. Linux CI is checked on the review PR.

## Limits and next work

Manual screen-reader, Safari/Firefox, physical-device, and deployed Netlify verification remain later QA. Resume/download actions remain unavailable until a real destination is supplied. Existing content/media/ESLint limitations remain documented in prior reports.

M6 and the separately requested Pong change have since been accepted and merged. Brady's subsequent instruction to continue authorizes M7; production deployment remains separately gated.
