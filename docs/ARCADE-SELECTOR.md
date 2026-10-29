# Arcade update — Pong and Asteroids

Date: 2026-10-29. Status: implemented and verified locally as an extension to Milestone 8 / PR #9; awaiting review and Linux CI.

## Requested experience

The idle arcade keeps only “A little side quest”, the numbered game label at top right, and an icon-only play button. “Built to play.”, the Pong invitation, the visible “Play Pong” button label, and the footer caption are removed. The icon retains the accessible name “Choose a game”. A JavaScript availability note appears only when scripting is unavailable.

Play opens an inline, keyboard-accessible picker with **Pong** and **Asteroids**. Choosing a title imports only that game's module and starts it. Back/Escape closes the picker and restores the play button; exiting a game also returns to that button. The header remains visible above either game, and its numbered title follows the selected game. This explicitly supersedes the earlier random-selection plan.

The picker is generated from `src/components/arcade/game-registry.ts`. To add a future game, implement the shared `GameProps` contract and add its id, title, description, and lazy loader to the registry. No random game is launched and no game starts on initial page load.

## Asteroids

An original Canvas 2D implementation: rotate and thrust a ship through a wrapping field, fire projectiles, split large rocks into smaller ones, score hits, clear escalating waves, and restart after three lives. Respawn shields prevent immediate repeated hits. Speeds, shot cadence/lifetime/count, actor counts, and elapsed simulation steps are bounded. Rendering caps device pixel ratio at two. The field and vector art are authored code; no Atari assets, audio, new dependencies, network game service, storage, or account are used.

Keyboard: Left/Right or A/D rotate, Up/W thrust, Space fires, Escape/P pauses. Named touch buttons support holding rotation/thrust/fire, and a queued shot preserves a short Fire tap across animation frames. Pause/resume, restart, and exit remain available as ordinary buttons. Tab can leave the game. Focus outside the game, search, page hiding, window blur, and leaving the hero pause gameplay; resuming is explicit. Failed imports and unavailable Canvas preserve recovery and navigation.

Both games are real-time visual experiences. Named controls, status announcements, and keyboard operation do not establish equivalent nonvisual gameplay. Actual Safari, physical mobile devices, and manual screen-reader behavior remain unverified.

## Changed files and verification

`hero-arcade.tsx`, the game registry, Pong header/control integration, global arcade styles; new `asteroids.tsx` and `asteroids-engine.ts`; engine/browser tests and the shared security test; README, asset/architecture records, and Milestone 8 QA documentation.

Seven Asteroids simulation tests cover movement/wrapping, speed/frame limits, shot cadence/expiry, splitting/scoring, wrapped collisions, lives/shields/game over, and wave progression. Browser checks cover the minimal cover, picker keyboard/focus, explicit lazy loading, actual rendered ship movement, short pointer/touch shots, pause stability, restart/switching, interruption lifecycle, failures, axe, reduced motion, narrow widths, and enlarged text. Existing Pong and portfolio checks remain enabled. Final results are recorded in `MILESTONE-8.md` and `QA.md`.

No production, DNS, hosting, résumé, or supplied source-document change. The original Pong delivery is retained historically in `HOMEPAGE-ARCADE.md`; current behavior is described here.
