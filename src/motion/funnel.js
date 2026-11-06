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
  // Heavy and firm, like the shelf: blocks land flat and stay put. No bounce, no tumbling.
  const world = scope.world(makeWorld({ gravity: 2.2, sleep: true }));
  world.engine.positionIterations = 14;
  world.engine.velocityIterations = 10;
  world.walls(W, H);
  Events.on(world.engine, "collisionStart", scope.wrap((ev) => {
    if (ev.pairs.some((p) => Math.abs(p.bodyA.velocity.y - p.bodyB.velocity.y) > 7)) {
      gsap.fromTo(towerEl, { y: 4 }, { y: 0, duration: 0.24, ease: "power3.out", overwrite: true });
    }
  }));

  const blocks = [];
  const later = (seconds, fn) => gsap.delayedCall(seconds, scope.wrap(fn));

  // A tall stack creeps in a physics engine and slowly tips over by itself. So once a block has sat still for a
  // moment it's fixed in place. Only the result page's knock frees them again.
  let locking = true;
  Events.on(world.engine, "afterUpdate", () => {
    if (!locking) {
      return;
    }
    blocks.forEach((bl) => {
      const body = bl.item.body;
      if (body.isStatic) {
        return;
      }
      bl.still = body.speed < 0.08 && body.angularSpeed < 0.002 ? (bl.still || 0) + 1 : 0;
      if (bl.still > 18) {
        Body.setStatic(body, true);
      }
    });
  });
  const unlock = () => {
    locking = false;
    blocks.forEach((bl) => {
      Body.setStatic(bl.item.body, false);
    });
  };
  const FIRM = { restitution: 0, friction: 0.8, frictionStatic: 1.2, frictionAir: 0.02, slop: 0.01, density: 0.002, sleepThreshold: 30 };

  // Every block lands level. How steady an answer is shows in the block's width and how far off centre it sits,
  // so a shaky set of answers builds a narrow, crooked tower that the result page can knock over.
  function addBlock(q, a)
  {
    const steady = steadiness(q, a);
    const colours = [BLUE, YELLOW, RED, PAPER];
    const el = document.createElement("div");
    el.className = "tb";
    el.style.background = colours[(q + a) % colours.length];
    // On a phone the tower is a narrow strip, so sizes follow its width as well as its height.
    const h0 = clamp(Math.min(H * 0.13, W * 0.16), 22, 112);
    const side = q % 2 ? 1 : -1;
    let w;
    let h;
    let off;
    if (steady <= 0.3) {
      // Risky: a small block, a little off centre.
      w = Math.min(W * 0.3, h0 * 1.1);
      h = h0 * 0.8;
      off = 0.035;
    } else if (steady < 0.75) {
      // Wobbly: narrower, barely off centre.
      w = Math.min(W * 0.46, h0 * 2.1);
      h = h0 * 0.82;
      off = 0.02;
    } else {
      // Steady: a wide flat block, dead centre.
      w = Math.min(W * 0.62, h0 * 3.2);
      h = h0 * 0.86;
      off = 0;
    }
    // Off centre, but always over the block below, so the tower leans and never falls on its own.
    const below = blocks.length ? blocks[blocks.length - 1] : null;
    // A wide block can't sit on a small one: the tower narrows where an answer was risky and widens again slowly.
    if (below) {
      w = Math.min(w, below.w * 1.4);
    }
    const base = below ? below.item.body.position.x : W / 2;
    const reach = below ? below.w * 0.15 : W;
    const x = clamp(base + side * clamp(W * off, 0, reach), w / 2 + 2, W - w / 2 - 2);
    // A short drop onto the top of the stack: placed, not thrown from the top of the screen.
    // Measured from the highest block, even one still falling, so blocks added quickly never start inside each other.
    const top = blocks.reduce((y, it) => Math.min(y, it.item.body.bounds.min.y), H);
    const y = top - h0 * 2.4 - h / 2;
    const b = Bodies.rectangle(x, y, w, h, FIRM);
    towerEl.appendChild(el);
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power2.out" });
    const item = placeShape(world, el, 0, 0, w, h, b);
    blocks.push({ answer: a, item, w });
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
            unlock();
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
