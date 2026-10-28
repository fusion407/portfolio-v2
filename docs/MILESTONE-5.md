# Milestone 5 — 3D hero and motion

Date: 2026-10-28. Status: implemented and verified; awaiting review.

## Delivered

- Merged approved PR #4 at `a0018bae9986d23b79bf06e220486083eda2504a` before starting M5.
- Abstract purple/cyan network with eight nodes, eighteen connections, two orbit rings, gentle ambient motion, and small cursor-responsive parallax. The camera stays fixed.
- Deferred, homepage-only React Three Fiber scene with Three.js; initial HTML still includes the complete original SVG network and hero content.
- Conservative static paths for mobile/narrow layouts, coarse pointers, reduced motion, data saving, and devices reporting at most two logical cores. Devices without those APIs also keep the illustration.
- Visible pause/resume control; render timer stops offscreen, in hidden pages, and when manually paused. DPR capped at 1.5; approximately 30 render requests per second while active. No shadows, textures, model downloads, or postprocessing.
- Persistent static recovery for unavailable WebGL, renderer/import failures, context loss, and sustained slow frame delivery. Preference changes can remove the scene immediately. Original content and navigation remain usable throughout.
- Subtle route entrances, heading scroll reveals, navigation underlines, project-artwork hover/focus responses, and pressed-button feedback. Motion respects reduced-motion preferences; server content starts visible.

## Files affected

- `src/components/three/`: extracted static SVG, enhancement/lifecycle wrapper, lazy scene, and frame-budget policy.
- `src/components/motion/page-motion.tsx`: small deferred Motion mini enhancement for homepage headings.
- `src/components/sections/hero.tsx`, `src/app/page.tsx`, `src/app/template.tsx`, `src/app/globals.css`: integration and scoped motion styles.
- `package.json`, `package-lock.json`: exact Fiber 9.8.2, Three 0.186.1, Motion 14.7.1, and Three types 0.186.0. Registry peers and official Fiber/React compatibility checked before installation; no peer overrides.
- Unit/browser tests, README, architecture record, milestone tracker, M4 acceptance record, and this report.

## Verification

Windows, Node 24.22.1, npm 11.19.1; production Next.js build.

| Check                          | Result                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------- |
| `npm run check`                | Format, lint, strict TypeScript, and all 6 unit tests passed                    |
| `npm run build`                | Passed; existing routes remain statically generated                             |
| `npm run test:e2e`             | 64 passed, 8 platform-inapplicable cases skipped across desktop/mobile Chromium |
| `npm audit --audit-level=high` | Zero vulnerabilities reported                                                   |
| Browser accessibility scans    | No axe violations in enhanced hero or existing route/workflow scans             |
| Manual visual review           | 1440 px desktop 3D/pause control and 390 px mobile static fallback reviewed     |
| Production boundary            | Existing portfolio, hosting, domain, and supplied source documents unchanged    |

The eight skips are deliberately paired desktop-only WebGL/failure cases and the mobile-only touch fallback in the opposite project. They do not represent failures or untested required desktop fallback paths. Existing 52 route/navigation/workflow checks remain covered. New tests cover actual rendering, DPR cap, pause/resume, offscreen and simulated page hiding, live preferences, unavailable WebGL, context loss, blocked renderer download, low-core/data-saving hints, no JavaScript, and no renderer requests on a project route or reduced-motion homepage. Sustained slow delivery is exercised by delaying scene render requests; isolated long tasks and incomplete windows are covered by unit tests.

The first browser pass caught an effectful Canvas fallback activating during supported rendering. Removing that fallback effect restored the intended lifecycle; actual WebGL success and failure are both verified. No failing check was suppressed.

## Performance and bundles

Lighthouse 13.6.0, Playwright Chromium 156, final local production build; sequential mobile/default and desktop-preset runs, headless, with performance/accessibility/best-practices/SEO categories. The mobile run uses the static path; the desktop run includes deferred 3D loading.

| Measurement         | Mobile | Desktop |
| ------------------- | ------ | ------- |
| Performance         | 98     | 100     |
| Accessibility       | 100    | 100     |
| Best Practices      | 100    | 100     |
| SEO                 | 60     | 60      |
| LCP                 | 0.9 s  | 0.3 s   |
| Total Blocking Time | 170 ms | 0 ms    |
| CLS                 | 0.002  | 0.006   |

M2's static baseline was 98 mobile / 100 desktop; M4's mobile baseline was 99. This run remains within the project performance target without a material unexplained score regression. SEO remains intentionally limited by preview noindex. These are single local lab runs, not device/deployed/field guarantees; raw JSON and screenshots are retained as local review artifacts outside Git.

The production Three/Fiber renderer chunk is approximately **897 KiB raw / 237 KiB gzip** (local compression measurement, not transferred-byte telemetry). It is requested only after eligible visible desktop hero enhancement starts. Browser tests assert that the actual renderer chunk is absent from reduced-motion homepage and project-route requests. Lighthouse still reports unused JavaScript in this deferred dependency, a known cost of the requested 3D renderer; no extra 3D utility library is installed. The initial static content never waits for it.

## Remaining limits and next milestone

Chromium automation includes software/virtualized rendering and simulated visibility/slow-frame conditions; it does not establish actual mobile GPU, battery, hardware background throttling, Safari/Firefox, or manual screen-reader behavior. Preference and low-power hints are conservative rather than device benchmarks. Netlify adapter/CDN behavior and deployed performance remain M9 verification work. The documented ESLint limitation and outstanding content/media/resume inputs remain unchanged.

Pause for review before merging M5 or starting **M6 — Command palette**. No production deployment, domain change, browser audio, command palette, or copywriting revision is included.
