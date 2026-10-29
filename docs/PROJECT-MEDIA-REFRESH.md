# Project media refresh — 2026-10-29

Status: implementation complete; local validation passed. Hosted visual/player review and full source CI are pending.

- Replaced three conceptual covers with the user-supplied GeoVis application map, actual NeonSynth interface and TitanForge Studio emblem/wordmark. Lossless WebP derivatives preserve full images and logo transparency. The reusable media component updates homepage cards, project index and case-study covers together.
- Replaced the Swordbound sword illustration with the official reveal-trailer poster and an opt-in inline privacy-enhanced YouTube player. The case-study trailer is at the top, with its table-of-contents anchor and persistent original YouTube fallback link. No third-party player request occurs until play; no video is downloaded.
- Removed Swordbound's entire An unreleased game section and duplicate lower trailer callout, plus third-party-authorship disclaimer copy from all project surfaces. Confirmed contribution facts remain intact; the trailer is labeled as the game's official trailer.
- Removed NeonSynth's Development status and Web Playground sections, future-playground overview wording, and visible status badge/fact. Copy focuses on the instrument shown in the supplied screenshot.
- Frame policy permits only the exact supplied youtube-nocookie.com embed path. The remaining security policy stays intact. Inline activation moves focus into the iframe, full-screen controls are available, and no-JavaScript visitors retain the YouTube link.

Changed files include project content/media/card/case-study components, page styling, next.config.ts, optimized public images, corresponding browser regressions, and asset/content records. No dependency or lockfile change. No supplied source document changed. The new trailer test uses a clearly labeled provider fixture to verify activation/URL/focus across homepage, index and case study; actual provider playback is a separate browser check, not a claim inferred from that fixture.

The React review keeps static artwork/layout server-rendered, isolates the player state in one small client component, avoids effect-based derived state, preserves meaningful alt text and responsive image sizing, and defers the third-party player until activation. Browser validation covers accessibility, loaded images, removed content, responsive layout, navigation, CSP, and fallback behavior.

Local results: format/lint/strict types, all 36 unit tests and the production build passed. All 72 affected browser checks passed across desktop Chromium, mobile Chromium emulation, Firefox and WebKit after fixing the play button accessible-name mismatch and narrowing an ambiguous no-JavaScript text selector. No checks were disabled. The full CI matrix now contains 220 cases (one added trailer case per configuration).
