"use client";
import Image from "next/image";
import { useState } from "react";
import { swordboundTrailer } from "@/content/projects";
export function ProjectTrailer() {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="project-trailer">
      <div className="trailer-viewport">
        {playing ? (
          <iframe
            src={`${swordboundTrailer.embedUrl}?autoplay=1&playsinline=1&rel=0`}
            title="Swordbound: Protocol official trailer"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={(event) => event.currentTarget.focus()}
          />
        ) : (
          <>
            <Image
              src="/images/projects/swordbound-trailer.webp"
              alt="Swordbound: Protocol official trailer poster"
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 1120px"
            />
            <button
              type="button"
              className="trailer-start"
              aria-label="Play trailer: Swordbound: Protocol"
              onClick={() => setPlaying(true)}
            >
              <span className="trailer-play-symbol" aria-hidden="true">
                ▶
              </span>
              <span>Play trailer</span>
            </button>
            <noscript>
              <style>{".trailer-start { display: none; }"}</style>
            </noscript>
          </>
        )}
      </div>
      <figcaption>
        <span>Official trailer</span>
        <a href={swordboundTrailer.url}>
          Watch on YouTube <span aria-hidden="true">↗</span>
        </a>
      </figcaption>
    </figure>
  );
}
