import Image from "next/image";
import type { ProjectKind } from "@/content/projects";
import { ProjectTrailer } from "./project-trailer";
const artwork = {
  geovis: {
    src: "/images/projects/geovis.webp",
    alt: "GeoVis application map showing the United States and surrounding regions",
    width: 1941,
    height: 1138,
  },
  neonsynth: {
    src: "/images/projects/neonsynth.webp",
    alt: "NeonSynth synthesizer interface with oscillators, filter, envelopes, modulation controls and keyboard",
    width: 1472,
    height: 1001,
  },
  titanforge: {
    src: "/images/projects/titanforge.webp",
    alt: "TitanForge Studio metallic emblem and wordmark",
    width: 1254,
    height: 1254,
  },
} as const;
export function ProjectArtwork({ kind }: { kind: ProjectKind }) {
  if (kind === "swordbound") return <ProjectTrailer />;
  return (
    <figure className={`project-artwork artwork-${kind}`}>
      <Image
        {...artwork[kind]}
        alt={artwork[kind].alt}
        sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 1120px"
      />
    </figure>
  );
}
