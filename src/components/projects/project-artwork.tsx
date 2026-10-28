import type { ProjectKind } from "@/content/projects";

export function ProjectArtwork({ kind }: { kind: ProjectKind }) {
  return (
    <figure className={`project-artwork artwork-${kind}`}>
      <svg viewBox="0 0 640 310" fill="none" aria-hidden="true">
        {kind === "geovis" && (
          <>
            <g stroke="#38BDF8" strokeOpacity=".08">
              {[60, 120, 180, 240, 300, 360, 420, 480, 540, 600].map((x) => (
                <path key={x} d={`M${x} 0v310`} />
              ))}
              {[50, 100, 150, 200, 250].map((y) => (
                <path key={y} d={`M0 ${y}h640`} />
              ))}
            </g>
            <g stroke="#38BDF8" strokeOpacity=".45">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <path
                  key={i}
                  d={`M-20 ${100 + i * 26}C100 ${-10 + i * 22} 200 ${230 + i * 9} 330 ${95 + i * 25}S540 ${60 + i * 25} 680 ${170 + i * 12}`}
                />
              ))}
            </g>
            <circle
              cx="347"
              cy="155"
              r="38"
              stroke="#7357F5"
              strokeOpacity=".6"
            />
            <circle
              cx="347"
              cy="155"
              r="68"
              stroke="#7357F5"
              strokeOpacity=".25"
            />
            <circle cx="347" cy="155" r="5" fill="#38BDF8" />
            <g
              fontFamily="monospace"
              fontSize="10"
              letterSpacing="2"
              fill="#9DABCF"
            >
              <text x="30" y="33">
                CLOUD → LOCAL
              </text>
              <text x="460" y="280">
                SEISMIC / AI
              </text>
            </g>
          </>
        )}
        {kind === "neonsynth" && (
          <>
            <path d="M0 155h640" stroke="#9DABCF" strokeOpacity=".15" />
            <g stroke="#7357F5" strokeWidth="2">
              {[0, 1, 2].map((i) => (
                <path
                  key={i}
                  opacity={1 - i * 0.25}
                  d={`M-20 ${155 + i * 15}C30 ${155 + i * 15} 40 35 90 35S150 275 200 275 260 35 310 35 370 275 420 275 480 35 530 35 590 155 660 155`}
                />
              ))}
            </g>
            <g stroke="#38BDF8" strokeOpacity=".6">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                <path
                  key={i}
                  d={`M${285 + i * 6} ${135 - Math.sin(i) * 12}v${40 + Math.sin(i) * 24}`}
                />
              ))}
            </g>
            <g
              fontFamily="monospace"
              fontSize="10"
              letterSpacing="2"
              fill="#9DABCF"
            >
              <text x="30" y="33">
                EXPLORATIONS IN SOUND
              </text>
              <text x="525" y="280">
                VST3
              </text>
            </g>
          </>
        )}
        {kind === "titanforge" && (
          <>
            <g stroke="#7357F5" strokeOpacity=".55">
              <path d="m320 68 160 88-160 88-160-88 160-88Z" />
              <path d="m320 105 94 51-94 51-94-51 94-51Z" />
              <path d="M320 68v176M160 156h320" strokeDasharray="4 7" />
              <path d="m320 68 0-25m160 113 42 22M320 244v25M160 156l-42 22" />
            </g>
            <g fill="#121B30" stroke="#38BDF8">
              {[
                [320, 68],
                [480, 156],
                [320, 244],
                [160, 156],
              ].map(([x, y], i) => (
                <rect
                  key={i}
                  x={(x ?? 0) - 12}
                  y={(y ?? 0) - 12}
                  width="24"
                  height="24"
                  rx="5"
                />
              ))}
            </g>
            <path
              d="m320 133 22 23-22 23-22-23 22-23Z"
              fill="#7357F5"
              fillOpacity=".4"
              stroke="#9DABCF"
            />
            <g
              fontFamily="monospace"
              fontSize="10"
              letterSpacing="2"
              fill="#9DABCF"
            >
              <text x="30" y="33">
                SPECIALIZED AGENTS
              </text>
              <text x="440" y="280">
                WORKSPACE CONCEPT
              </text>
            </g>
          </>
        )}
        {kind === "swordbound" && (
          <>
            <ellipse
              cx="320"
              cy="157"
              rx="170"
              ry="95"
              stroke="#7357F5"
              strokeOpacity=".25"
            />
            <circle
              cx="320"
              cy="157"
              r="111"
              stroke="#9DABCF"
              strokeOpacity=".12"
              strokeDasharray="3 9"
            />
            <path
              d="m225 258 37-57 8-9 90-125 47-33-15 56-99 117-8 11-47 50"
              fill="#1B2440"
              stroke="#9DABCF"
              strokeOpacity=".8"
            />
            <path
              d="m270 197 122-150M246 181l66 49"
              stroke="#38BDF8"
              strokeWidth="2"
            />
            <path d="m237 252 23-34" stroke="#7357F5" strokeWidth="6" />
            <g fill="#7357F5">
              <circle cx="200" cy="129" r="2" />
              <circle cx="440" cy="218" r="3" />
              <circle cx="405" cy="115" r="2" />
            </g>
            <g
              fontFamily="monospace"
              fontSize="10"
              letterSpacing="2"
              fill="#9DABCF"
            >
              <text x="30" y="33">
                REAL-TIME / TECHNICAL ART
              </text>
              <text x="470" y="280">
                UNREAL ENGINE
              </text>
            </g>
          </>
        )}
      </svg>
      <figcaption>
        <span />
        Conceptual artwork · not a product screenshot
      </figcaption>
    </figure>
  );
}
