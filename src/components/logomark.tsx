export default function Logomark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      aria-label="clupai"
      style={{ display: "block", flexShrink: 0 }}
    >
      <rect x="0" y="0" width="22" height="22" rx="2" fill="var(--accent)" />
      <path
        d="M6 11 L10 15 L16 7"
        stroke="var(--accent-ink)"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
