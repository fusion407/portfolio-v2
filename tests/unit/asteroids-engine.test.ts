import { describe, expect, it } from "vitest";
import {
  advanceAsteroids,
  createAsteroids,
  type AsteroidsInput,
} from "@/components/arcade/asteroids-engine";
const still: AsteroidsInput = { turn: 0, thrust: false, fire: false };
const random = () => 0.3;
describe("Asteroids simulation", () => {
  it("starts with three lives, a shield, and rocks away from the ship", () => {
    const game = createAsteroids(random);
    expect(game.lives).toBe(3);
    expect(game.rocks).toHaveLength(4);
    expect(game.shield).toBeGreaterThan(0);
    expect(
      game.rocks.every((rock) => Math.hypot(rock.x - 400, rock.y - 240) > 180),
    ).toBe(true);
  });
  it("rotates, accelerates, caps speed, and wraps across the field", () => {
    const game = createAsteroids(random);
    game.rocks = [];
    advanceAsteroids(game, 0.03, { ...still, turn: 1, thrust: true });
    expect(game.ship.angle).toBeGreaterThan(-Math.PI / 2);
    expect(game.ship.y).toBeLessThan(240);
    game.ship.x = 799;
    game.ship.vx = 1000;
    advanceAsteroids(game, 0.03, still);
    expect(game.ship.x).toBeLessThan(10);
    expect(Math.hypot(game.ship.vx, game.ship.vy)).toBeLessThanOrEqual(240);
  });
  it("rate limits shots and expires them", () => {
    const game = createAsteroids(random);
    game.rocks = [];
    advanceAsteroids(game, 0.03, { ...still, fire: true });
    advanceAsteroids(game, 0.03, { ...still, fire: true });
    expect(game.shots).toHaveLength(1);
    for (let frame = 0; frame < 30; frame++)
      advanceAsteroids(game, 1 / 30, still);
    expect(game.shots).toHaveLength(0);
  });
  it("splits large and medium rocks, scores hits once, and removes small rocks", () => {
    for (const [size, points, fragment] of [
      [42, 20, 24],
      [24, 50, 13],
      [13, 100, 0],
    ]) {
      const game = createAsteroids(random);
      game.rocks = [
        { id: 99, x: 100, y: 100, vx: 0, vy: 0, size: size!, angle: 0 },
      ];
      game.shots = Array.from({ length: 2 }, () => ({
        x: 100,
        y: 100,
        vx: 0,
        vy: 0,
        life: 1,
      }));
      advanceAsteroids(game, 0.01, still);
      expect(game.score).toBe(points);
      expect(game.rocks).toHaveLength(fragment ? 2 : 0);
      expect(game.rocks.every((rock) => rock.size === fragment)).toBe(true);
    }
  });
  it("handles collisions across a wrapped edge", () => {
    const game = createAsteroids(random);
    game.rocks = [{ id: 99, x: 798, y: 100, vx: 0, vy: 0, size: 13, angle: 0 }];
    game.shots = [{ x: 2, y: 100, vx: 0, vy: 0, life: 1 }];
    advanceAsteroids(game, 0.01, still);
    expect(game.score).toBe(100);
  });
  it("protects respawns, decrements lives, and freezes game over", () => {
    const game = createAsteroids(random);
    const collide = () => {
      game.rocks = [
        { id: 99, x: 400, y: 240, vx: 0, vy: 0, size: 42, angle: 0 },
      ];
    };
    collide();
    advanceAsteroids(game, 0.01, still);
    expect(game.lives).toBe(3);
    for (let life = 2; life >= 0; life--) {
      game.shield = 0;
      collide();
      advanceAsteroids(game, 0.01, still);
      expect(game.lives).toBe(life);
    }
    const finished = structuredClone(game);
    advanceAsteroids(game, 0.03, { turn: 1, thrust: true, fire: true });
    expect(game).toEqual(finished);
  });
  it("advances cleared waves after a short delay and clamps long frame gaps", () => {
    const game = createAsteroids(random);
    game.rocks = [];
    for (let frame = 0; frame < 38; frame++)
      advanceAsteroids(game, 1 / 30, still, random);
    expect(game.wave).toBe(2);
    expect(game.rocks).toHaveLength(5);
    const y = game.ship.y;
    advanceAsteroids(game, 20, { ...still, thrust: true });
    expect(Math.abs(game.ship.y - y)).toBeLessThan(1);
  });
});
