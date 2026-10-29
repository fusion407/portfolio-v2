export const SPACE = { width: 800, height: 480 };
type Body = { x: number; y: number; vx: number; vy: number };
export type Rock = Body & { id: number; size: number; angle: number };
export type AsteroidsInput = { turn: number; thrust: boolean; fire: boolean };
export type AsteroidsState = {
  ship: Body & { angle: number };
  rocks: Rock[];
  shots: (Body & { life: number })[];
  score: number;
  lives: number;
  wave: number;
  shield: number;
  cooldown: number;
  waveDelay: number;
  nextId: number;
};
const wrap = (value: number, extent: number) =>
  ((value % extent) + extent) % extent;
function distance(a: Body, b: Body) {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  return Math.hypot(
    Math.min(dx, SPACE.width - dx),
    Math.min(dy, SPACE.height - dy),
  );
}
function ship() {
  return { x: 400, y: 240, vx: 0, vy: 0, angle: -Math.PI / 2 };
}
function spawnWave(state: AsteroidsState, random: () => number) {
  for (let index = 0; index < Math.min(3 + state.wave, 10); index++) {
    const vertical = random() > 0.5;
    const angle = random() * Math.PI * 2;
    const speed = 25 + random() * 25 + Math.min(state.wave, 10) * 3;
    state.rocks.push({
      id: state.nextId++,
      size: 42,
      angle,
      x: vertical ? random() * 800 : random() > 0.5 ? 30 : 770,
      y: vertical ? (random() > 0.5 ? 25 : 455) : random() * 480,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
    });
  }
}
export function createAsteroids(random = Math.random): AsteroidsState {
  const state: AsteroidsState = {
    ship: ship(),
    rocks: [],
    shots: [],
    score: 0,
    lives: 3,
    wave: 1,
    shield: 2.5,
    cooldown: 0,
    waveDelay: 0,
    nextId: 0,
  };
  spawnWave(state, random);
  return state;
}
export function advanceAsteroids(
  state: AsteroidsState,
  elapsed: number,
  input: AsteroidsInput,
  random = Math.random,
) {
  if (!state.lives || !Number.isFinite(elapsed) || elapsed <= 0) return;
  const dt = Math.min(elapsed, 1 / 30);
  state.shield = Math.max(0, state.shield - dt);
  state.cooldown = Math.max(0, state.cooldown - dt);
  const player = state.ship;
  player.angle += input.turn * 4 * dt;
  if (input.thrust) {
    player.vx += Math.cos(player.angle) * 190 * dt;
    player.vy += Math.sin(player.angle) * 190 * dt;
  }
  const speed = Math.hypot(player.vx, player.vy);
  if (speed > 240) {
    player.vx *= 240 / speed;
    player.vy *= 240 / speed;
  }
  const drag = Math.exp(-0.2 * dt);
  player.vx *= drag;
  player.vy *= drag;
  if (input.fire && state.cooldown === 0 && state.shots.length < 12) {
    state.shots.push({
      x: wrap(player.x + Math.cos(player.angle) * 18, 800),
      y: wrap(player.y + Math.sin(player.angle) * 18, 480),
      vx: Math.cos(player.angle) * 480 + player.vx,
      vy: Math.sin(player.angle) * 480 + player.vy,
      life: 0.85,
    });
    state.cooldown = 0.18;
  }
  for (const body of [player, ...state.rocks, ...state.shots]) {
    body.x = wrap(body.x + body.vx * dt, 800);
    body.y = wrap(body.y + body.vy * dt, 480);
  }
  for (const shot of state.shots) shot.life -= dt;
  state.shots = state.shots.filter((shot) => shot.life > 0);
  const destroyed = new Set<number>();
  const fragments: Rock[] = [];
  for (const shot of state.shots) {
    const rock = state.rocks.find(
      (rock) => !destroyed.has(rock.id) && distance(shot, rock) < rock.size,
    );
    if (!rock) continue;
    shot.life = 0;
    destroyed.add(rock.id);
    state.score += rock.size > 30 ? 20 : rock.size > 15 ? 50 : 100;
    if (rock.size > 15) {
      for (const side of [-1, 1]) {
        const angle = rock.angle + side * 0.9;
        fragments.push({
          ...rock,
          id: state.nextId++,
          size: rock.size > 30 ? 24 : 13,
          angle,
          vx: rock.vx + Math.cos(angle) * 35,
          vy: rock.vy + Math.sin(angle) * 35,
        });
      }
    }
  }
  state.rocks = [
    ...state.rocks.filter((rock) => !destroyed.has(rock.id)),
    ...fragments,
  ];
  state.shots = state.shots.filter((shot) => shot.life > 0);
  if (
    state.shield === 0 &&
    state.rocks.some((rock) => distance(player, rock) < rock.size + 10)
  ) {
    state.lives--;
    state.ship = ship();
    state.shots = [];
    state.shield = 3;
  }
  if (!state.rocks.length && state.lives) {
    state.waveDelay += dt;
    if (state.waveDelay >= 1.2) {
      state.wave++;
      state.waveDelay = 0;
      state.shield = Math.max(state.shield, 2);
      spawnWave(state, random);
    }
  }
}
