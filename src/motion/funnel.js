// Motion for /start and /start/result. React owns the questions and the answers. This file only watches
// data-tower on .fun and keeps a tower of falling blocks in step with it.
import gsap from "gsap";
import Matter from "matter-js";
import { BLUE, PAPER, RED, YELLOW, clamp, makeWorld, placeShape } from "./kit";

const { Bodies, Body, Composite, Events, Sleeping } = Matter;

// Real points from src/lib/risk-check.ts, used here only to pick how steady each block is.
const STEADY = {
  1: [6 / 14, 1, 10 / 14, 8 / 14],
  2: [10 / 16, 10 / 16, 14 / 16, 1, 6 / 16],
  3: [1, 0.5, 0.2],
  4: [0.3, 0.5, 1],
  5: [1, 0.7, 0.4, 0.2],
};

const steadiness = (q, a) => (STEADY[q] ? STEADY[q][a] : 0.8);

// Shifter isn't here: it only lives on the home page (boot.js hides it).
export function init(scope)
{
  const main = document.querySelector("main");
  const root = () => main.querySelector(".fun");
  const towerEl = main.querySelector(".f-tower");
  if (!towerEl) {
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
  });

  const code = () => (root() ? root().dataset.tower || "" : "");

  // Blocks already earned, from a reload, a home page link, or the questions before the result.
  function rebuild(text)
  {
    [...text].forEach((c, i) => {
      later(i * 0.12, () => {
        addBlock(i, Number(c));
      });
    });
  }

  // ---------------------------------------------------------------- the result
  const score = root() ? root().dataset.score : undefined;
  if (score !== undefined) {
    const value = Number(score);
    rebuild(code());
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
    });
    // Past the score the tower leaves the words alone.
    scope.on(window, "scroll", () => {
      const now = scrollY > innerHeight * 0.35;
      if (now === past) {
        return;
      }
      past = now;
      towerEl.classList.toggle("is-gone", past);
    }, { passive: true });
    return;
  }

  // ---------------------------------------------------------------- the questions
  let seen = code();
  rebuild(seen);

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
    for (let i = same; i < now.length; i += 1) {
      addBlock(i, Number(now[i]));
    }
  }

  const watcher = new MutationObserver(scope.wrap(sync));
  watcher.observe(main, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-tower"] });
  scope.cleanup(() => watcher.disconnect());
}
