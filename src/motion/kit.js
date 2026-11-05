// The block kit: the logotype as toy blocks, small physics helpers, and the mascot.
import gsap from "gsap";
import Matter from "matter-js";
import { GLYPHS } from "./glyphs";

const { Bodies, Composite, Constraint, Engine, Sleeping } = Matter;

export const INK = "#070707";
export const PAPER = "#f3f1ec";
export const BLUE = "#4da3ff";
export const YELLOW = "#ffe100";
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
// Long legs, the real dot from the i and the only round thing on the site.
// It hops, talks, sulks, sleeps, and you can throw it. It lives across routes.
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
  root.innerHTML = '<span class="dot-st"><span class="dot-b"><span class="dot-sp"><span class="dot-legs"><i></i><i></i></span><span class="dot-face"></span><span class="dot-eyes"><i></i><i></i></span><span class="dot-mouth"></span></span></span></span><span class="dot-z"><i>z</i><i>z</i><i>z</i></span>';
  const say = document.createElement("div");
  say.id = "say";
  say.setAttribute("aria-hidden", "true");
  document.body.append(root, say);
  const stretch = root.querySelector(".dot-st");
  const body = root.querySelector(".dot-b");
  const spin = root.querySelector(".dot-sp");
  const eyes = root.querySelector(".dot-eyes");
  const eyeEls = root.querySelectorAll(".dot-eyes i");

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
  const v = { x: 0, y: 0 };
  const POKES = ["Oi.", "Stop poking me. Start a project.", "I’m the dot on the i. Show some respect.", "Careful. I’m load-bearing.", "Still here. Still no project.", "That’s enough of that."];
  const THROWN = ["Rude.", "I bounce. Your deadline won’t.", "That’s going on your invoice.", "Again? Really?", "Fine. Walking back."];

  function face(name)
  {
    body.dataset.mood = name || "";
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
      .to(eyeEls[1], { scaleY: 0.08, duration: 0.06 })
      .to(eyeEls[1], { scaleY: 1, duration: 0.09 }, "+=0.34");
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
        top = s.y - s.size - h - 16 - s.size * 0.62;
      } else {
        left = (s.side === "right" ? fitsRight || !fitsLeft : !fitsLeft && fitsRight) ? toRight : toLeft;
        top = s.y - s.size / 2 - h / 2 - s.size * 0.1;
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
    gsap.fromTo(body, axis === "x" ? { scaleX: 0.62, scaleY: 1.24 } : { scaleX: 1.34, scaleY: 0.6 }, { scaleX: 1, scaleY: 1, duration: 0.42, ease: "elastic.out(1, 0.45)" });
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
    root.classList.remove("is-air");
    flying = true;
    turn = ((turn % 360) + 360) % 360;
    gsap.set(spin, { rotation: turn > 180 ? turn - 360 : turn });
    gsap.to(spin, { rotation: 0, duration: 0.3, ease: "power2.out" });
    turn = 0;
    face("dizzy");
    if (!silent) {
      talk(THROWN[thrownN % THROWN.length], { ms: 2000 });
      thrownN += 1;
    }
    gsap.delayedCall(1.1, walkBack);
  }

  // Walks along the floor until it's under where it should be, then hops up.
  function walkBack()
  {
    const to = anchor ? anchor() : { x: s.x, y: s.y };
    const x = clamp(to.x, s.size * 0.6, innerWidth - s.size * 0.6);
    const dur = clamp(Math.abs(x - s.x) / 620, 0, 1);
    face("annoyed");
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
    gsap.to(s, { x, y: s.y - s.size * 0.18, duration: dur, ease: "none", onComplete: done });
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
    gsap.set(body, { scaleX: 1, scaleY: 1, y: 0 });
    silent = !!opts.silent;
    mode = "air";
    flying = true;
    airT = 0;
    onFloor = false;
    v.x = vx;
    v.y = vy;
    gsap.killTweensOf(spin);
    gsap.set(spin, { clearProps: "transform" });
    root.classList.add("is-air");
    root.classList.remove("is-walk");
    face("wide");
  }

  let lastScroll = scrollY;
  let scrollV = 0;
  gsap.ticker.add((time, ms) => {
    const dt = Math.min(ms, 40) / 1000;
    if (mode === "air") {
      stepAir(dt);
    } else if (mode === "free" && anchor && !flying) {
      const to = anchor();
      s.x = lerp(s.x, to.x, 0.4);
      s.y = lerp(s.y, to.y, 0.4);
    }
    // Stretches when you scroll fast.
    const dy = scrollY - lastScroll;
    lastScroll = scrollY;
    scrollV += (dy - scrollV) * 0.2;
    const k = mode === "free" && !flying ? clamp(Math.abs(scrollV) / 70, 0, 0.34) : 0;
    stretch.style.transform = `scale(${1 - k * 0.55}, ${1 + k})`;
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
    root.classList.remove("is-air");
    gsap.fromTo(body, { scaleX: 1.34, scaleY: 0.62 }, { scaleX: 1, scaleY: 1, duration: 0.65, ease: "elastic.out(1.1, 0.42)" });
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
    const rise = opts.rise ?? clamp(dist * 0.32, 70, 240);
    const dur = opts.duration ?? clamp(0.34 + dist / 1900, 0.42, 0.8);
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
    hopT.to(body, { scaleX: 1.22, scaleY: 0.72, duration: 0.09, ease: "power2.out" })
      .add(() => root.classList.add("is-air"))
      .to(body, { scaleX: 0.86, scaleY: 1.18, duration: 0.11, ease: "power2.out" })
      .to(prog, {
        t: 1,
        duration: dur,
        ease: "none",
        onUpdate() {
          const to = anchor();
          s.x = lerp(from.x, to.x, prog.t);
          s.y = lerp(from.y, to.y, prog.t) - 4 * rise * prog.t * (1 - prog.t);
          s.size = lerp(from.size, size, prog.t);
        },
      }, 0.1);
    // A long jump gets a flip.
    if (dist > 620) {
      hopT.fromTo(spin, { rotation: 0 }, { rotation: first.x > from.x ? 360 : -360, duration: dur, ease: "power1.inOut" }, 0.1);
    }
  }

  function jump()
  {
    if (mode !== "free" || flying) {
      return;
    }
    root.classList.add("is-air");
    gsap.timeline({ onComplete: land })
      .to(body, { y: -s.size * 0.7, scaleX: 0.88, scaleY: 1.14, duration: 0.2, ease: "power2.out" })
      .to(body, { y: 0, scaleX: 1, scaleY: 1, duration: 0.18, ease: "power2.in" });
  }

  function colour(c, eye)
  {
    root.style.setProperty("--dot", c);
    root.style.setProperty("--eye", eye || INK);
  }

  function talk(text, opts = {})
  {
    if (sayCall) {
      sayCall.kill();
    }
    s.side = opts.side || s.side;
    say.textContent = text;
    say.dataset.theme = opts.theme || "paper";
    say.classList.add("is-on");
    root.classList.add("is-talk");
    place();
    gsap.fromTo(say, { "--pop": 0.7, opacity: 0 }, { "--pop": 1, opacity: 1, duration: 0.32, ease: "back.out(2.6)" });
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
    root.classList.remove("is-talk");
  }

  function blink()
  {
    const f = body.dataset.mood;
    if (f !== "dizzy" && f !== "sleep" && f !== "happy") {
      gsap.timeline()
        .to(eyeEls, { scaleY: 0.08, duration: 0.05 })
        .to(eyeEls, { scaleY: 1, duration: 0.07 }, "+=0.05");
    }
    gsap.delayedCall(2.4 + Math.random() * 2.6, blink);
  }
  gsap.delayedCall(2.5, blink);

  let lastMove = 0;
  (function glance()
  {
    if (performance.now() - lastMove > 2600 && mode === "free") {
      const a = Math.random() * Math.PI * 2;
      gsap.to(eyes, { "--ex": `${Math.cos(a) * 0.1 * s.size}px`, "--ey": `${Math.sin(a) * 0.06 * s.size}px`, duration: 0.18 });
    }
    gsap.delayedCall(1.6 + Math.random() * 1.8, glance);
  }());

  addEventListener("pointermove", (e) => {
    lastMove = performance.now();
    if (mode !== "free") {
      return;
    }
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
        root.classList.add("is-air");
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
    flash("annoyed", 1);
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
      root.classList.remove("is-air");
      gsap.set(spin, { rotation: 0 });
      gsap.killTweensOf(body);
      gsap.set(body, { scaleX: 1, scaleY: 1, y: 0 });
    }
  }

  return {
    state: s,
    el: root,
    hop: plain(hop),
    colour,
    talk: plain(talk),
    quiet,
    mood,
    flash: plain(flash),
    wink: plain(wink),
    jump: plain(jump),
    fling: plain(fling),
    place,
    land: plain(land),
    park: plain(park),
  };
}
