export function StaticNetwork() {
  return (
    <div className="hero-network-fallback" aria-hidden="true">
      <svg viewBox="0 0 600 560" fill="none">
        <defs>
          <radialGradient id="network-halo">
            <stop stopColor="#7357F5" stopOpacity=".15" />
            <stop offset="1" stopColor="#7357F5" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="network-line"
            x1="120"
            y1="120"
            x2="480"
            y2="460"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7357F5" />
            <stop offset="1" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        <circle cx="300" cy="280" r="260" fill="url(#network-halo)" />
        <g stroke="#9DABCF" strokeOpacity=".12">
          <ellipse
            cx="300"
            cy="280"
            rx="230"
            ry="100"
            transform="rotate(-32 300 280)"
          />
          <ellipse
            cx="300"
            cy="280"
            rx="230"
            ry="100"
            transform="rotate(40 300 280)"
          />
          <circle cx="300" cy="280" r="204" strokeDasharray="2 12" />
        </g>
        <g stroke="url(#network-line)" strokeOpacity=".55">
          <path d="m150 185 155-66 150 102-28 180-177 39-100-255Z" />
          <path d="m150 185 165 118 140-82M305 119l10 184 112 98M250 440l65-137M150 185l277 216M305 119l-55 321" />
        </g>
        <g fill="#080B14" stroke="#7357F5">
          <circle cx="150" cy="185" r="10" />
          <circle cx="305" cy="119" r="8" />
          <circle cx="455" cy="221" r="12" />
          <circle cx="427" cy="401" r="9" />
          <circle cx="250" cy="440" r="7" />
        </g>
        <circle
          cx="315"
          cy="303"
          r="30"
          fill="#121B30"
          stroke="#38BDF8"
          strokeOpacity=".7"
        />
        <circle cx="315" cy="303" r="9" fill="#38BDF8" />
        <g
          fill="#9DABCF"
          fontFamily="monospace"
          fontSize="10"
          letterSpacing="2"
        >
          <text x="100" y="161">
            IDEAS
          </text>
          <text x="320" y="102">
            SYSTEMS
          </text>
          <text x="476" y="224">
            AGENTS
          </text>
          <text x="444" y="426">
            BUILD
          </text>
        </g>
        <g fill="#38BDF8">
          <circle cx="91" cy="342" r="2" />
          <circle cx="407" cy="107" r="2" />
          <circle cx="503" cy="340" r="2" />
        </g>
      </svg>
      <p className="network-caption">
        <span />
        Connected ideas. Deliberate engineering.
      </p>
    </div>
  );
}
