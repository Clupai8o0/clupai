// Helpers for text, shared by the home page and the generic page motion.
import gsap from "gsap";

// Splits an element's text into masked letters. A copy stays for screen readers. Returns a function that undoes it.
export function splitLetters(el)
{
  // A heading that is one link keeps its link: the letters go inside it.
  const link = el.children.length === 1 && el.firstElementChild.tagName === "A" ? el.firstElementChild : null;
  const box = link || el;
  const text = box.textContent;
  box.textContent = "";
  const reader = document.createElement("span");
  reader.className = "sr-only";
  reader.textContent = text;
  box.appendChild(reader);
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
    box.appendChild(w);
    if (wi < all.length - 1) {
      box.appendChild(document.createTextNode(" "));
    }
  });
  return () => {
    box.textContent = text;
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
