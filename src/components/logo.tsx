// The c* mark from branding/cstar_final.py: a Helvetica Neue Bold c and a blue asterisk on an obsidian tile.
// Paths traced from the font by branding/cstar_svg.py, so it stays sharp at any size.
export const C = "M46.98 44.01H57.93Q57.69 40.08 56.04 37.2Q54.38 34.33 51.75 32.4Q49.11 30.47 45.76 29.52Q42.41 28.58 38.79 28.58Q33.83 28.58 29.97 30.23Q26.11 31.89 23.43 34.84Q20.76 37.79 19.38 41.85Q18 45.9 18 50.63Q18 55.2 19.5 59.02Q20.99 62.84 23.67 65.59Q26.35 68.35 30.17 69.89Q33.99 71.42 38.55 71.42Q46.67 71.42 51.86 67.17Q57.06 62.92 58.16 54.8H47.37Q46.82 58.58 44.66 60.83Q42.49 63.07 38.48 63.07Q35.88 63.07 34.07 61.89Q32.25 60.71 31.19 58.86Q30.13 57.01 29.66 54.73Q29.18 52.44 29.18 50.24Q29.18 47.95 29.66 45.63Q30.13 43.31 31.27 41.38Q32.41 39.45 34.22 38.23Q36.03 37.01 38.71 37.01Q45.88 37.01 46.98 44.01Z";
export const STAR = "M74.49 39.47V32.91H70.29V39.47L64.36 37.16L62.94 41.21L69.03 43.25L65.15 48.4L68.66 50.97L72.34 45.56L76.22 50.97L79.69 48.4L75.8 43.25L82 41.21L80.58 37.16Z";

const TONES = {
  dark: ["#050505", "#f5f5f6"],
  light: ["#fafafa", "#0a0a0c"],
} as const;

export function Logo({ size, tone = "dark", className }: { size: number; tone?: keyof typeof TONES; className?: string })
{
  const [bg, fg] = TONES[tone];
  return (
    <svg className={className} viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <rect x="2" y="2" width="96" height="96" rx="22.5" fill={bg} />
      <path d={C} fill={fg} />
      <path d={STAR} fill="#4da3ff" />
    </svg>
  );
}
