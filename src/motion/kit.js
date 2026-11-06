// The block kit: the logotype as toy blocks, small physics helpers, and the mascot.
import gsap from "gsap";
import Matter from "matter-js";
import { GLYPHS } from "./glyphs";
import { MorphBody, SHAPES, makeTrail } from "./shapes";

const { Bodies, Composite, Constraint, Engine, Sleeping } = Matter;

export const INK = "#070707";
export const PAPER = "#f3f1ec";
export const BLUE = "#4da3ff";
export const YELLOW = "#ffe100";

// The highest its feet may go: it stands below the nav, never over it.
export function navFloor(size)
{
  const nav = document.querySelector(".nav");
  const bottom = nav ? nav.getBoundingClientRect().bottom : 64;
  return bottom + size * 1.2;
}
export const RED = "#c8102e";
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const isPhone = () => matchMedia("(max-width: 720px)").matches;

// A resized copy from the image optimiser, for pictures made after the page loads.
export const sized = (src, w) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;

// ---------------------------------------------------------------- the logotype
export function glyphEl(ch, u)
{
  const g = GLYPHS[ch];
  const el = document.createElement("div");
  el.className = "blk";
  el.dataset.l = ch;
  el.style.width = `${g.w * u}px`;
  el.style.height = `${(g.bottom - g.top) * u}px`;
  el.innerHTML = `<svg viewBox="0 ${g.top} ${g.w} ${g.bottom - g.top}" width="100%" height="100%" aria-hidden="true"><rect class="hit" x="0" y="${g.top}" width="${g.w}" height="${g.bottom - g.top}"/><path d="${g.d}" fill="currentColor"/></svg>`;
  return el;
}

// The physical shape of a letter. The c rolls, the rest are blocks. The p's tail isn't solid, so it can rest on the floor.
export function glyphBody(ch, x, y, u, opts)
{
  const g = GLYPHS[ch];
  const o = { friction: 0.6, restitution: 0.22, frictionAir: 0.012, density: 0.0014, ...opts };
  const top = y - g.top * u; // y of the top of the x-height
  if (ch === "c") {
    return Bodies.circle(x + (g.w / 2) * u, top + 50 * u, 49 * u, o);
  }
  if (ch === "l") {
    return Bodies.rectangle(x + (g.w / 2) * u, y + ((g.bottom - g.top) / 2) * u, g.w * u, (g.bottom - g.top) * u, o);
  }
  return Bodies.rectangle(x + (g.w / 2) * u, top + 50 * u, g.w * u, 100 * u, o);
}

// ---------------------------------------------------------------- physics
export function makeWorld(opts = {})
{
  const engine = Engine.create({ enableSleeping: !!opts.sleep, gravity: { x: 0, y: opts.gravity || 1.15 } });
  const items = [];
  let on = true;
  let acc = 0;

  function render(it)
  {
    const b = it.body;
    it.el.style.transform = `translate(${b.position.x - it.com.x}px, ${b.position.y - it.com.y}px) rotate(${b.angle}rad)`;
    if (it.upright) {
      it.upright.style.transform = `rotate(${-b.angle}rad)`;
    }
  }

  function tick()
  {
    if (!on) {
      return;
    }
    acc += Math.min(gsap.ticker.deltaRatio(60), 4);
    let safety = 5;
    while (acc >= 1 && safety > 0) {
      Engine.update(engine, 1000 / 60);
      acc -= 1;
      safety -= 1;
    }
    items.forEach(render);
  }

  gsap.ticker.add(tick);
  return {
    engine,
    items,
    add(el, body, boxLeft, boxTop, upright)
    {
      const com = { x: body.position.x - boxLeft, y: body.position.y - boxTop };
      el.style.transformOrigin = `${com.x}px ${com.y}px`;
      const it = { el, body, com, upright };
      items.push(it);
      Composite.add(engine.world, body);
      render(it);
      return it;
    },
    solid(body)
    {
      Composite.add(engine.world, body);
    },
    walls(w, h)
    {
      const t = 400;
      const o = { isStatic: true, friction: 0.8 };
      const tall = h * 8;
      Composite.add(engine.world, [
        Bodies.rectangle(w / 2, h + t / 2, w + t * 2, t, o),
        Bodies.rectangle(-t / 2, h - tall / 2, t, tall, o),
        Bodies.rectangle(w + t / 2, h - tall / 2, t, tall, o),
      ]);
    },
    render,
    pause()
    {
      on = false;
    },
    resume()
    {
      on = true;
    },
    stop()
    {
      on = false;
      gsap.ticker.remove(tick);
      Engine.clear(engine);
    },
  };
}

// A block whose box is centred on its physics shape. The label stays upright while the block tumbles.
export function placeShape(world, el, x, y, w, h, body, upright)
{
  el.style.width = `${w}px`;
  el.style.height = `${h}px`;
  const bx = (body.bounds.min.x + body.bounds.max.x) / 2;
  const by = (body.bounds.min.y + body.bounds.max.y) / 2;
  return world.add(el, body, bx - w / 2, by - h / 2, upright);
}

// Grab with the pointer: a spring from the finger to the point you picked up, so throws just work.
// Returns a function that lets go and stops listening.
export function grabbable(world, it, toWorld, on = {})
{
  const el = it.grabEl || it.el;
  let release = null;

  const down = (e) => {
    if (e.button) {
      return;
    }
    if (on.allow && !on.allow()) {
      return;
    }
    const p = toWorld(e);
    const body = it.body;
    Sleeping.set(body, false);
    const c = Constraint.create({
      pointA: p,
      bodyB: body,
      pointB: { x: p.x - body.position.x, y: p.y - body.position.y },
      stiffness: 0.14,
      damping: 0.08,
      length: 0,
    });
    Composite.add(world.engine.world, c);
    let moved = 0;
    const start = { x: e.clientX, y: e.clientY };
    el.dataset.dragged = "";
    if (on.down) {
      on.down(it);
    }
    const move = (m) => {
      c.pointA = toWorld(m);
      Sleeping.set(body, false);
      moved = Math.max(moved, Math.hypot(m.clientX - start.x, m.clientY - start.y));
      if (moved > 7) {
        el.dataset.dragged = "1";
      }
    };
    const stopListening = () => {
      Composite.remove(world.engine.world, c);
      removeEventListener("pointermove", move);
      removeEventListener("pointerup", up);
      removeEventListener("pointercancel", up);
      release = null;
    };
    const up = (ev) => {
      stopListening();
      if (on.up) {
        on.up(it, moved, ev.type === "pointercancel");
      }
      // The click that ends a drag lands straight away. After that, a key press must still work.
      setTimeout(() => {
        el.dataset.dragged = "";
      }, 60);
    };
    release = stopListening;
    addEventListener("pointermove", move);
    addEventListener("pointerup", up);
    addEventListener("pointercancel", up);
  };

  el.addEventListener("pointerdown", down);
  return () => {
    el.removeEventListener("pointerdown", down);
    if (release) {
      release();
    }
  };
}

// ---------------------------------------------------------------- the mascot
// Shifter, the real dot from the i. One flat shape with two eyes, and its shape is its mood.
// It hops, talks, sulks, sleeps, and you can throw it. It lives across routes.
// It stays a solid circle: no squash, no stretch, no mood shapes. Its eyes do the talking.
// The one exception: hurt it and a bump swells out of its head, then goes down again.
const FACES = { hurt: "bump", dizzy: "bump2" };

export function makeDot()
{
  // Nothing the mascot starts may belong to a page's gsap context, or leaving the page would revert it.
  const free = gsap.context(() => {});
  const plain = (fn) => (...args) => {
    let out;
    free.ignore(() => {
      out = fn(...args);
    });
    return out;
  };

  const root = document.createElement("div");
  root.id = "dot";
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = '<span class="dot-st"><span class="dot-b"><span class="dot-sp"><span class="dot-eyes"><i></i><i></i></span></span></span></span><span class="dot-z"><i>z</i><i>z</i><i>z</i></span>';
  const say = document.createElement("div");
  say.id = "say";
  say.setAttribute("aria-hidden", "true");
  document.body.append(root, say);
  const body = root.querySelector(".dot-b");
  const spin = root.querySelector(".dot-sp");
  const eyes = root.querySelector(".dot-eyes");
  const eyeEls = root.querySelectorAll(".dot-eyes i");
  const outline = new MorphBody(spin);
  const trail = makeTrail();

  const s = { x: innerWidth * 0.9, y: -120, size: 72, side: "left" };
  let anchor = null;
  let hopT = null;
  let hopOpts = null;
  let flying = false;
  let sayCall = null;
  let pokeN = 0;
  let thrownN = 0;
  // free: follows its anchor. held: on your finger. air: thrown. back: sulking its way home.
  let mode = "free";
  let pending = null;
  let silent = false;
  let base = "";
  let asleep = false;
  let airT = 0;
  let turn = 0;
  let onFloor = false;
  let lastAct = 0;
  // Away: off this page entirely. It only lives on the home page, as the dot of the i.
  let away = false;
  const v = { x: 0, y: 0 };
  const POKES = ["I change. Your date doesn’t.", "Oi. Stop poking me. Start a project.", "I’m the dot on the i. Show some respect.", "Careful. I’m load-bearing.", "Still here. Still no project.", "That’s enough of that."];
  const THROWN = ["Rude.", "I bounce. Your deadline won’t.", "That’s going on your invoice.", "Again? Really?", "Fine. Walking back."];

  const anchorAt = { ax: 50, ay: 50, es: 1 };
  const paintAnchor = () => {
    root.style.setProperty("--ax", anchorAt.ax);
    root.style.setProperty("--ay", anchorAt.ay);
    root.style.setProperty("--es", Math.max(0.001, anchorAt.es));
  };

  // Turns into a shape, and its eyes slide over to where they sit on that shape.
  let current = "";
  const shape = plain((name, snap = false) => {
    if (name === current) {
      return;
    }
    current = name;
    const to = SHAPES[name];
    outline.to(to, snap);
    gsap.killTweensOf(anchorAt);
    if (snap) {
      [anchorAt.ax, anchorAt.ay] = to.eye;
      anchorAt.es = to.es;
      paintAnchor();
      return;
    }
    gsap.to(anchorAt, { ax: to.eye[0], ay: to.eye[1], es: to.es, duration: 0.35, ease: "power2.out", onUpdate: paintAnchor });
  });

  function face(name)
  {
    body.dataset.mood = name || "";
    shape(FACES[name] || "circle");
  }

  function mood(name)
  {
    base = name || "";
    if (!asleep && mode === "free") {
      face(base);
    }
  }

  function flash(name, seconds)
  {
    face(name);
    gsap.delayedCall(seconds, () => {
      if (!asleep && mode === "free") {
        face(base);
      }
    });
  }

  function wink()
  {
    gsap.timeline()
      .to(eyeEls[1], { scaleY: 0.08, duration: 0.12, ease: "sine.in" })
      .to(eyeEls[1], { scaleY: 1, duration: 0.2, ease: "sine.out" }, "+=0.4");
  }

  function place()
  {
    root.style.setProperty("--s", `${s.size}px`);
    root.style.transform = `translate(${s.x - s.size / 2}px, ${s.y - s.size}px)`;
    if (say.classList.contains("is-on")) {
      const w = say.offsetWidth;
      const h = say.offsetHeight;
      let left;
      let top;
      const toRight = s.x + s.size / 2 + 18;
      const toLeft = s.x - s.size / 2 - 18 - w;
      const fitsRight = toRight + w <= innerWidth - 10;
      const fitsLeft = toLeft >= 10;
      if (s.side === "under" && s.under) {
        left = innerWidth - w - 10;
        top = s.under();
      } else if (s.side === "above") {
        left = s.x - w / 2;
        top = s.y - s.size - h - 16;
      } else {
        left = (s.side === "right" ? fitsRight || !fitsLeft : !fitsLeft && fitsRight) ? toRight : toLeft;
        top = s.y - s.size / 2 - h / 2;
      }
      left = clamp(left, 10, innerWidth - w - 10);
      top = clamp(top, innerWidth <= 720 ? 62 : 70, innerHeight - h - 10);
      say.style.transform = `translate(${left}px, ${top}px) scale(var(--pop, 1))`;
      say.dataset.side = s.side;
      let tail = "none";
      if (s.side !== "under") {
        if (left >= s.x) {
          tail = "right";
        } else if (left + w <= s.x) {
          tail = "left";
        } else if (top + h <= s.y - s.size + 6) {
          tail = "below";
        }
      }
      say.dataset.tail = tail;
      say.style.setProperty("--tx", `${clamp(s.x - left - 7, 6, w - 20)}px`);
    }
  }

  function hit(axis)
  {
    gsap.killTweensOf(body);
    // A knock, not a squish: a small shove the way it bounced, away from the wall.
    const d = axis === "x" ? { x: Math.sign(v.x) * 4 } : { y: Math.sign(v.y) * 4 };
    gsap.fromTo(body, d, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
  }

  // Thrown: its own small physics, against the edges of the screen.
  function stepAir(dt)
  {
    const r = s.size / 2;
    const W = innerWidth;
    const H = innerHeight;
    airT += dt;
    v.y += 2600 * dt;
    s.x += v.x * dt;
    s.y += v.y * dt;
    turn += v.x * dt * 0.7;
    spin.style.transform = `rotate(${turn}deg)`;
    onFloor = false;
    if (s.x - r < 0) {
      s.x = r;
      v.x = -v.x * 0.64;
      hit("x");
    } else if (s.x + r > W) {
      s.x = W - r;
      v.x = -v.x * 0.64;
      hit("x");
    }
    if (s.y - s.size < 0 && v.y < 0) {
      s.y = s.size;
      v.y = -v.y * 0.5;
      hit("y");
    }
    if (s.y > H - 4) {
      s.y = H - 4;
      if (Math.abs(v.y) < 300) {
        v.y = 0;
        v.x *= 0.84;
        onFloor = true;
      } else {
        v.y = -v.y * 0.6;
        v.x *= 0.9;
        hit("y");
        if (airT > 0.5) {
          face("dizzy");
        }
      }
    }
    if ((onFloor && Math.abs(v.x) < 40) || airT > 3.4) {
      settleDown();
    }
  }

  function settleDown()
  {
    mode = "back";
    flying = true;
    turn = ((turn % 360) + 360) % 360;
    gsap.set(spin, { rotation: turn > 180 ? turn - 360 : turn });
    gsap.to(spin, { rotation: 0, duration: 0.6, ease: "sine.inOut" });
    turn = 0;
    face("dizzy");
    if (!silent) {
      talk(THROWN[thrownN % THROWN.length], { ms: 2000 });
      thrownN += 1;
    }
    gsap.delayedCall(1, walkBack);
  }

  // Walks along the floor until it's under where it should be, then hops up.
  function walkBack()
  {
    const to = anchor ? anchor() : { x: s.x, y: s.y };
    const x = clamp(to.x, s.size * 0.6, innerWidth - s.size * 0.6);
    const dur = clamp(Math.abs(x - s.x) / 540, 0, 1.2);
    face("hurt");
    const done = () => {
      root.classList.remove("is-walk");
      mode = "free";
      flying = false;
      face(base);
      const next = pending || {};
      pending = null;
      if (anchor) {
        hop(anchor, next);
      }
    };
    if (dur < 0.1) {
      done();
      return;
    }
    root.classList.add("is-walk");
    eyes.style.setProperty("--ex", `${Math.sign(x - s.x) * 0.1 * s.size}px`);
    gsap.to(s, { x, y: s.y - s.size * 0.18, duration: dur, ease: "sine.inOut", onComplete: done });
  }

  function stopHop()
  {
    if (hopT) {
      hopT.kill();
      hopT = null;
    }
    // An interrupted hop keeps its job, so a grab can't lose it.
    if (hopOpts) {
      pending = pending || hopOpts;
      hopOpts = null;
    }
  }

  function fling(vx, vy, opts = {})
  {
    if (mode === "held") {
      return;
    }
    stopHop();
    gsap.killTweensOf(body);
    gsap.set(body, { scaleX: 1, scaleY: 1, x: 0, y: 0 });
    silent = !!opts.silent;
    mode = "air";
    flying = true;
    airT = 0;
    onFloor = false;
    v.x = vx;
    v.y = vy;
    gsap.killTweensOf(spin);
    gsap.set(spin, { clearProps: "transform" });
    root.classList.remove("is-walk");
    face("wide");
  }

  shape("circle", true);

  let lastScroll = scrollY;
  let scrollV = 0;
  gsap.ticker.add((time, ms) => {
    // Hidden, it skips the per-frame work. It still keeps up with the scroll, and a throw still lands,
    // so it doesn't come back staring up or frozen mid-air.
    if (away) {
      lastScroll = scrollY;
      scrollV = 0;
      if (mode === "air") {
        stepAir(Math.min(ms, 40) / 1000);
      }
      return;
    }
    const dt = Math.min(ms, 40) / 1000;
    const was = { x: s.x, y: s.y };
    if (mode === "air") {
      stepAir(dt);
    } else if (mode === "free" && anchor && !flying) {
      // It floats after its spot rather than being bolted to it.
      const to = anchor();
      const f = 1 - Math.exp(-dt * 16);
      s.x = lerp(s.x, to.x, f);
      s.y = lerp(s.y, to.y, f);
    }
    outline.step(dt);
    trail.step(s.x, s.y - s.size / 2, s.size, mode === "air" && Math.hypot(s.x - was.x, s.y - was.y) / Math.max(dt, 0.001) > 260);
    // Its eyes look the way you scroll.
    const dy = scrollY - lastScroll;
    lastScroll = scrollY;
    scrollV += (dy - scrollV) * 0.06;
    if (mode === "free" && Math.abs(scrollV) > 3) {
      eyes.style.setProperty("--ey", `${Math.sign(scrollV) * 0.1 * s.size}px`);
    }
    // Falls asleep if you leave it alone.
    if (!asleep && mode === "free" && !flying && time - lastAct > 18) {
      asleep = true;
      quiet();
      face("sleep");
      root.classList.add("is-asleep");
    }
    place();
  });

  const wake = () => {
    lastAct = gsap.ticker.time;
    if (asleep) {
      asleep = false;
      root.classList.remove("is-asleep");
      flash("wide", 0.55);
      land();
    }
  };
  ["pointermove", "pointerdown", "keydown", "scroll"].forEach((n) => addEventListener(n, wake, { passive: true }));

  function land()
  {
    gsap.set(body, { scaleX: 1, scaleY: 1 });
  }

  // Jumps along an arc to wherever the anchor is now, squashing on take-off and landing.
  function hop(nextAnchor, opts = {})
  {
    anchor = nextAnchor;
    if (mode !== "free") {
      pending = opts;
      return;
    }
    if (hopT) {
      hopT.kill();
      gsap.set(spin, { rotation: 0 });
    }
    hopOpts = opts;
    const from = { x: s.x, y: s.y, size: s.size };
    const size = opts.size || s.size;
    const first = anchor();
    const dist = Math.hypot(first.x - from.x, first.y - from.y);
    const rise = opts.rise ?? clamp(dist * 0.3, 64, 220);
    const dur = opts.duration ?? clamp(0.38 + dist / 1800, 0.46, 0.82);
    const prog = { t: 0 };
    flying = true;
    gsap.killTweensOf(body);
    hopT = gsap.timeline({
      onComplete() {
        flying = false;
        hopOpts = null;
        land();
        if (opts.done) {
          opts.done();
        }
      },
    });
    // A jump cut off in mid air must not leave it floating above its spot.
    gsap.to(body, { y: 0, duration: 0.18, ease: "power2.out" });
    // A real jump along an arc, and the body stays a circle the whole way.
    hopT.to(prog, {
        t: 1,
        duration: dur,
        ease: "power1.inOut",
        onUpdate() {
          const to = anchor();
          s.x = lerp(from.x, to.x, prog.t);
          s.y = lerp(from.y, to.y, prog.t) - 4 * rise * prog.t * (1 - prog.t);
          s.size = lerp(from.size, size, prog.t);
        },
      });
  }

  function jump()
  {
    if (mode !== "free" || flying) {
      return;
    }
    gsap.timeline({ onComplete: land })
      .to(body, { y: -s.size * 0.75, duration: 0.24, ease: "power2.out" })
      .to(body, { y: 0, duration: 0.2, ease: "power2.in" });
  }

  let own = [YELLOW, INK];
  let onYellow = false;
  let looks = 0;

  function paintColour()
  {
    const [c, eye] = onYellow && own[0] === YELLOW ? [INK, YELLOW] : own;
    root.style.setProperty("--dot", c);
    root.style.setProperty("--eye", eye);
    trail.el.style.setProperty("--dot", c);
  }

  function colour(c, eye)
  {
    own = [c, eye || INK];
    paintColour();
  }

  // Yellow on yellow is just a pair of eyes, so it goes black over anything yellow.
  // Called every frame. Looks at what's behind its body five times a second.
  function keepVisible()
  {
    if (away) {
      return;
    }
    looks += 1;
    if (looks % 12 !== 0) {
      return;
    }
    const r = body.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    let found = false;
    if (r.width && x >= 0 && y >= 0 && x < innerWidth && y < innerHeight) {
      for (const el of document.elementsFromPoint(x, y)) {
        const bg = el.closest("#dot") ? "transparent" : getComputedStyle(el).backgroundColor;
        if (bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          found = bg === "rgb(255, 225, 0)";
          break;
        }
      }
    }
    if (found !== onYellow) {
      onYellow = found;
      paintColour();
    }
  }

  function talk(text, opts = {})
  {
    if (away) {
      return;
    }
    if (sayCall) {
      sayCall.kill();
    }
    s.side = opts.side || s.side;
    say.textContent = text;
    say.dataset.theme = opts.theme || "paper";
    say.classList.add("is-on");
    place();
    gsap.fromTo(say, { "--pop": 0.75, opacity: 0 }, { "--pop": 1, opacity: 1, duration: 0.32, ease: "power3.out" });
    if (opts.ms !== 0) {
      sayCall = gsap.delayedCall((opts.ms || 3800) / 1000, quiet);
    }
  }

  function quiet()
  {
    if (sayCall) {
      sayCall.kill();
      sayCall = null;
    }
    say.classList.remove("is-on");
  }

  function blink()
  {
    const f = body.dataset.mood;
    if (f !== "dizzy" && f !== "hurt" && f !== "sleep" && f !== "happy") {
      gsap.timeline()
        .to(eyeEls, { scaleY: 0.08, duration: 0.05 })
        .to(eyeEls, { scaleY: 1, duration: 0.08 }, "+=0.04");
    }
    gsap.delayedCall(3 + Math.random() * 3, blink);
  }
  gsap.delayedCall(2.5, blink);

  let lastMove = 0;
  (function glance()
  {
    if (performance.now() - lastMove > 3500 && mode === "free") {
      const a = Math.random() * Math.PI * 2;
      gsap.to(eyes, { "--ex": `${Math.cos(a) * 0.09 * s.size}px`, "--ey": `${Math.sin(a) * 0.05 * s.size}px`, duration: 0.3, ease: "power2.out" });
    }
    gsap.delayedCall(2.5 + Math.random() * 2.5, glance);
  }());

  addEventListener("pointermove", (e) => {
    lastMove = performance.now();
    if (mode !== "free") {
      return;
    }
    // A slow idle glance must not fight the cursor.
    gsap.killTweensOf(eyes);
    const dx = e.clientX - s.x;
    const dy = e.clientY - (s.y - s.size / 2);
    const d = Math.max(1, Math.hypot(dx, dy));
    const k = Math.min(1, d / 240);
    eyes.style.setProperty("--ex", `${(dx / d) * k * 0.13 * s.size}px`);
    eyes.style.setProperty("--ey", `${(dy / d) * k * 0.13 * s.size}px`);
  }, { passive: true });

  // Grab it and throw it. A press without a drag is still a poke.
  root.addEventListener("pointerdown", (e) => {
    if (e.button) {
      return;
    }
    const start = { x: e.clientX, y: e.clientY };
    let moved = 0;
    const trail = [];
    const move = (m) => {
      moved = Math.max(moved, Math.hypot(m.clientX - start.x, m.clientY - start.y));
      if (moved > 7 && mode !== "held") {
        stopHop();
        gsap.killTweensOf(s);
        mode = "held";
        flying = true;
        root.classList.remove("is-walk");
        document.documentElement.classList.add("is-grabbing");
        face("wide");
        talk("Oi. Put me down.", { ms: 1500 });
      }
      if (mode === "held") {
        s.x = m.clientX;
        s.y = m.clientY + s.size / 2;
        trail.push({ x: m.clientX, y: m.clientY, t: gsap.ticker.time });
        if (trail.length > 6) {
          trail.shift();
        }
      }
    };
    const up = () => {
      removeEventListener("pointermove", move);
      removeEventListener("pointerup", up);
      removeEventListener("pointercancel", up);
      if (mode !== "held") {
        return;
      }
      document.documentElement.classList.remove("is-grabbing");
      root.dataset.dragged = "1";
      const a = trail[0] || start;
      const b = trail[trail.length - 1] || start;
      const dt = Math.max(0.03, (b.t || 0) - (a.t || 0));
      mode = "free";
      fling(clamp((b.x - a.x) / dt, -3400, 3400), clamp((b.y - a.y) / dt, -3400, 3400));
    };
    addEventListener("pointermove", move);
    addEventListener("pointerup", up);
    addEventListener("pointercancel", up);
  });

  root.addEventListener("click", () => {
    if (root.dataset.dragged === "1") {
      root.dataset.dragged = "";
      return;
    }
    if (mode !== "free") {
      return;
    }
    jump();
    flash("hurt", 1.8);
    talk(POKES[pokeN % POKES.length], { ms: 2600 });
    pokeN += 1;
  });

  // Leaving a page: forget its jobs and anything it pointed at. Anywhere it should be is the page's call.
  function park(at)
  {
    if (hopT) {
      hopT.kill();
      hopT = null;
    }
    hopOpts = null;
    pending = null;
    flying = mode !== "free";
    anchor = at;
    quiet();
    base = "";
    if (mode === "free") {
      face("");
      gsap.set(spin, { rotation: 0 });
      gsap.killTweensOf(body);
      gsap.set(body, { scaleX: 1, scaleY: 1, x: 0, y: 0 });
    }
  }

  function hide(on)
  {
    away = on;
    root.style.visibility = on ? "hidden" : "";
    trail.el.style.visibility = on ? "hidden" : "";
    if (on) {
      quiet();
    }
  }

  return {
    state: s,
    el: root,
    hide,
    away: () => away,
    // Standing still on its spot: not mid-hop, held, thrown or walking home.
    settled: () => mode === "free" && !flying,
    hop: plain(hop),
    colour,
    keepVisible,
    talk: plain(talk),
    quiet,
    mood: plain(mood),
    shape,
    flash: plain(flash),
    wink: plain(wink),
    jump: plain(jump),
    fling: plain(fling),
    place,
    land: plain(land),
    park: plain(park),
  };
}
