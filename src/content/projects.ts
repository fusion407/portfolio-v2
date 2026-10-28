export type ProjectKind = "geovis" | "neonsynth" | "titanforge" | "swordbound";

export type ProjectSummary = {
  id: ProjectKind;
  title: string;
  category: string;
  status: "In development" | "Early prototype" | "Unreleased";
  summary: string;
  tools: readonly string[];
  role: string;
  overview: readonly string[];
};

export const projects: readonly ProjectSummary[] = [
  {
    id: "geovis",
    title: "GeoVis",
    category: "Professional AI engineering",
    status: "In development",
    summary:
      "Bringing a cloud-hosted seismic visualization application to the desktop, with local AI inference as the target.",
    tools: ["Ollama", "Replit", "Local AI"],
    role: "AI Software Engineer · Kohola Data Solutions",
    overview: [
      "I work within an existing architecture developed by others, adapting the application for local desktop execution.",
      "The ongoing migration replaces cloud LLM dependencies, including Gemini, with Ollama-based inference and includes desktop packaging. These are development targets, not a completed delivery.",
    ],
  },
  {
    id: "neonsynth",
    title: "NeonSynth",
    category: "Creative software engineering",
    status: "In development",
    summary:
      "A custom VST3 synthesizer for electronic music production, exploring sound synthesis, modulation, and audio-plugin development.",
    tools: ["VST3", "Ableton Live", "Sound synthesis"],
    role: "Personal synthesizer project",
    overview: [
      "NeonSynth is being developed for use with Ableton Live. The current focus is the actual plugin and its synthesis behavior.",
      "A browser playground is a future possibility that requires a compatible implementation of the real audio engine. There is no browser synthesizer in this release.",
    ],
  },
  {
    id: "titanforge",
    title: "TitanForge Studio",
    category: "Agentic AI / game development tools",
    status: "Early prototype",
    summary:
      "An experimental game development workspace exploring collaboration between specialized AI agents.",
    tools: ["Agent collaboration", "Game development"],
    role: "Experimental workspace",
    overview: [
      "The design vision explores how specialized AI agents could collaborate within a game development workspace.",
      "This is an early prototype. Detailed capabilities and demonstrations will follow as the project matures.",
    ],
  },
  {
    id: "swordbound",
    title: "Swordbound: Protocol",
    category: "Professional game development",
    status: "Unreleased",
    summary:
      "Technical art and selected gameplay contributions to an unreleased mobile sword-fighting game.",
    tools: ["Unreal Engine", "Niagara", "Sequencer"],
    role: "Technical Artist and Gameplay Contributor",
    overview: [
      "My work includes Niagara VFX, shaders, sound implementation, lighting and animation fixes, mobile graphics optimization, Sequencer cinematics, camera animation, and selected gameplay mechanics.",
      "The official trailer was produced by a third party and presents the game generally. It is not a demonstration of my individual cinematic work. Approved in-game captures can show those contributions when available.",
    ],
  },
];
