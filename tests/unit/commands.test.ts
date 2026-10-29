import { describe, expect, it } from "vitest";
import { filterCommand } from "@/content/commands";

describe("portfolio command filtering", () => {
  it("matches case-insensitive title fragments and deliberate aliases", () => {
    expect(filterCommand("NeonSynth", "  NEON  ")).toBe(1);
    expect(filterCommand("Swordbound: Protocol", "protocol")).toBe(1);
    expect(filterCommand("GitHub", "fusion407", ["fusion407"])).toBe(1);
    expect(filterCommand("Home", "")).toBe(1);
  });
  it("does not match unrelated subsequences or empty-result queries", () => {
    expect(filterCommand("Experience", "NEON", ["Experience"])).toBe(0);
    expect(filterCommand("NeonSynth", "not-a-real-project-xyz")).toBe(0);
  });
});
