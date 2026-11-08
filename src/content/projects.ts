export type ProjectKind =
  "geovis" | "neonsynth" | "titanforge" | "swordbound" | "gig-tracker";
export type ProjectSlug =
  | "geovis"
  | "neonsynth"
  | "titanforge-studio"
  | "swordbound-protocol"
  | "gig-tracker";

export type ProjectSummary = {
  id: ProjectKind;
  slug: ProjectSlug;
  title: string;
  category: string;
  status: "In development" | "Early prototype" | "Unreleased" | "Live";
  summary: string;
  tools: readonly string[];
  liveUrl?: `https://${string}`;
  role: string;
  overview: readonly string[];
};

export type CaseStudySection = {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  };
};

export type Project = ProjectSummary & {
  sections: readonly CaseStudySection[];
  migration?: {
    startingPoint: { title: string; items: readonly string[] };
    target: { title: string; items: readonly string[] };
  };
  trailer?: { url: `https://${string}`; embedUrl: `https://${string}` };
};

export const swordboundTrailer = {
  url: "https://www.youtube.com/watch?v=lIJIB93M_BQ",
  embedUrl: "https://www.youtube-nocookie.com/embed/lIJIB93M_BQ",
} as const;

export const projects: readonly Project[] = [
  {
    id: "geovis",
    slug: "geovis",
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
    migration: {
      startingPoint: {
        title: "Existing cloud application",
        items: [
          "Cloud-hosted seismic visualization",
          "Online LLM services, including Gemini",
          "Architecture originally developed by others",
        ],
      },
      target: {
        title: "Local desktop application",
        items: [
          "Installable software on the user’s computer",
          "Local AI inference through Ollama",
          "Desktop adaptation and packaging",
        ],
      },
    },
    sections: [
      {
        id: "contributions",
        title: "My migration responsibilities",
        items: [
          "Work within the existing application architecture.",
          "Adapt the application for local desktop execution.",
          "Replace cloud LLM dependencies with Ollama-based inference.",
          "Package the software into an installable desktop application.",
          "Use Replit in the AI-assisted development process.",
        ],
      },
      {
        id: "status",
        title: "An ongoing migration",
        paragraphs: [
          "The migration is in development. Local inference and installable packaging describe the target application, not a completed delivery.",
          "The original architecture was developed by others. My contribution focuses on the cloud-to-local transition, desktop adaptation, and packaging.",
        ],
      },
    ],
  },
  {
    id: "neonsynth",
    slug: "neonsynth",
    title: "NeonSynth",
    category: "Creative software engineering",
    status: "In development",
    summary:
      "A custom VST3 synthesizer for electronic music production, exploring sound synthesis, modulation, and audio-plugin development.",
    tools: ["VST3", "Ableton Live", "Sound synthesis"],
    role: "Personal synthesizer project",
    overview: [
      "NeonSynth is a custom VST3 synthesizer for electronic music production in Ableton Live.",
      "The instrument brings together oscillators, filters, envelopes, modulation controls, and a keyboard in a dedicated synthesis interface.",
    ],
    sections: [
      {
        id: "focus",
        title: "Exploring the instrument",
        paragraphs: [
          "NeonSynth is a custom software synthesizer project for electronic music production, developed as a VST3 plugin for use with Ableton Live.",
        ],
        items: ["Sound synthesis", "Modulation", "Audio-plugin development"],
      },
    ],
  },
  {
    id: "titanforge",
    slug: "titanforge-studio",
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
    sections: [
      {
        id: "status",
        title: "Early exploration",
        paragraphs: [
          "TitanForge Studio is an early prototype. The workspace vision explores specialized AI-agent collaboration in game development; planned capabilities are not presented as implemented features.",
          "Technical documentation, demonstrations, and feature breakdowns will be added as the project matures.",
        ],
      },
    ],
  },
  {
    id: "swordbound",
    slug: "swordbound-protocol",
    title: "Swordbound: Protocol",
    category: "Professional game development",
    status: "Unreleased",
    summary:
      "Technical art and selected gameplay contributions to an unreleased mobile sword-fighting game.",
    tools: ["Unreal Engine", "Niagara", "Sequencer"],
    role: "Technical Artist and Gameplay Contributor",
    overview: [
      "My work includes Niagara VFX, shaders, sound implementation, lighting and animation fixes, mobile graphics optimization, Sequencer cinematics, camera animation, and selected gameplay mechanics.",
      "Swordbound: Protocol brings sword-fighting combat to mobile, combining real-time gameplay with a cinematic visual style.",
    ],
    sections: [
      {
        id: "contributions",
        title: "My contributions",
        items: [
          "Created and implemented Niagara VFX systems.",
          "Created, imported, and implemented shaders.",
          "Imported and implemented sound effects.",
          "Fixed lighting issues.",
          "Optimized graphics for mobile hardware.",
          "Fixed animation issues.",
          "Created cinematics using Unreal Sequencer.",
          "Animated cinematic cameras and added scene effects.",
          "Designed and developed selected gameplay mechanics.",
        ],
      },
    ],
    trailer: swordboundTrailer,
  },
  {
    id: "gig-tracker",
    slug: "gig-tracker",
    title: "Gig Tracker",
    category: "Tabletop companion / web app",
    status: "Live",
    summary:
      "A mobile-first counter companion for the Cyberpunk 2077 trading card game, keeping Gig dice, Street Cred, and turns in sync with the table.",
    tools: ["JavaScript", "Progressive Web App", "Vercel"],
    role: "Personal web app project",
    liveUrl: "https://cyberpunk-dice.vercel.app/",
    overview: [
      "Gig Tracker keeps the bookkeeping close at hand: track both players’ Gig dice and Street Cred, manage turn progression, and follow regulation and overtime in one interface.",
      "Built with HTML, CSS, and vanilla JavaScript, the app saves matches on the device and works offline after the initial load. No account is needed to start playing.",
    ],
    sections: [
      {
        id: "features",
        title: "Keep the game moving",
        items: [
          "Roll D4–D20 Gig dice digitally or record the faces of physical dice.",
          "Track individual Gigs, Street Cred, steals, and face adjustments for card effects.",
          "Follow turn progression, overtime, and Gig-based victory checks.",
          "Undo match actions, resume local saves, and export the match log.",
        ],
      },
      {
        id: "table-view",
        title: "One device. Both sides of the table.",
        paragraphs: [
          "Face-to-face mode rotates one player’s controls toward the other end of a phone or tablet. Both players can manage their Gigs, roll dice, and end turns on a shared device.",
        ],
        image: {
          src: "/images/projects/gig-tracker-table.webp",
          alt: "Gig Tracker on a phone in face-to-face mode, with Player Two’s controls rotated above Player One’s controls",
          width: 390,
          height: 844,
          caption:
            "The live app in face-to-face table view, showing a sample match.",
        },
      },
    ],
  },
];

export function projectHref(project: Pick<ProjectSummary, "slug">) {
  return `/projects/${project.slug}` as const;
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: ProjectSlug) {
  const index = projects.findIndex((project) => project.slug === slug);
  return index < 0 ? undefined : projects[(index + 1) % projects.length];
}
