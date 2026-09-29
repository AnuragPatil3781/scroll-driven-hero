/**
 * Original futuristic vehicle, drawn as a scalable SVG.
 * Dark metallic body, cyan accent lighting, cockpit canopy, wheels,
 * soft cyan glow and a ground shadow.
 */
export default function Vehicle({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 900 340"
      role="img"
      aria-label="Futuristic concept vehicle"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="fzBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3c4654" />
          <stop offset="42%" stopColor="#1b212b" />
          <stop offset="100%" stopColor="#0a0d12" />
        </linearGradient>
        <linearGradient id="fzLower" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#151a22" />
          <stop offset="100%" stopColor="#05070a" />
        </linearGradient>
        <linearGradient id="fzGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9fe9ff" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#1d3a49" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#070b0f" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="fzAccent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#12e6ff" stopOpacity="0" />
          <stop offset="25%" stopColor="#3af0ff" />
          <stop offset="100%" stopColor="#0a8fff" />
        </linearGradient>
        <radialGradient id="fzShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fzUnderglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#25d9ff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#25d9ff" stopOpacity="0" />
        </radialGradient>
        <filter id="fzSoft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id="fzTight" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
      </defs>

      {/* ground shadow + underglow */}
      <ellipse cx="450" cy="292" rx="330" ry="26" fill="url(#fzShadow)" />
      <ellipse cx="450" cy="284" rx="250" ry="30" fill="url(#fzUnderglow)" />

      {/* rear wheel */}
      <g>
        <circle cx="240" cy="252" r="52" fill="#06080b" />
        <circle cx="240" cy="252" r="52" fill="none" stroke="#2a323d" strokeWidth="3" />
        <circle cx="240" cy="252" r="30" fill="#0e131a" stroke="#38e6ff" strokeWidth="2" opacity="0.9" />
        <circle cx="240" cy="252" r="12" fill="#1b232c" />
      </g>
      {/* front wheel */}
      <g>
        <circle cx="668" cy="252" r="52" fill="#06080b" />
        <circle cx="668" cy="252" r="52" fill="none" stroke="#2a323d" strokeWidth="3" />
        <circle cx="668" cy="252" r="30" fill="#0e131a" stroke="#38e6ff" strokeWidth="2" opacity="0.9" />
        <circle cx="668" cy="252" r="12" fill="#1b232c" />
      </g>

      {/* lower chassis / diffuser */}
      <path
        d="M132 244 C 200 268, 300 276, 450 276 C 610 276, 712 266, 786 240 L 774 214 L 150 214 Z"
        fill="url(#fzLower)"
      />

      {/* main aerodynamic body */}
      <path
        d="M120 232
           C 148 186, 206 168, 268 164
           C 318 118, 392 96, 470 98
           C 552 100, 618 124, 666 162
           C 726 170, 776 188, 800 214
           C 812 228, 800 244, 778 246
           L 150 248
           C 126 248, 112 242, 120 232 Z"
        fill="url(#fzBody)"
      />

      {/* body highlight edge */}
      <path
        d="M268 164 C 318 118, 392 96, 470 98 C 552 100, 618 124, 666 162"
        fill="none"
        stroke="#7f95a8"
        strokeOpacity="0.5"
        strokeWidth="2"
      />

      {/* cockpit canopy */}
      <path
        d="M306 160 C 348 118, 408 100, 468 102 C 528 104, 580 124, 622 158 Z"
        fill="url(#fzGlass)"
      />
      <path
        d="M306 160 C 348 118, 408 100, 468 102 C 528 104, 580 124, 622 158"
        fill="none"
        stroke="#6fe8ff"
        strokeOpacity="0.7"
        strokeWidth="2"
      />
      <path d="M468 102 L 468 158" stroke="#0b0f14" strokeOpacity="0.6" strokeWidth="3" />

      {/* side intake */}
      <path d="M300 196 L 420 190 L 404 214 L 296 216 Z" fill="#05080b" />
      <path d="M300 196 L 420 190" stroke="#38e6ff" strokeOpacity="0.5" strokeWidth="2" />

      {/* rear light bar */}
      <rect x="124" y="206" width="26" height="9" rx="4" fill="#ff4d6a" opacity="0.85" />
      <rect x="124" y="206" width="26" height="9" rx="4" fill="#ff4d6a" filter="url(#fzTight)" />

      {/* front headlight blade */}
      <path d="M742 196 L 800 206 L 798 218 L 738 212 Z" fill="#bff4ff" />
      <path d="M742 196 L 800 206 L 798 218 L 738 212 Z" fill="#7fe9ff" filter="url(#fzTight)" />

      {/* cyan accent line along the sill */}
      <path
        d="M160 240 L 780 232"
        stroke="url(#fzAccent)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M160 240 L 780 232"
        stroke="url(#fzAccent)"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.45"
        filter="url(#fzSoft)"
      />

      {/* rear wing */}
      <path d="M116 176 L 214 170 L 214 182 L 116 190 Z" fill="#161c24" />
      <path d="M116 176 L 214 170" stroke="#38e6ff" strokeOpacity="0.45" strokeWidth="2" />
    </svg>
  );
}
