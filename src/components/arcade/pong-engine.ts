export const COURT = {
  width: 800,
  height: 480,
  paddleHeight: 88,
  paddleWidth: 12,
  inset: 30,
  radius: 7,
  winningScore: 5,
} as const;
export type PongState = {
  player: number;
  computer: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  playerScore: number;
  computerScore: number;
  serve: number;
  rally: number;
  winner: "You" | "Computer" | null;
};
export type PongInput = { direction: number; target: number | null };
const clamp = (value: number, low: number, high: number) =>
  Math.min(high, Math.max(low, value));
const limit = (y: number) =>
  clamp(y, COURT.paddleHeight / 2, COURT.height - COURT.paddleHeight / 2);

export function createPong(): PongState {
  return {
    player: 240,
    computer: 240,
    x: 400,
    y: 240,
    vx: -320,
    vy: 100,
    playerScore: 0,
    computerScore: 0,
    serve: 0.8,
    rally: 0,
    winner: null,
  };
}

function score(state: PongState, player: boolean) {
  if (player) state.playerScore++;
  else state.computerScore++;
  if (state.playerScore >= COURT.winningScore) state.winner = "You";
  if (state.computerScore >= COURT.winningScore) state.winner = "Computer";
  state.x = 400;
  state.y = 240;
  state.rally = 0;
  state.serve = 0.9;
  state.vx = player ? 320 : -320;
  state.vy = (state.playerScore + state.computerScore) % 2 ? -110 : 110;
}

// Small simulation steps prevent a fast ball skipping through a paddle.
export function advancePong(
  state: PongState,
  seconds: number,
  input: PongInput,
) {
  if (state.winner) return;
  let remaining = clamp(seconds, 0, 0.05);
  while (remaining > 0) {
    const dt = Math.min(remaining, 1 / 120);
    remaining -= dt;
    state.player = limit(
      input.target === null
        ? state.player + input.direction * 410 * dt
        : state.player +
            clamp(input.target - state.player, -600 * dt, 600 * dt),
    );
    // A speed-limited opponent has a small deterministic aim error; no perfect tracking.
    const desired =
      state.vx > 0 ? state.y + Math.sin(state.x * 0.025) * 20 : 240;
    state.computer = limit(
      state.computer + clamp(desired - state.computer, -235 * dt, 235 * dt),
    );
    if (state.serve > 0) {
      state.serve = Math.max(0, state.serve - dt);
      continue;
    }
    state.x += state.vx * dt;
    state.y += state.vy * dt;
    if (state.y < COURT.radius) {
      state.y = COURT.radius;
      state.vy = Math.abs(state.vy);
    }
    if (state.y > COURT.height - COURT.radius) {
      state.y = COURT.height - COURT.radius;
      state.vy = -Math.abs(state.vy);
    }
    const left = COURT.inset + COURT.paddleWidth + COURT.radius;
    const right = COURT.width - left;
    const hitsLeft =
      state.vx < 0 &&
      state.x <= left &&
      state.x >= COURT.inset - COURT.radius &&
      Math.abs(state.y - state.player) <= COURT.paddleHeight / 2 + COURT.radius;
    const hitsRight =
      state.vx > 0 &&
      state.x >= right &&
      state.x <= COURT.width - COURT.inset + COURT.radius &&
      Math.abs(state.y - state.computer) <=
        COURT.paddleHeight / 2 + COURT.radius;
    if (hitsLeft || hitsRight) {
      const paddle = hitsLeft ? state.player : state.computer;
      const angle =
        clamp((state.y - paddle) / (COURT.paddleHeight / 2), -1, 1) * 0.95;
      const speed = Math.min(560, Math.hypot(state.vx, state.vy) * 1.045);
      state.vx = (hitsLeft ? 1 : -1) * Math.cos(angle) * speed;
      state.vy = Math.sin(angle) * speed;
      state.x = hitsLeft ? left : right;
      state.rally++;
    }
    if (state.x < -COURT.radius) score(state, false);
    else if (state.x > COURT.width + COURT.radius) score(state, true);
    if (state.winner) break;
  }
}
