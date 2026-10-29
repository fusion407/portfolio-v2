# Homepage arcade — Pong

Date: 2026-10-28. Status: accepted and merged in PR #7 at `6d2aab1a2f38b1e5c16d42e1194d235ede6a86b8` after Brady approved continuing. PR #6 was merged first, PR #7 was retargeted to main, and both passed Linux CI before merging.

## Requested change and result

Brady explicitly requested replacing the interactive homepage animation with a play button that presents a game, starting with Pong and allowing multiple random games later. That instruction supersedes the original 3D hero requirement and authorizes this work after M6 without beginning M7.

The hero now has a static arcade invitation and **Play Pong**. Gameplay loads only after the visitor clicks. A typed game registry is ready for additional loaders and selects among available games; since Pong is its only entry, Play currently always opens Pong. No other game is implied to exist.

Pong is a single-player match against a speed-limited computer: first to five, serve delays, bounded ball speed, angle-based paddle returns, score announcements, and a clear completed-match state. Controls are Up/Down or W/S, mouse movement, and touch dragging/tapping on the court. Space/Escape pauses; visible controls pause/resume, restart, and exit. Tab can leave the court. Exit restores Play focus. The original hero introduction, links, and site navigation remain available.

Gameplay pauses on focus leaving the game, opening search, window blur, page hiding, and offscreen intersection. Resume is explicit. No animation/game starts automatically, including under reduced-motion preferences. No JavaScript, failed download, and unavailable Canvas states retain clear messaging and usable navigation/exit paths.

## Files and dependencies

- `src/components/arcade/`: opt-in hero, typed game registry, Canvas UI/lifecycle, and pure Pong engine.
- Hero integration and global arcade/layout styles.
- Seven physics unit tests and fourteen desktop/mobile browser game checks.
- Removed the superseded `src/components/three/` files, frame-budget tests, and WebGL-specific browser suite. The historical M5 implementation remains in Git history. General page/card/navigation motion remains intact.
- Removed `three`, `@react-three/fiber`, and `@types/three`; no game package added. Lockfile reports eighteen packages removed.
- README, architecture, content decisions, milestone tracker, M6 report clarification, and this report.

## Verification

Windows, Node 24.22.1, npm 11.19.1, production Next.js build:

| Check                           | Result                                                                 |
| ------------------------------- | ---------------------------------------------------------------------- |
| Format, lint, strict TypeScript | Passed                                                                 |
| Unit tests                      | All 13 passed                                                          |
| Production build                | Passed; existing routes remain static                                  |
| Browser suite                   | All 84 passed; no skips                                                |
| Dependency audit                | Zero vulnerabilities reported                                          |
| Accessibility scans             | No axe violations on the loaded game or existing pages/dialog/workflow |
| Manual visual review            | Desktop 1440 px and mobile 390 px, poster and loaded court             |

Physics checks cover serve delay, wall/paddle reflection, collision stepping, return angle, both winning sides, frozen completed states, paddle/computer bounds, speed limits, and long-frame clamping. Browser checks exercise actual paddle pixels under keyboard/pointer/touch input, a full computer win to five, restart, paused-frame stability, focus/exit, search interruption, simulated page hiding, offscreen pause, five widths, enlarged text, reduced motion, failed downloads, unavailable Canvas, and no JavaScript. The command palette and existing portfolio checks remain covered. The obsolete WebGL checks are retired because that feature was removed, rather than skipped as failing acceptance criteria.

Checks caught a mobile court positioning issue and a no-script availability-note issue; these were corrected before the final pass. Error assertions are scoped to the arcade to distinguish Next's independent route announcement. No checks are suppressed.

## Initial-load performance

A single Lighthouse 13.6.0 mobile run against the final local production build, before starting gameplay, measured **98 Performance / 100 Accessibility / 100 Best Practices / 60 SEO**, with **0.9 s LCP, 170 ms TBT, and 0.009 CLS**. Preview noindex deliberately limits SEO. Performance matches the M5 mobile score; this is an initial-load lab measurement, not a gameplay frame-rate, physical-device, deployed/CDN, or field-performance guarantee. Raw JSON/screenshots remain local review artifacts outside Git.

The lazy Pong chunk is **6,472 bytes raw / 2,773 bytes gzip** in this build. Browser checks verify no request for it before Play. Removing the previous renderer also removes its approximately 237 KiB gzip deferred dependency. No game assets are fetched from outside the application.

## Remaining limits and review

Pong is a visual real-time game; named controls, keyboard input, score announcements, pause/exit, and text fallback do not establish equivalent nonvisual gameplay. Physical touch devices, manual screen-reader use, Safari/Firefox, background throttling on real devices, and deployed performance remain later QA. No audio, multiplayer, persistence, additional game titles, production deployment, domain changes, or M7 work is included.

The M6 and arcade review gates are satisfied by Brady's approval to continue. Production deployment remains separately gated.

## Subsequent requested extension

The original delivery above is historical. Brady's 2026-10-29 request replaces its invitation/caption and visible Play Pong label with a minimal icon-only cover, and replaces random selection with a visitor-controlled picker for Pong and Asteroids. See `ARCADE-SELECTOR.md` for current behavior and `MILESTONE-8.md` for current QA.
