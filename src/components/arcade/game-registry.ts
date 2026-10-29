import type { ComponentType } from "react";
export type GameProps = { onExit: () => void };

// The picker renders this registry; each game loads only after selection.
export const arcadeGames = [
  {
    id: "pong",
    title: "Pong",
    description: "You, a paddle, and a worthy opponent.",
    load: async (): Promise<ComponentType<GameProps>> =>
      (await import("./pong")).Pong,
  },
  {
    id: "asteroids",
    title: "Asteroids",
    description: "Pilot, dodge, and clear the asteroid field.",
    load: async (): Promise<ComponentType<GameProps>> =>
      (await import("./asteroids")).Asteroids,
  },
] as const;
