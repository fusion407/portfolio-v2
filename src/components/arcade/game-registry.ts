import type { ComponentType } from "react";
export type GameProps = { onExit: () => void };

// Add games here later; a selection is made only after the visitor presses Play.
export const arcadeGames = [
  {
    id: "pong",
    title: "Pong",
    description: "You, a paddle, and a worthy opponent.",
    load: async (): Promise<ComponentType<GameProps>> =>
      (await import("./pong")).Pong,
  },
] as const;
