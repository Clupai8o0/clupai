// Helpers for text and wipes, shared by the home page and the generic page motion.
import gsap from "gsap";
import { clamp } from "./kit";

// Splits an element's text into masked letters. A copy stays for screen readers. Returns a function that undoes it.
export function splitLetters(el)
{
  const text = el.textContent;
  el.textContent = "";
  const reader = document.createElement("span");
  reader.className = "sr-only";
  reader.textContent = text;
  el.appendChild(reader);
  text.split(" ").forEach((word, wi, all) => {
    const w = document.createElement("span");
    w.className = "wd";
    w.setAttribute("aria-hidden", "true");
    [...word].forEach((ch) => {
      const m = document.createElement("span");
      m.className = "lm";
      const c = document.createElement("span");
      c.className = "lc";
      c.textContent = ch;
      m.appendChild(c);
      w.appendChild(m);
    });
    el.appendChild(w);
    if (wi < all.length - 1) {
      el.appendChild(document.createTextNode(" "));
    }
  });
  return () => {
    el.textContent = text;
    el.style.minHeight = "";
  };
}

export const GLYPHS_LETTERS = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789";

// Seeded, so every visit looks the same.
export function seeded(start)
{
  let seed = start;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

// Type settling out of noise. The element keeps its text in data-text and its height in minHeight.
export function scramble(el, duration, delay, rnd)
{
  const target = el.dataset.text || el.textContent;
  el.dataset.text = target;
  el.textContent = target.replace(/\S/g, " ");
  const state = { p: 0 };
  gsap.to(state, {
    p: 1,
    duration,
    delay,
    ease: "none",
    onUpdate() {
      const done = Math.floor(state.p * target.length);
      let out = target.slice(0, done);
      for (let i = done; i < target.length; i += 1) {
        if (target[i] === " ") {
          out += " ";
        } else {
          out += i < done + 4 ? GLYPHS_LETTERS[Math.floor(rnd() * GLYPHS_LETTERS.length)] : " ";
        }
      }
      el.textContent = out;
    },
    onComplete() {
      el.textContent = target;
    },
  });
}

// The next thing gets built over the last one, brick by brick, in running bond from the ground up.
export function brickPath(w, h, prog, { rows, cols })
{
  if (prog <= 0) {
    return "path('M0 0')";
  }
  if (prog >= 1) {
    return "none";
  }
  const rh = h / rows;
  const bw = w / cols;
  const total = rows * cols + Math.floor(rows / 2);
  const spread = cols * 1.6;
  let n = 0;
  let d = "";
  for (let r = 0; r < rows; r += 1) {
    const odd = r % 2 === 1;
    const count = odd ? cols + 1 : cols;
    const y0 = h - (r + 1) * rh;
    for (let c = 0; c < count; c += 1) {
      // Laid like a bricklayer works: along one row, then back along the next.
      const col = odd ? count - 1 - c : c;
      const t = clamp((prog * (total + spread) - n) / spread, 0, 1);
      n += 1;
      if (t > 0) {
        const off = odd ? bw / 2 : 0;
        const x0 = Math.round(Math.max(0, col * bw - off));
        const x1 = Math.round(Math.min(w, (col + 1) * bw - off));
        const top = Math.round(y0 - (1 - t) * (1 - t) * rh * 1.6);
        const bottom = Math.round(top + rh * Math.min(1, t * 1.5));
        d += `M${x0} ${top}H${x1}V${bottom}H${x0}Z`;
      }
    }
  }
  return d ? `path('${d}')` : "path('M0 0')";
}
