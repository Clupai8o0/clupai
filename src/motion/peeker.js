// Bottom-left corner blob: peeks up, ducks on scroll and page changes, chat on the start form.
const NS = "http://www.w3.org/2000/svg";
const INK = "#070707";
const PAPER = "#f3f1ec";
const BLUE = "#4da3ff";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const spring = (x = 0) => ({ x, v: 0 });
const rand = (a, b) => a + Math.random() * (b - a);

function step(s, target, k, d, dt)
{
  s.v += ((target - s.x) * k - s.v * d) * dt;
  s.x += s.v * dt;
}

function mk(tag, attrs, parent, html)
{
  const n = html ? document.createElement(tag) : document.createElementNS(NS, tag);
  for (const k in attrs || {}) {
    n.setAttribute(k, attrs[k]);
  }
  if (parent) {
    parent.appendChild(n);
  }
  return n;
}

const A = (n, k, v) => n.setAttribute(k, v);

// Always the brand blue, on light pages and dark ones. The bubble still flips with the background (isDarkAt).
function skin()
{
  return { fill: BLUE, feat: INK, cheek: "#ff79b8", glint: true };
}

function isDarkAt(x, y)
{
  for (const n of document.elementsFromPoint(x, y)) {
    if (n.closest(".mv-stage, .mv-bubble") || n.id === "curtain") {
      continue;
    }
    if (/^(IMG|VIDEO|CANVAS)$/.test(n.tagName)) {
      return true;
    }
    const m = (getComputedStyle(n).backgroundColor.match(/[\d.]+/g) || []).map(Number);
    if (m.length >= 3 && (m.length < 4 || m[3] > 0.5)) {
      return 0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2] < 128;
    }
  }
  return false;
}

function makeBlob(parent, hit)
{
  const g = mk("g", { class: "mv-blob" }, parent);
  const legs = mk("g", { fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
  const b = {
    g, legs,
    legL: mk("path", {}, legs),
    legR: mk("path", {}, legs),
    body: mk("ellipse", { class: "mv-body" + (hit ? " mv-hit" : "") }, g),
  };
  const face = mk("g", {}, g);
  b.face = face;
  b.cheekL = mk("ellipse", {}, face);
  b.cheekR = mk("ellipse", {}, face);
  b.eyeL = mk("ellipse", {}, face);
  b.eyeR = mk("ellipse", {}, face);
  b.lidL = mk("path", { fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, face);
  b.lidR = mk("path", { fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, face);
  b.glintL = mk("circle", { fill: "#fff" }, face);
  b.glintR = mk("circle", { fill: "#fff" }, face);
  b.mouth = mk("path", { "stroke-linecap": "round", "stroke-linejoin": "round" }, face);
  return b;
}

function draw(b, P)
{
  const { cx, cy, rx, ry, r } = P;
  const th = P.th || 0;
  A(b.body, "cx", cx);
  A(b.body, "cy", cy);
  A(b.body, "rx", Math.max(0.1, rx));
  A(b.body, "ry", Math.max(0.1, ry));
  A(b.body, "transform", `rotate(${th} ${cx} ${cy})`);
  b.body.style.fill = P.fill;

  if (P.legs) {
    b.legs.style.display = "";
    A(b.legs, "stroke", P.legs.color || P.fill);
    A(b.legs, "stroke-width", P.legs.w);
    A(b.legL, "d", P.legs.l);
    A(b.legR, "d", P.legs.r);
  } else {
    b.legs.style.display = "none";
  }

  const look = P.look || { x: 0, y: 0 };
  const spread = r * 5.4 * (1 - Math.abs(look.x) * 0.1);
  const hw = spread / 2 + r * 3.0;
  const hh = r * 2.7;
  let lx = (P.fx || 0) * rx;
  let ly = (P.fy || 0) * ry;
  const kk = Math.hypot(lx / Math.max(1, rx - hw), ly / Math.max(1, ry - hh));
  if (kk > 1) {
    lx /= kk;
    ly /= kk;
  }
  const t = th * Math.PI / 180;
  const c = Math.cos(t);
  const s = Math.sin(t);
  const X = cx + lx * c - ly * s;
  const Y = cy + lx * s + ly * c;
  A(b.face, "transform", `rotate(${th + (P.tilt || 0)} ${X} ${Y})`);

  const mood = P.mood || "flat";
  const dots = mood === "flat" || mood === "smile" || mood === "o";
  const open = clamp(1 - (P.blink || 0), 0.1, 1);
  const ex = r * (open < 0.4 ? 1.2 : 0.92);
  const ey = r * 1.08 * open;
  const sh = look.x * r * 0.45;
  const exL = X - spread / 2 + sh;
  const exR = X + spread / 2 + sh;
  const eY = Y + look.y * r * 0.35;
  for (const [e, x] of [[b.eyeL, exL], [b.eyeR, exR]]) {
    A(e, "cx", x);
    A(e, "cy", eY);
    A(e, "rx", ex);
    A(e, "ry", ey);
    A(e, "fill", P.feat);
    A(e, "opacity", dots ? 1 : 0);
  }
  const lw = r * 1.15;
  let dl = "";
  let dr = "";
  if (mood === "sleep") {
    dl = `M ${exL - lw} ${eY} L ${exL + lw} ${eY}`;
    dr = `M ${exR - lw} ${eY} L ${exR + lw} ${eY}`;
  } else if (mood === "happy") {
    dl = `M ${exL - lw} ${eY + lw * 0.35} Q ${exL} ${eY - lw * 0.9} ${exL + lw} ${eY + lw * 0.35}`;
    dr = `M ${exR - lw} ${eY + lw * 0.35} Q ${exR} ${eY - lw * 0.9} ${exR + lw} ${eY + lw * 0.35}`;
  } else if (mood === "squint") {
    dl = `M ${exL - lw * 0.8} ${eY - lw} L ${exL + lw * 0.6} ${eY} L ${exL - lw * 0.8} ${eY + lw}`;
    dr = `M ${exR + lw * 0.8} ${eY - lw} L ${exR - lw * 0.6} ${eY} L ${exR + lw * 0.8} ${eY + lw}`;
  }
  for (const [p, d] of [[b.lidL, dl], [b.lidR, dr]]) {
    A(p, "d", d || "M 0 0");
    A(p, "stroke", P.feat);
    A(p, "stroke-width", r * 0.6);
    A(p, "opacity", dots ? 0 : 1);
  }
  const gOn = P.glint && dots && open > 0.55 && r >= 3.5 ? 0.9 : 0;
  for (const [gl, x] of [[b.glintL, exL], [b.glintR, exR]]) {
    A(gl, "cx", x - r * 0.3 + look.x * r * 0.15);
    A(gl, "cy", eY - r * 0.38);
    A(gl, "r", r * 0.3);
    A(gl, "opacity", gOn);
  }
  const blush = clamp(P.blush || 0, 0, 1);
  for (const [ch, x] of [[b.cheekL, exL - r * 1.2], [b.cheekR, exR + r * 1.2]]) {
    A(ch, "cx", x);
    A(ch, "cy", eY + r * 2.0);
    A(ch, "rx", r * 1.6);
    A(ch, "ry", r * 0.9);
    A(ch, "fill", P.cheek);
    A(ch, "opacity", blush * 0.6);
  }

  const mx = (exL + exR) / 2;
  const my = eY + r * 0.45;
  const mw = r * 1.5;
  let md;
  let fill = "none";
  if (mood === "o" || mood === "squint") {
    const o = r * (0.42 + clamp(P.mouthOpen == null ? 0.4 : P.mouthOpen, 0, 1.2) * 0.4);
    md = `M ${mx - o} ${my + o * 0.4} a ${o} ${o * 1.15} 0 1 0 ${o * 2} 0 a ${o} ${o * 1.15} 0 1 0 ${-o * 2} 0`;
    if (P.mouthFill) {
      fill = P.feat;
    }
  } else if (mood === "smile" || mood === "happy") {
    md = `M ${mx - mw * 0.55} ${my - r * 0.1} Q ${mx} ${my + r * 0.75} ${mx + mw * 0.55} ${my - r * 0.1}`;
  } else if (mood === "sleep") {
    md = `M ${mx - mw * 0.3} ${my + r * 0.2} L ${mx + mw * 0.3} ${my + r * 0.2}`;
  } else {
    md = `M ${mx - mw / 2} ${my} L ${mx + mw / 2} ${my}`;
  }
  A(b.mouth, "d", md);
  A(b.mouth, "fill", fill);
  A(b.mouth, "stroke", P.feat);
  A(b.mouth, "stroke-width", r * 0.52);
  return { faceX: X, faceY: Y };
}

function blinker()
{
  let next = performance.now() + rand(1200, 3500);
  let start = -1e9;
  return (now) => {
    if (now > next) {
      start = now;
      next = now + (Math.random() < 0.2 ? 280 : rand(2600, 5800));
    }
    const k = (now - start) / 150;
    return k >= 0 && k < 1 ? Math.sin(k * Math.PI) : 0;
  };
}

const FORM_TOPIC = [
  [/price|quote|writing/i, "in writing is the good kind ._."],
  [/budget|spend|cost/i, "no judgement here."],
  [/when|launch|deadline|date/i, "dates are kind of our thing."],
  [/team|developer|who/i, "teamwork ._."],
];
const FORM_FILL = ["take your time.", "no wrong answers.", "hmm, good one.", "ok ._.", "noted."];
const FORM_POKE = ["hi ._.", "you've got this.", "just watching ._.", "boop."];
const inForm = () => location.pathname.startsWith("/start") || !!document.querySelector(".f-count");

export function makePeeker()
{
  const mouse = { x: innerWidth / 2, y: innerHeight * 0.4, inside: false };
  let lastMove = performance.now();
  let lastScroll = -1e9;
  addEventListener("pointermove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.inside = true;
    lastMove = performance.now();
  }, { passive: true });
  document.documentElement.addEventListener("pointerleave", () => {
    mouse.inside = false;
  });
  addEventListener("scroll", () => {
    lastScroll = performance.now();
  }, { passive: true });

  function looker()
  {
    const lx = spring();
    const ly = spring();
    let gx = 0;
    let gy = 0;
    let nextGlance = 0;
    return (dt, now, ax, ay, reach) => {
      let tx;
      let ty;
      if (mouse.inside && now - lastMove < 3500) {
        tx = clamp((mouse.x - ax) / reach, -1, 1);
        ty = clamp((mouse.y - ay) / reach, -1, 1);
      } else {
        if (now > nextGlance) {
          gx = rand(-0.8, 0.8);
          gy = rand(-0.4, 0.3);
          nextGlance = now + rand(1400, 3200);
        }
        tx = gx;
        ty = gy;
      }
      step(lx, tx, 90, 14, dt);
      step(ly, ty, 90, 14, dt);
      return { x: lx.x, y: ly.x };
    };
  }

  const bubble = mk("div", { class: "mv-bubble", "aria-live": "polite" }, document.body, true);
  const talk = { pop: spring(0), until: 0, at: null };
  function say(text, ms = 2200)
  {
    bubble.textContent = text;
    talk.until = performance.now() + ms;
    talk.pop.v += 7;
  }
  function placeBubble(dt, now)
  {
    step(talk.pop, now < talk.until && talk.at ? 1 : 0, 170, 15, dt);
    const p = clamp(talk.pop.x, 0, 1.3);
    if (p < 0.01 || !talk.at) {
      bubble.style.opacity = 0;
      return;
    }
    bubble.classList.toggle("mv-inv", !!talk.at.dark);
    const side = !!talk.at.side;
    bubble.classList.toggle("mv-side", side);
    const bw = bubble.offsetWidth;
    const bh = bubble.offsetHeight;
    if (side) {
      const sx = clamp(talk.at.x, 10, innerWidth - bw - 10);
      const sy = clamp(talk.at.y - bh / 2, 64, innerHeight - bh - 8);
      bubble.style.opacity = Math.min(1, p);
      bubble.style.transform = `translate(${sx}px, ${sy}px) scale(${0.6 + p * 0.4})`;
      return;
    }
    const bx = clamp(talk.at.x - 26, 10, innerWidth - bw - 10);
    const by = clamp(talk.at.y - 14 - bh, 64, innerHeight - bh - 10);
    bubble.style.setProperty("--tx", `${clamp(talk.at.x - bx - 6, 12, bw - 24)}px`);
    bubble.style.opacity = Math.min(1, p);
    bubble.style.transform = `translate(${bx}px, ${by}px) scale(${0.6 + p * 0.4}) rotate(${(1 - Math.min(1, p)) * -5}deg)`;
  }

  const stage = mk("svg", { class: "mv-stage", "aria-hidden": "true" }, document.body);

  let away = true;
  let hidden = false;
  let ducking = false;
  let duckRaf = 0;
  let riseTimer = null;

  const corner = {
    b: null,
    blink: blinker(),
    look: looker(),
    vis: spring(0),
    hov: spring(0),
    sq: spring(0),
    dark: false,
    nextSample: 0,
    said: false,
    pokes: 0,
    form: { n: 0, m: 0, done: false, fill: 0, used: new Set(), smileUntil: 0, next: 0 },
    enter(now)
    {
      if (!this.b) {
        this.b = makeBlob(stage, true);
        this.b.body.classList.add("mv-point");
        this.b.body.addEventListener("pointerdown", (e) => {
          e.preventDefault();
          this.sq.v += 6;
          if (inForm()) {
            this.form.smileUntil = performance.now() + 1600;
            say(FORM_POKE[this.pokes++ % FORM_POKE.length], 1600);
            return;
          }
          const link = [...document.querySelectorAll("a, button")].find((a) => /build risk check/i.test(a.textContent));
          if (link) {
            setTimeout(() => link.click(), 220);
          } else {
            say("we couldn't find it ._.");
          }
        });
        document.addEventListener("pointerdown", (e) => {
          if (inForm() && e.target.closest && e.target.closest(".ans")) {
            this.sq.v += 5;
            this.form.smileUntil = performance.now() + 1300;
          }
        }, true);
      }
      this.b.g.style.display = "";
      this.vis.x = 0;
      this.enterAt = now;
      return true;
    },
    resetForm()
    {
      clearTimeout(this.sayT);
      this.form = { n: 0, m: 0, done: false, fill: 0, used: new Set(), smileUntil: 0, next: 0 };
    },
    sayLater(line, ms, delay)
    {
      clearTimeout(this.sayT);
      const fire = () => {
        if (away) {
          this.sayT = setTimeout(fire, 300);
        } else if (inForm()) {
          say(line, ms);
        }
      };
      this.sayT = setTimeout(fire, delay);
    },
    watchForm(now)
    {
      const F = this.form;
      if (now < F.next) {
        return;
      }
      F.next = now + 250;
      const c = document.querySelector(".f-count");
      const m = c && c.textContent.match(/(\d+)\s*of\s*(\d+)/);
      if (!m) {
        if (F.n && !F.done && inForm()) {
          F.done = true;
          this.sayLater("all done ._.", 2400, 600);
        }
        return;
      }
      const n = +m[1];
      const tot = +m[2];
      if (n === F.n) {
        return;
      }
      const back = n < F.n;
      F.n = n;
      F.m = tot;
      F.done = false;
      const q = (document.querySelector(".f-q") || {}).textContent || "";
      let line = null;
      if (back) {
        line = "changed your mind? fine by me.";
      } else if (n === 1) {
        line = "hi ._. i'll keep you company.";
      } else if (n === tot) {
        line = "last one ._.";
      } else if (n === Math.floor(tot / 2) + 1) {
        line = "halfway there.";
      } else {
        const hit = FORM_TOPIC.find(([re, l]) => re.test(q) && !F.used.has(l));
        if (hit) {
          line = hit[1];
          F.used.add(line);
        } else {
          line = FORM_FILL[F.fill++ % FORM_FILL.length];
        }
      }
      this.sayLater(line, 2300, 450);
    },
    frame(dt, now)
    {
      const vw = innerWidth;
      const vh = innerHeight;
      const form = inForm();
      if (form) {
        this.watchForm(now);
      }
      const rx = clamp(vw * 0.05, 46, 68);
      const ry = rx * 0.92;
      const cx = 26 + rx;
      const scrolling = now - lastScroll < 700 || now - this.enterAt < 500;
      const bodyTop = vh - this.vis.x;
      const over = mouse.inside && mouse.x < cx + rx + 10 && mouse.y > bodyTop - 16 && mouse.x > 0;
      step(this.hov, over && !scrolling && !away ? 1 : 0, 120, 15, dt);
      const target = away ? -ry * 0.35 : scrolling ? -6 : ry * lerp(0.82, 1.22, this.hov.x);
      step(this.vis, target, away ? 210 : scrolling ? 160 : 90, away ? 24 : scrolling ? 22 : 11, dt);
      step(this.sq, 0, 260, 12, dt);
      if (this.hov.x > 0.6 && !this.said && !form) {
        this.said = true;
        say("Try the Build Risk Check", 2600);
      }
      if (this.hov.x < 0.2) {
        this.said = false;
      }
      if (now > this.nextSample) {
        this.dark = isDarkAt(cx, vh - 10);
        this.nextSample = now + 300;
      }
      const cy = vh - this.vis.x + ry;
      const look = this.look(dt, now, cx, cy - ry * 0.4, 420);
      const k = skin(this.dark);
      const sq = this.sq.x * 0.08;
      const happy = this.hov.x > 0.5 || now < this.form.smileUntil;
      draw(this.b, {
        cx, cy, rx: rx * (1 + sq), ry: ry * (1 - sq), th: look.x * 4, ...k, r: rx * 0.085,
        fx: 0.08 + look.x * 0.3, fy: -0.5 + look.y * 0.15, look, blink: this.blink(now),
        mood: happy ? "smile" : "flat", blush: happy ? 1 : this.hov.x,
      });
      if (form) {
        return { x: cx + rx * 0.85 + 12, y: vh - Math.max(this.vis.x, 30) * 0.55, dark: this.dark, side: true };
      }
      return { x: cx, y: cy - ry, dark: this.dark };
    },
  };

  corner.enter(performance.now());

  let prev = performance.now();
  function frame(now)
  {
    const dt = Math.min((now - prev) / 1000, 1 / 30);
    prev = now;
    let at = null;
    if (!hidden && corner.b) {
      try {
        at = corner.frame(dt, now);
      } catch (err) {
        console.error("[peeker]", err);
      }
    }
    talk.at = at;
    placeBubble(dt, now);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  function quiet()
  {
    talk.until = 0;
  }

  return {
    ducking: () => ducking,
    duck(done)
    {
      if (hidden) {
        requestAnimationFrame(() => done());
        return;
      }
      // A rise still waiting from the last page must not bring it back up under the columns.
      if (riseTimer) {
        clearTimeout(riseTimer);
        riseTimer = null;
      }
      talk.until = 0;
      away = true;
      ducking = true;
      const start = performance.now();
      const wait = () => {
        if (corner.vis.x <= 1 || performance.now() - start >= 520) {
          cancelAnimationFrame(duckRaf);
          duckRaf = 0;
          ducking = false;
          done();
          return;
        }
        duckRaf = requestAnimationFrame(wait);
      };
      cancelAnimationFrame(duckRaf);
      duckRaf = requestAnimationFrame(wait);
    },
    rise(delayMs)
    {
      if (riseTimer) {
        clearTimeout(riseTimer);
      }
      riseTimer = setTimeout(() => {
        away = false;
        riseTimer = null;
      }, delayMs);
    },
    form(on)
    {
      const was = document.documentElement.classList.contains("mv-form");
      document.documentElement.classList.toggle("mv-form", on);
      if (on && !was) {
        corner.resetForm();
      }
    },
    hide(on)
    {
      hidden = on;
      stage.style.display = on ? "none" : "";
      bubble.style.display = on ? "none" : "";
      if (on) {
        quiet();
      }
    },
  };
}