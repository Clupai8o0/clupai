export default function SamAvatar({ size = 120 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-label="Sam · clupai"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="samg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="118"
        height="118"
        rx="2"
        fill="#0a0a0a"
        stroke="var(--border-2)"
      />
      <path
        d="M30 98 C30 74 42 60 60 60 C78 60 90 74 90 98 Z"
        fill="url(#samg)"
      />
      <circle cx="60" cy="44" r="18" fill="url(#samg)" />
      <rect x="78" y="78" width="28" height="22" fill="var(--accent)" />
      <text
        x="92"
        y="94"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontWeight="800"
        fontSize="14"
        fill="#050505"
        letterSpacing="-0.02em"
      >
        S
      </text>
      <g stroke="var(--text-muted)" strokeWidth="0.8" opacity="0.5">
        <path d="M6 6 L12 6 M6 6 L6 12" />
        <path d="M114 6 L108 6 M114 6 L114 12" />
        <path d="M6 114 L12 114 M6 114 L6 108" />
        <path d="M114 114 L108 114 M114 114 L114 108" />
      </g>
    </svg>
  );
}
