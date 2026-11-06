// /products: the shelf. CSS lays the boxes out and they're real links, so this only lets you knock them over.
import gsap from "gsap";
import Matter from "matter-js";
import { init as initInner } from "./inner";

const { Engine, Bodies, Body, Composite, Sleeping } = Matter;
const STEP = 1000 / 60;
const TURN = Math.PI * 2;

// The box's angle folded into -PI..PI, so standing it back up never spins it the long way round.
function upright(a)
{
  let t = a % TURN;
  if (t > Math.PI) {
    t -= TURN;
  } else if (t < -Math.PI) {
    t += TURN;
  }
  return t;
}

function place(b, x, y, a)
{
  b.el.style.transform = `translate3d(${x - b.home.x}px, ${y - b.home.y}px, 0) rotate(${a}rad)`;
}

function render(b)
{
  place(b, b.body.position.x, b.body.position.y, b.body.angle);
}

function displaced(b)
{
  const p = b.body.position;
  return Math.abs(p.x - b.home.x) > 0.5 || Math.abs(p.y - b.home.y) > 0.5 || Math.abs(upright(b.body.angle)) > 0.005;
}

// One world per row of bays. On a phone a shelf wraps into rows, and a box only falls along its own plank.
function buildRows(shelf)
{
  const sr = shelf.getBoundingClientRect();
  const byTop = new Map();
  shelf.querySelectorAll(".bay").forEach((bay) => {
    const r = bay.getBoundingClientRect();
    const key = Math.round(r.top);
    if (!byTop.has(key)) {
      byTop.set(key, { bays: [], h: r.height });
    }
    byTop.get(key).bays.push({ bay, left: r.left - sr.left });
  });

  const rows = [];
  byTop.forEach(({ bays, h }) => {
    const W = sr.width;
    // More solver passes and a heavier pull: boxes land and stop like card, instead of sinking in and springing back.
    const eng = Engine.create({ enableSleeping: true, positionIterations: 14, velocityIterations: 10 });
    eng.gravity.y = 2.2;
    Composite.add(eng.world, [
      Bodies.rectangle(W / 2, h + 30, W + 600, 60, { isStatic: true, friction: 1 }),
      Bodies.rectangle(-30, h / 2 - 400, 60, h + 1200, { isStatic: true }),
      Bodies.rectangle(W + 30, h / 2 - 400, 60, h + 1200, { isStatic: true }),
    ]);
    const row = { eng, boxes: [], seen: false, paused: false, el: bays[0].bay };
    bays.forEach(({ bay, left }) => {
      bay.querySelectorAll(".bx").forEach((el) => {
        // Offsets ignore transforms, so a box lifted by hover is still measured where it stands.
        const w = el.offsetWidth;
        const bh = el.offsetHeight;
        const home = { x: left + el.offsetLeft + w / 2, y: el.offsetTop + bh / 2 };
        const body = Bodies.rectangle(home.x, home.y, w, bh, { friction: 0.8, frictionStatic: 1.2, restitution: 0, frictionAir: 0.02, slop: 0.01, density: 0.0016, sleepThreshold: 30 });
        Composite.add(eng.world, body);
        Sleeping.set(body, true);
        row.boxes.push({ el, body, home, w, h: bh, row });
      });
    });
    if (row.boxes.length) {
      rows.push(row);
    }
  });
  return rows;
}

export function init(scope)
{
  initInner(scope);
  const tidy = document.querySelector(".tidy");
  const rows = [...document.querySelectorAll(".shelf")].flatMap(buildRows);
  if (!rows.length) {
    return;
  }
  const loose = new Set();

  // Only rows you can see are worked out, and only while something on them is moving.
  const io = new IntersectionObserver((seen) => {
    seen.forEach((e) => {
      const row = rows.find((r) => r.el === e.target);
      if (row) {
        row.seen = e.isIntersecting;
      }
    });
  }, { rootMargin: "120px 0px" });
  rows.forEach((row) => io.observe(row.el));

  // Fixed 60 Hz steps from the real time passed, so a 120 Hz screen doesn't run the boxes at double speed.
  let owed = 0;
  scope.ticker((time, dt) => {
    owed = Math.min(owed + dt, STEP * 3);
    const steps = Math.floor(owed / STEP);
    owed -= steps * STEP;
    if (!steps) {
      return;
    }
    rows.forEach((row) => {
      if (!row.seen || row.paused) {
        return;
      }
      const moving = row.boxes.filter((b) => !b.body.isSleeping);
      if (!moving.length) {
        return;
      }
      for (let i = 0; i < steps; i += 1) {
        Engine.update(row.eng, STEP);
      }
      row.boxes.forEach((b) => {
        if (!b.body.isSleeping || moving.includes(b)) {
          render(b);
        }
      });
    });
  });

  function loosen(b)
  {
    loose.add(b);
    b.el.classList.add("is-loose");
    if (tidy) {
      tidy.hidden = false;
    }
  }

  function up()
  {
    if (!drag) {
      return;
    }
    const { b, moved } = drag;
    drag = null;
    if (moved) {
      setTimeout(() => {
        delete b.el.dataset.dragged;
      }, 60);
    }
  }

  // Drag sideways to tip a box. A small wobble before that is still a click.
  let drag = null;
  rows.forEach((row) => {
    row.boxes.forEach((b) => {
      scope.on(b.el, "pointerdown", (e) => {
        if (e.button || row.paused) {
          return;
        }
        drag = { b, x0: e.clientX, y0: e.clientY, last: e.clientX, moved: false };
      });
    });
  });

  scope.on(window, "pointermove", (e) => {
    if (!drag) {
      return;
    }
    // Let go outside the window: the mouse comes back with no button down.
    if (e.pointerType === "mouse" && !(e.buttons & 1)) {
      up();
      return;
    }
    const { b } = drag;
    if (!drag.moved) {
      const dx = Math.abs(e.clientX - drag.x0);
      if (dx <= 7 || dx < Math.abs(e.clientY - drag.y0)) {
        return;
      }
      drag.moved = true;
      // The click that ends a drag is swallowed by boot.js, so letting go doesn't open the product.
      b.el.dataset.dragged = "1";
      loosen(b);
    }
    const d = e.clientX - drag.last;
    drag.last = e.clientX;
    Sleeping.set(b.body, false);
    Body.setAngularVelocity(b.body, gsap.utils.clamp(-0.07, 0.07, b.body.angularVelocity + d * 0.0016));
    Body.applyForce(b.body, { x: b.body.position.x, y: b.body.position.y - b.h * 0.4 }, { x: d * 0.0009 * b.body.mass * 0.05, y: 0 });
  }, { passive: true });

  scope.on(window, "pointerup", up);
  scope.on(window, "pointercancel", up);
  scope.on(window, "blur", up);

  function settle(b)
  {
    Body.setPosition(b.body, b.home);
    Body.setAngle(b.body, 0);
    Body.setVelocity(b.body, { x: 0, y: 0 });
    Body.setAngularVelocity(b.body, 0);
    Sleeping.set(b.body, true);
    b.el.style.transform = "";
  }

  // Stand them back up: the physics waits while each box glides home, then they all go back to sleep.
  if (tidy) {
    scope.on(tidy, "click", () => {
      tidy.hidden = true;
      loose.forEach((b) => b.el.classList.remove("is-loose"));
      loose.clear();
      rows.forEach((row) => {
        const off = row.boxes.filter(displaced);
        if (!off.length) {
          return;
        }
        row.paused = true;
        const tl = gsap.timeline({
          onComplete() {
            row.boxes.forEach(settle);
            row.paused = false;
          },
        });
        off.forEach((b) => {
          const s = { x: b.body.position.x, y: b.body.position.y, a: upright(b.body.angle) };
          tl.to(s, {
            x: b.home.x,
            y: b.home.y,
            a: 0,
            duration: 0.55,
            ease: "power3.inOut",
            onUpdate() {
              place(b, s.x, s.y, s.a);
            },
          }, 0);
        });
      });
    });
  }

  scope.cleanup(() => {
    io.disconnect();
    if (tidy) {
      tidy.hidden = true;
    }
    rows.forEach((row) => {
      row.boxes.forEach((b) => {
        b.el.style.transform = "";
        b.el.classList.remove("is-loose");
        delete b.el.dataset.dragged;
      });
      Engine.clear(row.eng);
    });
  });
}
