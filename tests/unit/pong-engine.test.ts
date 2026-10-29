import { describe, expect, it } from "vitest";
import {
  advancePong,
  COURT,
  createPong,
} from "@/components/arcade/pong-engine";
const still = { direction: 0, target: null };

describe("Pong simulation", () => {
  it("starts a fresh match with a readable serve delay", () => {
    const state = createPong();
    advancePong(state, 0.05, still);
    expect([state.playerScore, state.computerScore, state.x, state.y]).toEqual([
      0, 0, 400, 240,
    ]);
    expect(state.serve).toBeGreaterThan(0);
    expect(state.winner).toBeNull();
  });
  it("reflects the ball from both horizontal walls", () => {
    for (const bottom of [false, true]) {
      const state = {
        ...createPong(),
        serve: 0,
        y: bottom ? 479 : 1,
        vy: bottom ? 180 : -180,
      };
      advancePong(state, 0.03, still);
      expect(state.y).toBeGreaterThanOrEqual(COURT.radius);
      expect(state.y).toBeLessThanOrEqual(COURT.height - COURT.radius);
      expect(Math.sign(state.vy)).toBe(bottom ? -1 : 1);
    }
  });
  it("reflects from either paddle without scoring or tunnelling", () => {
    for (const right of [false, true]) {
      const state = {
        ...createPong(),
        serve: 0,
        x: right ? 750 : 50,
        y: 240,
        vx: right ? 550 : -550,
        vy: 0,
      };
      advancePong(state, 0.04, still);
      expect(Math.sign(state.vx)).toBe(right ? -1 : 1);
      expect(state.rally).toBe(1);
      expect(state.playerScore + state.computerScore).toBe(0);
      expect(Math.hypot(state.vx, state.vy)).toBeLessThanOrEqual(560.001);
    }
  });
  it("uses contact position to change the return angle", () => {
    const state = { ...createPong(), serve: 0, x: 50, y: 270, vx: -350, vy: 0 };
    advancePong(state, 0.02, still);
    expect(state.vx).toBeGreaterThan(0);
    expect(state.vy).toBeGreaterThan(0);
  });
  it("scores a missed ball, resets the serve, and finishes at five", () => {
    for (const player of [false, true]) {
      const state = {
        ...createPong(),
        serve: 0,
        x: player ? 810 : -10,
        vx: player ? 320 : -320,
        playerScore: player ? 4 : 0,
        computerScore: player ? 0 : 4,
      };
      advancePong(state, 0.02, still);
      expect(state.winner).toBe(player ? "You" : "Computer");
      expect(Math.max(state.playerScore, state.computerScore)).toBe(5);
      expect(state.x).toBe(400);
      const finished = { ...state };
      advancePong(state, 0.05, { direction: 1, target: 999 });
      expect(state).toEqual(finished);
    }
  });
  it("bounds paddles and limits the computer movement", () => {
    const state = { ...createPong(), serve: 0, x: 600, y: 430, vx: 300 };
    advancePong(state, 0.05, { direction: 0, target: 9999 });
    expect(Math.abs(state.computer - 240)).toBeLessThanOrEqual(
      235 * 0.05 + 0.001,
    );
    for (let frame = 0; frame < 200; frame++)
      advancePong(state, 0.016, { direction: 1, target: null });
    expect(state.player).toBeLessThanOrEqual(
      COURT.height - COURT.paddleHeight / 2,
    );
  });
  it("clamps long frame gaps instead of jumping through the court", () => {
    const state = { ...createPong(), serve: 0 };
    advancePong(state, 10, { direction: -1, target: null });
    expect(state.player).toBeCloseTo(240 - 410 * 0.05);
    expect(Math.abs(state.x - 400)).toBeLessThan(30);
  });
});
