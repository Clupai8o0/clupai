// Shifter's body: one flat outline on springs, so any shape can turn into any other.
// Every silhouette is drawn in a 100 x 100 box with the feet at y = 100, and sampled to the same number of points.
const N = 240;
const M = 32;
const PARTS = 2;
const TOTAL = N + PARTS * M;
const NS = "http://www.w3.org/2000/svg";

function area(p)
{
  let a = 0;
  const n = p.length / 2;
  for (let i = 0; i < n; i += 1) {
    const j = (i + 1) % n;
    a += p[i * 2] * p[j * 2 + 1] - p[j * 2] * p[i * 2 + 1];
  }
  return a / 2;
}

function clockwise(p)
{
  if (area(p) >= 0) {
    return p;
  }
  const out = new Float32Array(p.length);
  const n = p.length / 2;
  for (let i = 0; i < n; i += 1) {
    out[i * 2] = p[(n - 1 - i) * 2];
    out[i * 2 + 1] = p[(n - 1 - i) * 2 + 1];
  }
  return out;
}

// Evenly spaced points along a closed outline.
function resample(pts, n)
{
  const lens = pts.map((p, i) => {
    const q = pts[(i + 1) % pts.length];
    return Math.hypot(q[0] - p[0], q[1] - p[1]);
  });
  const total = lens.reduce((a, b) => a + b, 0);
  const out = new Float32Array(n * 2);
  let seg = 0;
  let walked = 0;
  for (let i = 0; i < n; i += 1) {
    const want = (i / n) * total;
    while (walked + lens[seg] < want && seg < pts.length - 1) {
      walked += lens[seg];
      seg += 1;
    }
    const t = lens[seg] ? (want - walked) / lens[seg] : 0;
    const a = pts[seg];
    const b = pts[(seg + 1) % pts.length];
    out[i * 2] = a[0] + (b[0] - a[0]) * t;
    out[i * 2 + 1] = a[1] + (b[1] - a[1]) * t;
  }
  return clockwise(out);
}

function ell(cx, cy, r)
{
  const pts = [];
  for (let i = 0; i < 180; i += 1) {
    const t = (i / 180) * Math.PI * 2;
    pts.push([cx + Math.cos(t) * r, cy + Math.sin(t) * r]);
  }
  return pts;
}

function mk(main, parts, eye, es = 1)
{
  return { main: resample(main, N), parts: parts.map((p) => resample(p, M)), eye, es };
}

// An ellipse that stands on y = 100.
function oval(rx, ry)
{
  const pts = [];
  for (let i = 0; i < 180; i += 1) {
    const t = (i / 180) * Math.PI * 2;
    pts.push([50 + Math.cos(t) * rx, 100 - ry + Math.sin(t) * ry]);
  }
  return pts;
}

// The round body with anime bumps swelling out of its head, blended in so there's no corner where they meet.
// Each bump is [radius, how far its centre sits from the body's centre].
function bumped(bumps, deg = -104)
{
  const a = (deg * Math.PI) / 180;
  const ux = Math.cos(a);
  const uy = Math.sin(a);
  const blend = (d1, d2, k) => {
    const h = Math.max(k - Math.abs(d1 - d2), 0) / k;
    return Math.min(d1, d2) - h * h * k * 0.25;
  };
  const sdf = (x, y) => {
    let d = Math.hypot(x - 50, y - 50) - 50;
    bumps.forEach(([r, at]) => {
      d = blend(d, Math.hypot(x - 50 - ux * at, y - 50 - uy * at) - r, 14);
    });
    return d;
  };
  const pts = [];
  for (let i = 0; i < 480; i += 1) {
    const t = (i / 480) * Math.PI * 2;
    const dx = Math.cos(t);
    const dy = Math.sin(t);
    let lo = 0;
    let hi = 120;
    for (let k = 0; k < 28; k += 1) {
      const mid = (lo + hi) / 2;
      if (sdf(50 + dx * mid, 50 + dy * mid) <= 0) {
        lo = mid;
      } else {
        hi = mid;
      }
    }
    pts.push([50 + dx * lo, 50 + dy * lo]);
  }
  return pts;
}

// eye: where the eyes sit in the box. es: how big they are. Zero-ish means this shape has none.
// Every shape is soft and round, so a change of mood reads as a squish and not as a new animal.
export const SHAPES = {
  circle: mk(ell(50, 50, 50), [], [57, 39]),
  puff: mk(oval(55, 45), [], [57, 50]),
  egg: mk(oval(43, 56), [], [55, 36]),
  plump: mk(oval(52, 48), [], [57, 42]),
  mochi: mk(oval(58, 30), [], [53, 72], 0.85),
  bump: mk(bumped([[21, 55]]), [], [57, 42]),
  bump2: mk(bumped([[26, 58]], -98), [], [57, 43]),
  dots: mk(ell(50, 84, 13), [ell(16, 84, 10), ell(84, 84, 10)], [50, 84], 0.001),
};

function centre(p, off, n)
{
  let x = 0;
  let y = 0;
  for (let i = 0; i < n; i += 1) {
    x += p[off + i * 2];
    y += p[off + i * 2 + 1];
  }
  return [x / n, y / n];
}

// Lines the new outline up with the old one, so nothing twists on the way.
function bestOffset(cur, off, tgt, n)
{
  const step = Math.max(1, Math.floor(n / 48));
  let best = 0;
  let cost = Infinity;
  for (let o = 0; o < n; o += step) {
    let c = 0;
    for (let i = 0; i < n && c < cost; i += step) {
      const j = (i + o) % n;
      const dx = cur[off + i * 2] - tgt[j * 2];
      const dy = cur[off + i * 2 + 1] - tgt[j * 2 + 1];
      c += dx * dx + dy * dy;
    }
    if (c < cost) {
      cost = c;
      best = o;
    }
  }
  return best;
}

export class MorphBody
{
  constructor(parent, { k = 95, c = 12.5, vary = 0.28 } = {})
  {
    this.svg = document.createElementNS(NS, "svg");
    this.svg.setAttribute("viewBox", "0 0 100 100");
    this.svg.setAttribute("class", "dot-shape");
    this.svg.setAttribute("aria-hidden", "true");
    this.path = document.createElementNS(NS, "path");
    this.svg.appendChild(this.path);
    parent.prepend(this.svg);
    this.P = new Float32Array(TOTAL * 2);
    this.V = new Float32Array(TOTAL * 2);
    this.T = new Float32Array(TOTAL * 2);
    this.K = new Float32Array(TOTAL * 2);
    this.on = new Array(PARTS).fill(false);
    this.c = c;
    this.awake = false;
    this.acc = 0;
    // The outline's stiffness varies around its length, so it arrives in a ripple and not all at once.
    for (let i = 0; i < N; i += 1) {
      const f = k * (1 + vary * Math.sin((i / N) * Math.PI * 6));
      this.K[i * 2] = f;
      this.K[i * 2 + 1] = f;
    }
    this.K.fill(k * 1.3, N * 2);
  }

  to(shape, snap = false)
  {
    const { P, T, V } = this;
    const o = bestOffset(P, 0, shape.main, N);
    for (let i = 0; i < N; i += 1) {
      const j = (i + o) % N;
      T[i * 2] = shape.main[j * 2];
      T[i * 2 + 1] = shape.main[j * 2 + 1];
    }
    for (let k = 0; k < PARTS; k += 1) {
      const off = (N + k * M) * 2;
      const part = shape.parts[k];
      if (part) {
        if (!this.on[k]) {
          // A new part grows out of a single point.
          const c = centre(part, 0, M);
          for (let i = 0; i < M; i += 1) {
            P[off + i * 2] = c[0];
            P[off + i * 2 + 1] = c[1];
            V[off + i * 2] = 0;
            V[off + i * 2 + 1] = 0;
          }
          T.set(part, off);
        } else {
          const po = bestOffset(P, off, part, M);
          for (let i = 0; i < M; i += 1) {
            const j = (i + po) % M;
            T[off + i * 2] = part[j * 2];
            T[off + i * 2 + 1] = part[j * 2 + 1];
          }
        }
        this.on[k] = true;
      } else if (this.on[k]) {
        const c = centre(P, off, M);
        for (let i = 0; i < M; i += 1) {
          T[off + i * 2] = c[0];
          T[off + i * 2 + 1] = c[1];
        }
      }
    }
    if (snap) {
      P.set(T);
      V.fill(0);
      this.render();
    }
    this.awake = !snap;
  }

  step(dt)
  {
    if (!this.awake) {
      return;
    }
    const h = 1 / 240;
    this.acc += dt;
    if (this.acc < h) {
      return;
    }
    const { P, V, T, K, c } = this;
    let energy = 0;
    while (this.acc >= h) {
      this.acc -= h;
      energy = 0;
      for (let i = 0; i < TOTAL * 2; i += 1) {
        const d = T[i] - P[i];
        V[i] += (K[i] * d - c * V[i]) * h;
        P[i] += V[i] * h;
        energy += d * d + V[i] * V[i] * 0.0005;
      }
    }
    if (energy < 0.0004) {
      P.set(T);
      V.fill(0);
      this.awake = false;
      this.retire();
    }
    this.render();
  }

  // A part that has shrunk to a point stops being drawn.
  retire()
  {
    const P = this.P;
    for (let k = 0; k < PARTS; k += 1) {
      const off = (N + k * M) * 2;
      let spread = 0;
      for (let i = 1; i < M; i += 1) {
        spread += Math.abs(P[off + i * 2] - P[off]) + Math.abs(P[off + i * 2 + 1] - P[off + 1]);
      }
      if (spread < 0.01) {
        this.on[k] = false;
      }
    }
  }

  render()
  {
    const P = this.P;
    let d = "";
    for (let i = 0; i < N; i += 1) {
      d += `${i ? "L" : "M"}${P[i * 2].toFixed(2)} ${P[i * 2 + 1].toFixed(2)}`;
    }
    d += "Z";
    for (let k = 0; k < PARTS; k += 1) {
      if (this.on[k]) {
        const off = (N + k * M) * 2;
        for (let i = 0; i < M; i += 1) {
          d += `${i ? "L" : "M"}${P[off + i * 2].toFixed(2)} ${P[off + i * 2 + 1].toFixed(2)}`;
        }
        d += "Z";
      }
    }
    this.path.setAttribute("d", d);
  }
}

// The comet tail when it's thrown.
export function makeTrail()
{
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "dot-trail");
  svg.setAttribute("aria-hidden", "true");
  document.body.appendChild(svg);
  const lines = Array.from({ length: 18 }, () => {
    const l = document.createElementNS(NS, "line");
    l.setAttribute("stroke-width", 0);
    svg.appendChild(l);
    return l;
  });
  const pts = [];
  let drawn = false;
  return {
    el: svg,
    step(x, y, size, on)
    {
      if (on) {
        pts.unshift([x, y]);
        if (pts.length > lines.length + 1) {
          pts.pop();
        }
      } else {
        pts.pop();
        pts.pop();
      }
      if (!pts.length && !drawn) {
        return;
      }
      lines.forEach((l, i) => {
        const a = pts[i];
        const b = pts[i + 1];
        if (!a || !b) {
          l.setAttribute("stroke-width", 0);
          return;
        }
        l.setAttribute("x1", a[0]);
        l.setAttribute("y1", a[1]);
        l.setAttribute("x2", b[0]);
        l.setAttribute("y2", b[1]);
        l.setAttribute("stroke-width", size * 0.3 * (1 - i / lines.length));
      });
      drawn = pts.length > 0;
    },
  };
}
