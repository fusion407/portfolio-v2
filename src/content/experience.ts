export const experience = [
  {
    organization: "Kohola Data Solutions",
    role: "AI Software Engineer",
    context: "GeoVis · ongoing migration",
    description:
      "Adapting an existing seismic visualization application for desktop execution and local AI inference.",
    contributions: [
      "Cloud-to-local AI migration",
      "Ollama integration",
      "Desktop adaptation and packaging",
    ],
  },
  {
    organization: "Swordbound: Protocol",
    role: "Technical Artist and Gameplay Contributor",
    context: "Unreleased mobile game",
    description:
      "Contributing to the visual experience, performance, cinematics, and selected gameplay mechanics in Unreal Engine.",
    contributions: [
      "Niagara VFX, shaders, and SFX implementation",
      "Mobile graphics, lighting, and animation fixes",
      "Sequencer cinematics and gameplay contributions",
    ],
  },
] as const;

export const technologyGroups = [
  {
    title: "AI runtime & integration",
    description: "Local inference and cloud AI integration.",
    tools: ["Ollama", "Gemini"],
  },
  {
    title: "AI development tools",
    description: "Tools I use to explore, plan, and build.",
    tools: ["Replit", "Claude Code", "OpenAI Codex", "Google Antigravity"],
  },
  {
    title: "Creative & real-time",
    description: "Game development, technical art, and audio.",
    tools: [
      "Unreal Engine",
      "Niagara",
      "Sequencer",
      "VST3 development",
      "Ableton Live",
    ],
  },
] as const;
