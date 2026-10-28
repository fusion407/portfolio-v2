import { describe, expect, it } from "vitest";
import { exceedsFrameBudget } from "@/components/three/frame-budget";

describe("sustained frame delivery", () => {
  it("tolerates healthy rendering, isolated long tasks, and incomplete samples", () => {
    expect(exceedsFrameBudget(Array(60).fill(33))).toBe(false);
    expect(exceedsFrameBudget([...Array(59).fill(33), 700])).toBe(false);
    expect(exceedsFrameBudget(Array(59).fill(100))).toBe(false);
  });
  it("requests the static fallback after sustained delivery below roughly 11 fps", () => {
    expect(exceedsFrameBudget(Array(60).fill(100))).toBe(true);
  });
});
