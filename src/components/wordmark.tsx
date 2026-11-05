import { GLYPHS, SPACE, TITTLE } from "@/motion/glyphs";

type Glyph = { w: number; top: number; bottom: number; d: string };

const G = GLYPHS as Record<string, Glyph>;
const WORD = [..."clupai"];

function layOut()
{
  let x = 0;
  let dotX = 0;
  const letters = WORD.map((ch, i) => {
    const at = x;
    if (ch === "i") {
      dotX = x + G[ch].w / 2;
    }
    x += G[ch].w + SPACE;
    return { key: `${ch}${i}`, x: at, d: G[ch].d };
  });
  return { letters, dotX, width: x - SPACE };
}

// The small logotype, for the nav and the footer.
export function Mark({ height, className }: { height: number; className?: string })
{
  const { letters, dotX, width } = layOut();
  const top = TITTLE.y - TITTLE.size / 2 - 2;
  const bottom = G.p.bottom + 1;
  const u = height / (bottom - top);
  return (
    <svg
      className={className}
      viewBox={`0 ${top} ${width} ${bottom - top}`}
      height={height}
      width={width * u}
      aria-hidden="true"
    >
      {letters.map((l) => (
        <path key={l.key} transform={`translate(${l.x} 0)`} d={l.d} fill="currentColor" />
      ))}
      <circle cx={dotX} cy={TITTLE.y} r={TITTLE.size / 2} fill="currentColor" />
    </svg>
  );
}

// The full word with the mascot standing on the i, for a page that isn't moving.
export function StaticWord({ className }: { className?: string })
{
  const { letters, dotX, width } = layOut();
  const S = TITTLE.size * 1.15;
  const feet = -14;
  const faceY = feet - S / 2 - S * 0.62;
  const eyeH = S * 0.3;
  const eyeW = S * 0.15;
  const eyeGap = S * 0.13;
  const eyeY = feet - S + S * 0.44 - S * 0.62 - eyeH / 2;
  const legW = S * 0.06;
  const legX = S * 0.07;
  const legTop = feet - S * 0.74;
  const footW = S * 0.19;
  return (
    <svg className={className} viewBox={`0 -70 ${width} 210`} role="img" aria-label="clupai">
      {letters.map((l) => (
        <path key={l.key} transform={`translate(${l.x} 0)`} d={l.d} fill="currentColor" />
      ))}
      <rect x={dotX - legX - legW} y={legTop} width={legW} height={feet - legTop} fill="#ffe100" />
      <rect x={dotX + legX} y={legTop} width={legW} height={feet - legTop} fill="#ffe100" />
      <rect x={dotX - legX - footW} y={feet - legW} width={footW} height={legW} fill="#ffe100" />
      <rect x={dotX + legX} y={feet - legW} width={footW} height={legW} fill="#ffe100" />
      <circle cx={dotX} cy={faceY} r={S / 2} fill="#ffe100" />
      <rect x={dotX - eyeGap / 2 - eyeW} y={eyeY} width={eyeW} height={eyeH} fill="#070707" />
      <rect x={dotX + eyeGap / 2} y={eyeY} width={eyeW} height={eyeH} fill="#070707" />
    </svg>
  );
}
