// Motion for /start and /start/result. React owns the questions and the answers. This file only watches
// data-tower on .fun and keeps a tower of falling blocks and the mascot in step with it.
import gsap from "gsap";
import Matter from "matter-js";
import { BLUE, INK, PAPER, RED, YELLOW, clamp, isPhone, makeWorld, placeShape } from "./kit";

const { Bodies, Body, Composite, Events, Sleeping } = Matter;

// Real points from src/lib/risk-check.ts, used here only to pick how steady each block is.
const STEADY = {
  1: [6 / 14, 1, 10 / 14, 8 / 14],
  2: [10 / 16, 10 / 16, 14 / 16, 1, 6 / 16],
  3: [1, 0.5, 0.2],
  4: [0.3, 0.5, 1],
  5: [1, 0.7, 0.4, 0.2],
};

const QUIPS = [
  ["Big one. Good.", "Customers. Nice.", "No more spreadsheets, then.", "Honest. We’ll sort that."],
  ["Everyone starts here.", "Better than most.", "Ooh. Who started it?", "Seen that before. Fixable."],
  ["Not for long.", "Hope they’re answering you.", "Did they give you a date?", "Nice. Can they ship?", "Brave."],
  ["Keep that paper.", "Rough for who?", "So nobody’s on the hook."],
  ["Then the date is the whole job.", "Momentum’s the expensive bit.", "Lucky you."],
  ["Don’t keep them waiting.", "They won’t wait forever.", "Said. Not paid. Noted.", "Then build small first."],
  ["Easy. Fast.", "Two’s fine.", "Bring them to the call."],
  ["Honest answer: we’re not your people yet.", "Tight. Let’s talk.", "Good. That’s a real budget.", "Nice. Bring your wish list.", "Work it out by the call."],
];

const steadiness = (q, a) => (STEADY[q] ? STEADY[q][a] : 0.8);

export function init(scope, core)
{
  const { dot } = core;
  const main = document.querySelector("main");
  const root = () => main.querySelector(".fun");
  const towerEl = main.querySelector(".f-tower");
  const size = isPhone() ? 42 : 66;
  dot.colour(YELLOW, INK);
  dot.mood("");
  if (!towerEl) {
    dot.hop(core.rest, { size: isPhone() ? 44 : 72 });
    return;
  }

  const box = towerEl.getBoundingClientRect();
  const W = box.width;
  const H = box.height;
  const world = scope.world(makeWorld({ gravity: 1.5 }));
  world.walls(W, H);
  Events.on(world.engine, "collisionStart", scope.wrap((ev) => {
    if (ev.pairs.some((p) => Math.abs(p.bodyA.velocity.y - p.bodyB.velocity.y) > 7)) {
      gsap.fromTo(towerEl, { y: 7 }, { y: 0, duration: 0.24, ease: "power2.out", overwrite: true });
    }
  }));

  const blocks = [];
  const later = (seconds, fn) => gsap.delayedCall(seconds, scope.wrap(fn));

  function towerTop()
  {
    const r = towerEl.getBoundingClientRect();
    let best = null;
    world.items.forEach((it) => {
      if (!best || it.body.bounds.min.y < best.body.bounds.min.y) {
        best = it;
      }
    });
    if (!best) {
      return { x: r.left + r.width * 0.72, y: r.bottom - 2 };
    }
    return { x: clamp(r.left + best.body.position.x, 40, innerWidth - 40), y: r.top + best.body.bounds.min.y + 1 };
  }

  function addBlock(q, a)
  {
    const steady = steadiness(q, a);
    const colours = [BLUE, YELLOW, RED, PAPER];
    const el = document.createElement("div");
    el.className = "tb";
    el.style.background = colours[(q + a) % colours.length];
    const h0 = clamp(H * 0.13, 34, 112);
    const x = W * (0.5 + (q % 2 ? 0.05 : -0.05));
    let b;
    let w;
    let h;
    if (steady <= 0.3) {
      // Risky answers stand on a corner. They don't stay where you put them.
      w = h0;
      h = w;
      b = Bodies.rectangle(x, -h, w, h, { restitution: 0.3, friction: 0.3, density: 0.002 });
    } else if (steady < 0.75) {
      // Wobbly: a triangle. Nothing sits well on top of one.
      w = Math.min(W * 0.46, h0 * 1.9);
      h = h0 * 1.25;
      el.style.clipPath = "polygon(50% 0, 100% 100%, 0 100%)";
      b = Bodies.fromVertices(x, -h, [[{ x: 0, y: -h * 2 / 3 }, { x: w / 2, y: h / 3 }, { x: -w / 2, y: h / 3 }]], { restitution: 0.14, friction: 0.5, density: 0.002 });
    } else {
      // Steady: a wide flat block.
      w = Math.min(W * 0.62, h0 * 3.2);
      h = h0 * 0.86;
      b = Bodies.rectangle(W / 2, -h, w, h, { restitution: 0.06, friction: 0.9, density: 0.002 });
    }
    towerEl.appendChild(el);
    const item = placeShape(world, el, 0, 0, w, h, b);
    if (steady <= 0.3) {
      // After placeShape, which measures its box from the body's bounds.
      Body.setAngle(b, Math.PI / 4);
    }
    blocks.push({ answer: a, item });
  }

  function dropLast()
  {
    const { item } = blocks.pop();
    Composite.remove(world.engine.world, item.body);
    world.items.splice(world.items.indexOf(item), 1);
    item.el.remove();
  }

  scope.cleanup(() => {
    towerEl.textContent = "";
    towerEl.classList.remove("is-gone");
    dot.el.style.visibility = "";
    dot.state.under = null;
    dot.state.side = "left";
  });

  const quipSide = () => (isPhone() ? "under" : "above");
  dot.state.under = () => towerEl.getBoundingClientRect().bottom + 12;
  const code = () => (root() ? root().dataset.tower || "" : "");

  // Blocks already earned, from a reload, a home page link, or the questions before the result.
  function rebuild(text)
  {
    [...text].forEach((c, i) => {
      later(i * 0.12, () => {
        addBlock(i, Number(c));
      });
    });
    later(text.length * 0.12 + 0.5, () => {
      dot.hop(towerTop, { size });
    });
  }

  // ---------------------------------------------------------------- the result
  const score = root() ? root().dataset.score : undefined;
  if (score !== undefined) {
    const value = Number(score);
    rebuild(code());
    dot.hop(towerTop, { size });
    const verdict = value < 45 ? "Wobbly. Fixable, though." : value < 72 ? "Standing. Just." : "Solid. Let’s build it.";
    let past = false;
    // A shaky score knocks the tower about. A good one stands.
    later(1.7, () => {
      if (value < 72) {
        const force = value < 45 ? 0.05 : 0.012;
        for (let i = 0; i < (value < 45 ? 2 : 1); i += 1) {
          later(i * 0.3, () => {
            world.items.forEach((it) => {
              const high = 1 - it.body.position.y / H;
              Sleeping.set(it.body, false);
              Body.applyForce(it.body, it.body.position, { x: -force * it.body.mass * (0.3 + high * 1.7), y: -force * 0.45 * it.body.mass });
            });
          });
        }
      }
      dot.mood(value < 45 ? "annoyed" : value < 72 ? "smug" : "happy");
      if (value < 45 && !past) {
        dot.fling(-260, -1050, { silent: true });
      }
    });
    later(2.7, () => {
      if (past) {
        return;
      }
      dot.hop(towerTop, {
        size,
        done: scope.wrap(() => {
          if (!past) {
            dot.talk(verdict, { side: "above", ms: 0 });
          }
        }),
      });
    });
    // Past the score the tower leaves the words alone and the mascot, as in the mock-up, steps out.
    scope.on(window, "scroll", () => {
      const now = scrollY > innerHeight * 0.35;
      if (now === past) {
        return;
      }
      past = now;
      towerEl.classList.toggle("is-gone", past);
      dot.quiet();
      dot.el.style.visibility = past ? "hidden" : "";
      if (!past) {
        dot.hop(towerTop, { size });
      }
    }, { passive: true });
    return;
  }

  // ---------------------------------------------------------------- the questions
  let seen = code();
  rebuild(seen);
  if (!seen) {
    dot.hop(towerTop, { size, side: "above" });
  }
  later(seen ? 0.2 : 0.5, () => {
    const q = seen.length - 1;
    const line = q >= 0 && QUIPS[q] ? QUIPS[q][Number(seen[q])] : "Answer honestly. I can tell.";
    dot.talk(line, { side: quipSide(), ms: 2800 });
  });

  function sync()
  {
    const now = code();
    if (now === seen) {
      return;
    }
    seen = now;
    let same = 0;
    while (same < blocks.length && same < now.length && blocks[same].answer === Number(now[same])) {
      same += 1;
    }
    while (blocks.length > same) {
      dropLast();
    }
    const grew = now.length > same;
    for (let i = same; i < now.length; i += 1) {
      addBlock(i, Number(now[i]));
    }
    dot.quiet();
    if (grew) {
      const q = now.length - 1;
      const a = Number(now[q]);
      later(0.28, () => {
        dot.talk(QUIPS[q][a], { side: quipSide(), ms: 2300 });
        dot.flash(steadiness(q, a) <= 0.3 ? "wide" : "smug", 1.4);
      });
      later(0.72, () => {
        dot.hop(towerTop, { size, rise: 60 });
      });
    } else {
      dot.hop(towerTop, { size, rise: 60 });
    }
  }

  const watcher = new MutationObserver(scope.wrap(sync));
  watcher.observe(main, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-tower"] });
  scope.cleanup(() => watcher.disconnect());
}
