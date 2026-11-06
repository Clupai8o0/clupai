import { GLYPHS, SHIFTER, SPACE, TITTLE } from "@/motion/glyphs";

type Glyph = { w: number; top: number; bottom: number; d: string };

const G = GLYPHS as Record<string, Glyph>;
const WORD = [..."clupai"];
// Where "ai" starts, for the blue accent.
const AI = WORD.length - 2;

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

// The small logotype. With accent, "ai" and the dot are blue, as in the header, the footer and the emails.
export function Mark({ height, className, accent = false }: { height: number; className?: string; accent?: boolean })
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
      {letters.map((l, i) => (
        <path key={l.key} transform={`translate(${l.x} 0)`} d={l.d} fill={accent && i >= AI ? "var(--blue)" : "currentColor"} />
      ))}
      <circle cx={dotX} cy={TITTLE.y} r={TITTLE.size / 2} fill={accent ? "var(--blue)" : "currentColor"} />
    </svg>
  );
}

// The full word with the mascot standing on the i, for a page that isn't moving.
// With a fill, the letters are a window onto that picture, as the moving home page has them.
export function StaticWord({ className, fill }: { className?: string; fill?: string })
{
  const { letters, dotX, width } = layOut();
  // With Shifter off the i's dot is part of the word, so the picture has to reach the top of it.
  const top = SHIFTER ? G.l.top : Math.min(G.l.top, TITTLE.y - TITTLE.size / 2);
  const bottom = G.p.bottom;
  const S = TITTLE.size * 1.15;
  const feet = -14;
  // The same face as the live mascot: see SHAPES.circle in motion/shapes.js and .dot-eyes in globals.css.
  const eyeW = S * 0.088;
  const eyeH = S * 0.25;
  const eyeGap = S * 0.085;
  const eyesX = dotX + S * 0.07;
  const eyesY = feet - S + S * 0.39;
  return (
    <svg className={className} viewBox={`0 -70 ${width} 210`} overflow="visible" role="img" aria-label="clupai">
      {letters.map((l) => (
        <path key={l.key} transform={`translate(${l.x} 0)`} d={l.d} fill="currentColor" />
      ))}
      {!SHIFTER && <circle cx={dotX} cy={TITTLE.y} r={TITTLE.size / 2} fill="currentColor" />}
      {fill && (
        <>
          <clipPath id="static-word-fill">
            {letters.map((l) => (
              <path key={l.key} transform={`translate(${l.x} 0)`} d={l.d} />
            ))}
            {!SHIFTER && <circle cx={dotX} cy={TITTLE.y} r={TITTLE.size / 2} />}
          </clipPath>
          <image
            href={fill}
            x={0}
            y={top}
            width={width}
            height={bottom - top}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#static-word-fill)"
          />
        </>
      )}
      {SHIFTER && <circle cx={dotX} cy={feet - S / 2} r={S / 2} fill="#ffe100" />}
      {SHIFTER && [-1, 1].map((side) => {
        const cx = eyesX + side * (eyeGap + eyeW) / 2;
        return (
          <rect
            key={side}
            x={cx - eyeW / 2}
            y={eyesY - eyeH / 2}
            width={eyeW}
            height={eyeH}
            rx={eyeW / 2}
            transform={`rotate(11 ${cx} ${eyesY})`}
            fill="#070707"
          />
        );
      })}
    </svg>
  );
}
