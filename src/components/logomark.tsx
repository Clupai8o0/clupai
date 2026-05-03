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
    </svg>
  );
}
