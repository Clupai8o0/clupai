// The home page, moving. Every word is already in the server's HTML: this only stages it.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Matter from "matter-js";
import { GLYPHS, SPACE, TITTLE } from "./glyphs";
import { BLUE, INK, YELLOW, clamp, glyphBody, glyphEl, grabbable, isPhone, makeWorld, navFloor, placeShape, sized } from "./kit";
import { buildHow } from "./tower";
import { scramble, seeded, splitLetters } from "./text";

const { Bodies, Body } = Matter;
const qs = (s, r = document) => r.querySelector(s);
const qa = (s, r = document) => [...r.querySelectorAll(s)];
const vw = () => innerWidth;
const vh = () => innerHeight;
const widthOf = (word) => [...word].reduce((sum, ch) => sum + GLYPHS[ch].w, 0);
const grabbing = (on) => document.documentElement.classList.toggle("is-grabbing", on);

const TILES = [
  "/work/kdg/new/hero.webp", "/work/hoddle/new/home.webp", "/work/krishnaveni/homepage.webp", "/products/tempo/dashboard.webp",
  "/products/tempo/session.webp", "/work/kdg/gallery.webp", "/work/nmmun/homepage.webp", "/work/hoddle/new/matching.webp",
  "/work/tapcraft/new/desktop.webp", "/work/krishnaveni/contact.webp", "/products/cstack/cover.webp", "/products/force/preview.webp",
  "/work/kdg/new/estimate-options.webp", "/products/force/desktop.webp",
];

// A film loads when it's nearly on screen, and only plays while it's showing. Save-Data keeps the still.
function filmPlayer(v, loadAt, from, to)
{
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  let loaded = false;
  let playing = false;
  return (t) => {
    if (saveData) {
      return;
    }
    if (!loaded && t > loadAt) {
      loaded = true;
      v.poster = v.dataset.poster;
      v.src = v.dataset.src;
    }
    const on = t > from && t < to;
    if (loaded && on !== playing) {
      playing = on;
      if (on) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    }
  };
}

function unloadFilm(v)
{
  v.pause();
  v.removeAttribute("src");
  v.removeAttribute("poster");
  v.load();
}

// ---------------------------------------------------------------- the hero and the client chapters
const PAPER = "#f3f1ec";
// On a phone the label goes under the word, in this much room.
const PHONE_LABEL = 60;

// Where each letter of the word sits, in glyph units: the x-height is 100 and the baseline is y = 100.
// One line everywhere, phones included.
function wordLayout()
{
  const letters = [];
  let x = 0;
  [..."clupai"].forEach((ch) => {
    letters.push({ ch, x, y: 0 });
    x += GLYPHS[ch].w + SPACE;
  });
  return { letters, width: x - SPACE, top: GLYPHS.l.top, bottom: GLYPHS.p.bottom };
}

function buildStage(scope, dot, phone)
{
  const stage = qs(".stage");
  const nav = qs(".nav");
  const sw = vw();
  const sh = stage.offsetHeight;
  const stageRect = stage.getBoundingClientRect();

  // ------------------------------------------------------------ the word: holes in the paper, onto our apps
  const W = wordLayout();
  const marginX = phone ? 12 : sw * 0.02;
  const below = phone ? 12 : Math.max(18, sw * 0.016);
  // The word is as wide as the screen allows, as long as it stays clear of the copy above it: on a desktop the
  // l and the label under the headline, the mascot on the i under the column on the right.
  const under = (sel) => qs(sel).getBoundingClientRect().bottom - stageRect.top;
  const room = sh - below;
  const fitW = (sw - 2 * marginX) / W.width;
  // A phone always gets the word at full width, on one line.
  const fitH = phone
    ? fitW
    : Math.min(
      (room - under(".hero-top h1") - 24) / (W.bottom - W.top),
      (room - under(".hero-top h1") - 12 - 85) / (W.bottom + 8),
      (room - under(".hero-sub") - 12) / (W.bottom + 46),
    );
  const s0 = Math.max(Math.min(fitW, fitH), fitW * 0.35);
  const x0 = marginX;
  const y0 = sh - below - (phone ? PHONE_LABEL : 0) - W.bottom * s0;

  const wordEl = qs("#wordmark");
  const holePaths = W.letters.map((l) => `<g transform="translate(${l.x} ${l.y})"><path d="${GLYPHS[l.ch].d}"/></g>`).join("");
  wordEl.innerHTML = `<svg width="${sw}" height="${sh}" viewBox="0 0 ${sw} ${sh}" aria-hidden="true"><defs>`
    + `<mask id="word-holes" maskUnits="userSpaceOnUse" x="0" y="0" width="${sw}" height="${sh}">`
    + `<rect width="${sw}" height="${sh}" fill="#fff"/><g class="holes" fill="#000">${holePaths}</g></mask></defs>`
    + `<rect width="${sw}" height="${sh}" fill="${PAPER}" mask="url(#word-holes)"/></svg>`;
  const holes = qs(".holes", wordEl);
  const letterEls = qa(".holes path", wordEl);
  scope.cleanup(() => {
    wordEl.textContent = "";
    // The toys and the end tiles can still be grabbed, so a release outside the window can't leave the class behind.
    grabbing(false);
  });

  // On scroll the word grows around the stem of the l, and the stem comes to the middle, until it's the whole screen.
  const L = W.letters[1];
  const pivot = { x: L.x + GLYPHS.l.w / 2, y: (GLYPHS.l.top + GLYPHS.l.bottom) / 2 };
  const sEnd = Math.max(s0 * 30, 1.2 * Math.max(sw / GLYPHS.l.w, sh / (GLYPHS.l.bottom - GLYPHS.l.top)));
  const grow = gsap.parseEase("power2.inOut");
  const glide = gsap.parseEase("power2.out");
  const view = { S: s0, x: x0, y: y0 };
  const zoom = { k: 0 };
  let fitFilm = () => {};
  const place = () => {
    const S = s0 * Math.pow(sEnd / s0, grow(zoom.k));
    const g = glide(Math.min(1, zoom.k * 1.4));
    const px = x0 + pivot.x * s0;
    const py = y0 + pivot.y * s0;
    view.S = S;
    view.x = px + (sw / 2 - px) * g - pivot.x * S;
    view.y = py + (sh / 2 - py) * g - pivot.y * S;
    holes.setAttribute("transform", `translate(${view.x} ${view.y}) scale(${S})`);
    fitFilm();
  };
  place();

  // The letters rise into place one by one, solid, with no stretch and no bounce.
  gsap.from(letterEls, { y: 70, opacity: 0, duration: 0.8, delay: 0.2, stagger: 0.06, ease: "power4.out" });

  // The mascot stands on the i, wherever the word has grown to.
  const I = W.letters[5];
  const iX = I.x + GLYPHS.i.w / 2;
  const tittle = Math.max(TITTLE.size * s0 * 1.15, 40);
  const onI = () => ({ x: view.x + iX * view.S, y: view.y + (I.y - 14) * view.S });
  // On a phone the mascot's line goes above it, clear of the l, when there's room under the copy for it.
  const lineSide = phone && onI().y - tittle - 16 - 64 > under(".hero-top") ? "above" : "left";

  // ------------------------------------------------------------ what's showing through the word
  // The pictures fill the word's box, a little bigger so a letter's overshoot never runs past the edge.
  const film = qs("#film");
  // On scroll the box opens out to the screen, and never lags behind the letters, so no letter shows paper.
  const wordBox = ({ S, x, y }) => ({ l: x - 4 * S, t: y + (W.top - 18) * S, r: x + (W.width + 4) * S, b: y + (W.bottom + 4) * S });
  const box = wordBox(view);
  fitFilm = () => {
    const w = wordBox(view);
    const l = Math.min(box.l, Math.max(0, w.l));
    const t = Math.min(box.t, Math.max(0, w.t));
    const r = Math.max(box.r, Math.min(sw, w.r));
    const b = Math.max(box.b, Math.min(sh, w.b));
    gsap.set(film, { left: l, top: t, width: r - l, height: b - t });
  };
  fitFilm();
  const win = (() => {
    const r = qs("#win-hoddle").getBoundingClientRect();
    return { left: r.left - stageRect.left, top: r.top - stageRect.top, width: r.width, height: r.height };
  })();
  const fills = qa(".fill", film);
  const homeCuts = qa(".cut-home", film);
  const now = qs("#now");
  const nowName = qs(".now-name", now);
  const nowWhat = qs(".now-what", now);
  const ticks = qa(".now-ticks i", now);
  // Its label sits over the c, beside the l. On a phone it's under the word.
  now.style.setProperty("--wu", `${s0}px`);
  if (phone) {
    gsap.set(now, { left: x0, bottom: below, width: W.width * s0 * 0.75 });
  } else {
    gsap.set(now, { left: x0, bottom: sh - (y0 - 8 * s0), width: (L.x - 10) * s0 });
  }
  let fillAt = -1;
  const showFill = (i) => {
    if (i === fillAt) {
      return;
    }
    const first = fillAt < 0;
    fillAt = i;
    fills.forEach((f, n) => f.classList.toggle("is-on", n === i));
    ticks.forEach((t, n) => t.classList.toggle("is-on", n === i));
    nowName.textContent = fills[i].dataset.name;
    nowWhat.textContent = fills[i].dataset.what;
    if (!first) {
      gsap.fromTo([nowName, nowWhat], { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out", overwrite: true });
    }
  };
  showFill(0);
  // The label comes in once the letters have opened. Its children, so the scroll timeline keeps the label itself.
  gsap.from(now.children, { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.06, delay: 0.75, ease: "power3.out" });
  // A slow change, not a flicker. Once you scroll it holds on the first app, which is the chapter coming up.
  let cutLock = false;
  gsap.to({}, {
    duration: 2.6,
    repeat: -1,
    onRepeat() {
      if (!cutLock) {
        showFill((fillAt + 1) % fills.length);
      }
    },
  });
  scope.cleanup(() => {
    fills.forEach((f) => f.classList.remove("is-on"));
    film.classList.remove("is-held");
    ticks.forEach((t) => t.classList.remove("is-on"));
    nowName.textContent = fills[0].dataset.name;
    nowWhat.textContent = fills[0].dataset.what;
    now.style.removeProperty("--wu");
  });

  // ------------------------------------------------------------ names, as letters in a mask
  const nameLetters = (el) => {
    scope.cleanup(splitLetters(el));
    return el.querySelectorAll(".lc");
  };
  const hdL = nameLetters(qs(".hd-name"));
  const kdL = nameLetters(qs(".kd-name"));
  const scL = nameLetters(qs(".sc-name"));

  // ------------------------------------------------------------ the scrubbed stage
  gsap.set(hdL, { yPercent: 130 });
  gsap.set(kdL, { yPercent: 130 });
  gsap.set(scL, { yPercent: 130 });
  gsap.set("#t-hoddle .what, #t-hoddle .fact, #t-hoddle .quote", { autoAlpha: 0, y: 26 });
  gsap.set(".ch-hoddle", { autoAlpha: 0 });

  // The next chapter wipes up over the last one, and the one after opens out from a circle.
  const chK = qs("#ch-kdg");
  const chS = qs("#ch-school");
  gsap.set(chK, { clipPath: "inset(100% 0% 0% 0%)" });
  gsap.set(chS, { clipPath: "circle(0% at 70% 100%)" });
  scope.cleanup(() => {
    chK.style.clipPath = "";
    chS.style.clipPath = "";
  });

  const hoddleFilm = qs("#v-hoddle");
  const kdgFilm = qs("#v-kdg");
  const playHoddle = filmPlayer(hoddleFilm, 1.5, 2.3, 4.4);
  const playKdg = filmPlayer(kdgFilm, 3, 3.4, 6.05);
  const kdVal = qs("#kd-val");
  kdVal.textContent = "75";
  scope.cleanup(() => {
    kdVal.textContent = "99";
    unloadFilm(hoddleFilm);
    unloadFilm(kdgFilm);
    nav.classList.remove("has-btn");
  });

  // The nav takes the next chapter's colours when that chapter's edge reaches the logo, not when the wipe starts.
  const timeFor = (ease, p) => {
    const e = gsap.parseEase(ease);
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 24; i++) {
      const m = (lo + hi) / 2;
      if (e(m) < p) {
        lo = m;
      } else {
        hi = m;
      }
    }
    return hi;
  };
  const logo = qs(".nav-logo");
  const logoX = logo.offsetLeft + logo.offsetWidth / 2;
  const logoY = nav.offsetHeight / 2;
  const kdgNavAt = 3.5 + 0.85 * timeFor("power3.inOut", 1 - logoY / sh);
  const reach = Math.hypot(sw * 0.7 - logoX, sh - logoY) / (Math.hypot(sw, sh) / Math.SQRT2);
  const schoolNavAt = 5.2 + timeFor("power2.inOut", Math.min(1, reach / 1.45));
  // Ink on the paper hero, then each chapter's own. The nav themes read this while the stage is under the nav.
  const NAV = [[INK, PAPER], ["#ffffff", "#06183a"], ["#050505", "#ffe100"], ["#ffffff", "#c8102e"]];
  const navAt = (t) => NAV[t < 2.2 ? 0 : t < kdgNavAt ? 1 : t < schoolNavAt ? 2 : 3];
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: stage,
      pin: true,
      anticipatePin: 1,
      start: "top top",
      end: () => `+=${vh() * 4.4}`,
      scrub: true,
      onUpdate(self) {
        nav.classList.toggle("has-btn", self.progress > 0.015);
        const lock = self.progress > 0.003;
        if (lock !== cutLock) {
          cutLock = lock;
          // Held on Hoddle for the chapter, so the change to it is quick.
          film.classList.toggle("is-held", lock);
          if (lock) {
            showFill(0);
          }
        }
        const t = self.progress * tl.duration();
        playHoddle(t);
        playKdg(t);
      },
    },
  });
  // The word grows until the l's stem is the screen, the box behind it opens out to full screen,
  // and Hoddle's own home page comes up through the stem. Then it's Hoddle's chapter.
  tl.to(".hero-top", { y: -sh * 0.34, autoAlpha: 0, duration: 0.55, ease: "power2.in" }, 0)
    .to(now, { y: -24, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 0)
    .to(zoom, { k: 1, duration: 1.4, onUpdate: place }, 0)
    .to(box, { l: 0, t: 0, r: sw, b: sh, duration: 1.12, ease: "power2.out", onUpdate: fitFilm }, 0)
    .fromTo(homeCuts, { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0.59)
    .to(nav, { yPercent: -100, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 0.5)
    .set(".ch-hoddle", { autoAlpha: 1 }, 1.45)
    .set(wordEl, { autoAlpha: 0 }, 1.45)
    .to(film, { ...win, duration: 0.9, ease: "power3.inOut" }, 1.95)
    .to(hoddleFilm, { opacity: 1, duration: 0.3 }, 2.45)
    .to(nav, { yPercent: 0, autoAlpha: 1, duration: 0.25, ease: "power2.out" }, 2.25)
    .to(hdL, { yPercent: 0, duration: 0.7, stagger: 0.035, ease: "back.out(1.5)" }, 2.2)
    .to("#t-hoddle .what", { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 2.5)
    .to("#t-hoddle .fact", { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" }, 2.55)
    .to("#t-hoddle .quote", { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 2.65)
    .to(chK, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "power3.inOut" }, 3.5)
    .from(".kd-film", { yPercent: 24, duration: 0.95, ease: "power3.out" }, 3.5)
    .to(kdL, { yPercent: 0, duration: 0.7, stagger: 0.016, ease: "back.out(1.5)" }, 3.75)
    .from(".kd-num, .kd-side", { autoAlpha: 0, y: 26, duration: 0.45, stagger: 0.08, ease: "power2.out" }, 4.05)
    .to({ v: 75 }, {
      v: 99,
      duration: 0.8,
      ease: "power1.inOut",
      onUpdate() {
        kdVal.textContent = String(Math.round(this.targets()[0].v));
      },
    }, 4.2)
    .to(chS, { clipPath: "circle(145% at 70% 100%)", duration: 1, ease: "power2.inOut" }, 5.2)
    .fromTo("#sc-pic > *", { scale: 1.22 }, { scale: 1, duration: 1.4, ease: "power2.out" }, 5.2)
    .to(scL, { yPercent: 0, duration: 0.7, stagger: 0.018, ease: "back.out(1.5)" }, 5.5)
    .from(".sc-copy", { autoAlpha: 0, y: 26, duration: 0.45, ease: "power2.out" }, 5.8)
    .to({}, { duration: 0.4 }, 6.2);

  return { tl, tittle, onI, navAt, lineSide };
}

// ---------------------------------------------------------------- the promise, filling in word by word
function buildPromise()
{
  const fw = qa("#promise-t .fw");
  gsap.set(".chip-bg", { scaleX: 0, transformOrigin: "0% 50%" });
  const promiseTl = gsap.timeline({
    scrollTrigger: { trigger: "#promise", pin: true, start: "top top", end: () => `+=${vh() * 1.25}`, scrub: true },
  });
  fw.forEach((w, i) => {
    const onYellow = !!w.closest(".c-y");
    promiseTl.to(w, { color: onYellow ? "#070707" : "#f3f1ec", duration: 0.14, ease: "none" }, i * 0.08);
  });
  promiseTl.fromTo(".soft-promise", { opacity: 0 }, { opacity: 1, duration: 1.05, ease: "power1.in" }, 0);
  promiseTl.fromTo(".soft-promise img", { scale: 1.16 }, { scale: 1, duration: 1.3, ease: "none" }, 0);
  promiseTl.to(".c-y .chip-bg", { scaleX: 1, rotation: -2, duration: 0.14, ease: "back.out(1.8)" }, 0.4);
  promiseTl.fromTo("#chip-stop", { scale: 1.5, rotation: -8 }, { scale: 1, rotation: -2, duration: 0.14, ease: "back.out(3)" }, 0.8);
  promiseTl.to(".c-r .chip-bg", { scaleX: 1, duration: 0.04 }, 0.8);
  promiseTl.from(".promise-end", { autoAlpha: 0, y: 18, duration: 0.14 }, 0.96);
  promiseTl.to({}, { duration: 0.2 }, 1.1);
  return promiseTl;
}

// ---------------------------------------------------------------- the first question, as things you can pick up
function buildToys(scope, phone)
{
  const toyW = scope.world(makeWorld({ gravity: 1.5 }));
  toyW.pause();
  const ask = qs("#ask");
  const askH = ask.offsetHeight;
  const askW = ask.offsetWidth;
  toyW.walls(askW, askH);
  const scale = phone ? 0.0245 * askW : 0.0098 * askW;
  const firm = { restitution: 0.22, friction: 0.7, density: 0.0016 };
  const slab = (x, y, w, h) => Bodies.rectangle(x, y, w, h, firm);
  const SHAPES = [
    { w: 26, h: 26, make: (x, y, w, h) => Body.create({ parts: [Bodies.rectangle(x - w / 4, y, w / 2, h), Bodies.rectangle(x + w / 4, y + h * 0.225, w / 2, h * 0.55)], ...firm }) },
    { w: 30, h: 26, make: (x, y, w, h) => Bodies.fromVertices(x, y, [[{ x: 0, y: -(h * 2) / 3 }, { x: w / 2, y: h / 3 }, { x: -w / 2, y: h / 3 }]], firm) },
    { w: 20, h: 20, make: slab },
    { w: 27, h: 10, make: slab },
  ];
  const size = phone ? 0.72 : 1;
  const toys = qa(".toy", ask).map((el, i) => {
    const t = SHAPES[i];
    const w = t.w * scale * size;
    const h = t.h * scale * size;
    const x = askW * (phone ? [0.28, 0.72, 0.3, 0.7][i] : 0.13 + i * 0.245);
    const y = -h - i * h * 0.7 - 60;
    const body = t.make(x, y, w, h);
    const wrap = qs(".lbl-w", el);
    const it = placeShape(toyW, el, x, y, w, h, body, wrap);
    wrap.style.left = `${it.com.x}px`;
    wrap.style.top = `${it.com.y}px`;
    Body.setAngle(body, (i % 2 ? -1 : 1) * 0.12);
    const release = grabbable(toyW, it, (e) => {
      const r = ask.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }, {
      down() {
        grabbing(true);
      },
      up() {
        grabbing(false);
      },
    });
    scope.cleanup(() => {
      release();
      el.removeAttribute("style");
      wrap.removeAttribute("style");
    });
    return it;
  });
  ScrollTrigger.create({
    trigger: ask,
    start: "top 75%",
    end: "bottom top",
    onToggle(self) {
      if (self.isActive) {
        toyW.resume();
      } else {
        toyW.pause();
      }
    },
  });
  gsap.from("#ask-h, .ask-sub", { yPercent: 16, autoAlpha: 0, duration: 1, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: ask, start: "top 70%" } });
  return { ask, toys };
}

// ---------------------------------------------------------------- nav colour by section
function buildNavThemes(scope, stage)
{
  const nav = qs(".nav");
  const THEMES = [
    ["#promise", "#f3f1ec", "#070707", false],
    ["#how", "#070707", "#f3f1ec", true],
    ["#ask", "#f3f1ec", "#070707", true],
    ["#board", "#f3f1ec", "#070707", true],
    ["#founder", "#070707", "#ffe100", true],
    ["#faq", "#f3f1ec", "#070707", true],
    [".close-ask", "#070707", "#f3f1ec", true],
  ].map(([sel, fg, bg, solid]) => ({ el: qs(sel), fg, bg, solid }));
  let themeNow = null;
  let stageNav = null;
  let tick = 0;
  // Sections that scroll under the nav get a bar in their own colour, so text never runs under the logo.
  const paintBar = () => {
    if (!themeNow || !themeNow.solid) {
      nav.style.removeProperty("background");
      return;
    }
    const live = getComputedStyle(themeNow.el).backgroundColor;
    nav.style.background = live === "rgba(0, 0, 0, 0)" ? themeNow.bg : live;
  };
  const setColours = (fg, bg) => {
    nav.style.setProperty("--nav", fg);
    nav.style.setProperty("--navf", bg);
  };
  scope.ticker(() => {
    const hit = THEMES.find((t) => {
      const r = t.el.getBoundingClientRect();
      return r.top <= 40 && r.bottom > 40;
    }) || null;
    // Under the nav is the stage: its colours follow how far through it you are.
    if (!hit) {
      const c = stage.navAt(stage.tl.time());
      if (c !== stageNav) {
        stageNav = c;
        setColours(c[0], c[1]);
      }
    } else {
      stageNav = null;
    }
    tick += 1;
    if (hit === themeNow) {
      // The tower section turns blue part way through.
      if (tick % 10 === 0) {
        paintBar();
      }
      return;
    }
    themeNow = hit;
    paintBar();
    if (hit) {
      setColours(hit.fg, hit.bg);
    }
  });
  scope.cleanup(() => {
    nav.style.removeProperty("background");
    nav.style.removeProperty("--nav");
    nav.style.removeProperty("--navf");
  });
  ScrollTrigger.create({
    trigger: "#close",
    start: "top 60",
    onEnter: scope.wrap(() => {
      gsap.to(nav, { yPercent: -100, autoAlpha: 0, duration: 0.5, ease: "expo.out" });
    }),
    onLeaveBack: scope.wrap(() => {
      gsap.to(nav, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "expo.out" });
    }),
  });
}

// ---------------------------------------------------------------- the launch board
function buildBoard(scope, phone)
{
  const board = qs("#board");
  const rows = qa(".b-row", board);
  const rnd = seeded(7);
  gsap.from("#board-h", { yPercent: 18, autoAlpha: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: board, start: "top 72%" } });
  rows.forEach((row) => {
    const cells = qa(".js-scr", row);
    gsap.set(qa(".r-what,.r-part,.st-i", row), { autoAlpha: 0 });
    // Blank cells align differently on the baseline. Holding the row's height keeps the page below from jumping.
    row.style.height = `${row.getBoundingClientRect().height}px`;
    scope.cleanup(() => {
      row.style.height = "";
    });
    cells.forEach((c) => {
      c.style.minHeight = `${c.getBoundingClientRect().height}px`;
      c.dataset.text = c.textContent;
      c.textContent = " ";
    });
    scope.cleanup(() => {
      cells.forEach((c) => {
        c.textContent = c.dataset.text;
        c.style.minHeight = "";
        delete c.dataset.text;
      });
    });
    ScrollTrigger.create({
      trigger: row,
      start: "top 92%",
      once: true,
      onEnter: scope.wrap(() => {
        cells.forEach((c, n) => scramble(c, c.classList.contains("r-name") ? 0.8 : 0.5, n * 0.05, rnd));
        gsap.to(qa(".r-what,.r-part", row), { autoAlpha: 1, duration: 0.6, delay: 0.15, ease: "power1.out" });
        gsap.fromTo(qa(".st-i", row), { autoAlpha: 1, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.5, delay: 0.5, ease: "back.out(3)" });
        gsap.delayedCall(1.1, () => {
          row.style.height = "";
        });
      }),
    });
  });

  if (phone) {
    return;
  }
  // A sharp picture under the cursor. Things still being built stay out of focus.
  const peek = document.createElement("div");
  peek.className = "peek";
  peek.setAttribute("aria-hidden", "true");
  const peekImg = document.createElement("img");
  peekImg.alt = "";
  peek.appendChild(peekImg);
  board.appendChild(peek);
  scope.cleanup(() => peek.remove());
  gsap.set(peek, { clipPath: "inset(100% 0% 0% 0%)" });
  const url = (row) => sized(row.dataset.img, 828);
  ScrollTrigger.create({
    trigger: board,
    start: "top bottom",
    once: true,
    onEnter() {
      rows.forEach((row) => {
        new Image().src = url(row);
      });
    },
  });
  const px = gsap.quickTo(peek, "x", { duration: 0.5, ease: "expo.out" });
  const py = gsap.quickTo(peek, "y", { duration: 0.5, ease: "expo.out" });
  scope.on(window, "mousemove", (e) => {
    px(Math.max(e.clientX + 24, vw() * 0.47));
    py(Math.min(e.clientY - 60, vh() - peek.offsetHeight - 16));
  });
  rows.forEach((row) => {
    scope.on(row, "mouseenter", () => {
      peekImg.src = url(row);
      peekImg.classList.toggle("is-wip", row.dataset.status === "In the works");
      gsap.to(peek, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.45, ease: "expo.out", overwrite: "auto" });
    });
    scope.on(row, "mouseleave", () => {
      gsap.to(peek, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.28,
        ease: "power2.in",
        overwrite: "auto",
        onComplete() {
          gsap.set(peek, { clipPath: "inset(100% 0% 0% 0%)" });
        },
      });
    });
  });
}

// ---------------------------------------------------------------- founder, questions, close
function buildReveals(scope)
{
  const founder = qs("#founder");
  const faq = qs("#faq");
  const close = qs("#close");
  gsap.fromTo(".founder-img", { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: founder, start: "top bottom", end: "bottom top", scrub: true } });
  gsap.from(".founder-q", { y: 40, autoAlpha: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: founder, start: "top 55%" } });
  gsap.from(".founder-meta", { autoAlpha: 0, duration: 1.2, delay: 0.25, scrollTrigger: { trigger: founder, start: "top 55%" } });
  gsap.from("#faq details", { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.07, ease: "expo.out", scrollTrigger: { trigger: faq, start: "top 70%" } });
  gsap.fromTo(".soft-ask img", { yPercent: -3 }, { yPercent: 3, ease: "none", scrollTrigger: { trigger: "#ask", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.fromTo(".faq-soft img", { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: faq, start: "top bottom", end: "bottom top", scrub: true } });
  gsap.fromTo(".soft-end img", { scale: 1.16 }, { scale: 1, ease: "none", scrollTrigger: { trigger: "#close-end", start: "top bottom", end: "bottom bottom", scrub: true } });
  const closeT = qs(".close-t");
  scope.cleanup(splitLetters(closeT));
  gsap.from(closeT.querySelectorAll(".lc"), { yPercent: 110, duration: 1, stagger: 0.022, ease: "back.out(1.4)", scrollTrigger: { trigger: close, start: "top 62%" } });
  gsap.from(".close-sub, .close-q, .close-btn", { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.06, delay: 0.2, ease: "expo.out", scrollTrigger: { trigger: close, start: "top 62%" } });
}

// ---------------------------------------------------------------- the closing name: the work piles up on it
function buildEnd(scope, phone)
{
  const end = qs("#close-end");
  const endWord = qs("#end-word");
  const sw = vw();
  const endTotal = widthOf("clupai") + SPACE * 5;
  const eu = (sw - (phone ? 24 : sw * 0.04)) / endTotal;
  const endFloor = end.offsetHeight - 38 * eu - (phone ? 34 : 40);
  const endWorld = scope.world(makeWorld({ gravity: 1.25 }));
  endWorld.pause();
  endWorld.walls(end.offsetWidth, end.offsetHeight);
  let ex = phone ? 12 : sw * 0.02;
  let endI = null;
  [..."clupai"].forEach((ch) => {
    const g = GLYPHS[ch];
    const top = endFloor - (100 - g.top) * eu;
    const el = glyphEl(ch, eu);
    endWord.appendChild(el);
    el.style.transform = `translate(${ex}px, ${top}px)`;
    endWorld.solid(glyphBody(ch, ex, top, eu, { isStatic: true }));
    if (ch === "i") {
      endI = { x: ex + (g.w / 2) * eu, top };
    }
    ex += (g.w + SPACE) * eu;
  });
  scope.cleanup(() => {
    endWord.textContent = "";
  });
  // The dot's place on the i is a real thing to land on.
  const eTittle = Math.max(TITTLE.size * eu * 1.15, 40);
  endWorld.solid(Bodies.circle(endI.x, endI.top - 14 * eu - eTittle / 2, eTittle / 2, { isStatic: true }));

  const rnd = seeded(7);
  let pileOn = false;
  ScrollTrigger.create({
    trigger: end,
    start: "top 55%",
    onEnter: scope.wrap(() => {
      endWorld.resume();
      if (pileOn) {
        return;
      }
      pileOn = true;
      const w = end.offsetWidth;
      const tw = phone ? 0.3 * w : 0.14 * w;
      const th = tw * 0.625;
      const count = phone ? 7 : 11;
      TILES.slice(0, count).forEach((src, i) => {
        const el = document.createElement("div");
        el.className = "tile";
        el.setAttribute("aria-hidden", "true");
        const img = document.createElement("img");
        img.src = sized(src, 384);
        img.alt = "";
        img.draggable = false;
        el.appendChild(img);
        end.appendChild(el);
        const x = tw / 2 + rnd() * (w - tw);
        const y = -th - i * th * 0.85;
        const body = Bodies.rectangle(x, y, tw, th, { restitution: 0.18, friction: 0.5, angle: (rnd() - 0.5) * 0.9 });
        const it = placeShape(endWorld, el, x, y, tw, th, body);
        const release = grabbable(endWorld, it, (e) => {
          const r = end.getBoundingClientRect();
          return { x: e.clientX - r.left, y: e.clientY - r.top };
        }, {
          down() {
            grabbing(true);
          },
          up() {
            grabbing(false);
          },
        });
        scope.cleanup(() => {
          release();
          el.remove();
        });
      });
    }),
  });
  return { end, endI, eu, eTittle };
}

// ---------------------------------------------------------------- where the mascot goes as you scroll
function buildPerches(scope, dot, phone, parts)
{
  const { stage, end, rest } = parts;
  const { tl, onI, tittle, lineSide } = stage;
  const roam = phone ? 44 : 72;
  const unitY = (t) => {
    const st = tl.scrollTrigger;
    return st.start + (st.end - st.start) * (t / tl.duration());
  };
  const endTop = (() => {
    const el = qs("#close-end");
    return () => el.getBoundingClientRect().top + scrollY;
  })();
  // It has two places, both the dot of an i: the word at the top and the word at the end.
  // In between it jumps off the bottom of the screen and keeps out of the way.
  const PERCH = [
    { id: "hero", y: () => -1, at: onI, size: tittle, colour: [YELLOW, INK], line: "Scroll down. I brought receipts.", side: lineSide, mood: "", theme: "ink" },
    { id: "away", y: () => unitY(0.2), at: () => ({ x: vw() - roam, y: vh() + roam * 2 }), colour: [YELLOW, INK], side: "left", mood: "" },
    {
      id: "end",
      y: () => endTop() - vh() * 0.35,
      at: () => {
        const r = end.end.getBoundingClientRect();
        return { x: r.left + end.endI.x, y: r.top + end.endI.top - 14 * end.eu };
      },
      size: end.eTittle,
      colour: [YELLOW, INK],
      line: "Yours goes on the pile next.",
      side: "left",
      mood: "",
    },
  ];
  let perchY = [];
  const measure = () => {
    perchY = PERCH.map((p) => p.y());
  };
  let current = null;
  let lastTo = null;
  let goneId = null;
  let tick = 0;
  function perchNow()
  {
    tick += 1;
    if (tick % 30 === 0) {
      measure();
    }
    const y = scrollY;
    let idx = 0;
    perchY.forEach((v, i) => {
      if (y >= v) {
        idx = i;
      }
    });
    const p = PERCH[idx];
    // Its spot has scrolled up under the nav, so it hops down to the corner instead of riding up with it.
    const spotY = p.at.raw ? p.at.raw().y : Infinity;
    const gone = spotY < navFloor(roam) + (goneId === p.id ? 40 : 0);
    goneId = gone ? p.id : null;
    const key = gone ? `${p.id}:gone` : p.id;
    if (current === key) {
      return;
    }
    const first = current === null;
    current = key;
    dot.colour(p.colour[0], p.colour[1]);
    dot.mood(p.mood);
    dot.quiet();
    if (first && p.id === "hero") {
      return;
    }
    dot.state.side = p.side;
    const to = gone ? rest : p.at;
    const done = scope.wrap(() => {
      if (p.line && current === p.id) {
        dot.talk(p.line, { side: p.side, theme: p.theme, ms: p.id === "end" ? 0 : 3400 });
      }
      if (p.id === "end") {
        // It lands on the i, and the whole word feels it.
        gsap.fromTo(".end-word .blk svg", { y: 0 }, { y: -end.eu * 7, duration: 0.15, yoyo: true, repeat: 1, stagger: { each: 0.05, from: "end" }, ease: "power2.out" });
        dot.flash("happy", 1.5);
        dot.wink();
      }
    });
    // Already standing there: it just speaks, no hop on the spot. Mid-hop or thrown, the hop carries the line to the landing.
    if (to === lastTo && !first && dot.settled()) {
      done();
      return;
    }
    lastTo = to;
    dot.hop(to, { size: p.size || roam, done });
  }

  // The mascot arrives last: it lands on the i, then wakes up.
  gsap.delayedCall(1.25, () => {
    if (current !== null && current !== "hero") {
      return;
    }
    current = "hero";
    // The first time, three dots drop in and pull together into the dot of the i.
    if (dot.state.y < 0) {
      dot.shape("dots", true);
    }
    dot.hop(onI, {
      size: tittle,
      rise: dot.state.y < 0 ? 0 : undefined,
      duration: dot.state.y < 0 ? 0.4 : undefined,
      done: scope.wrap(() => {
        if (current === "hero") {
          dot.shape("circle");
          dot.talk(PERCH[0].line, { side: PERCH[0].side, theme: PERCH[0].theme, ms: 0 });
        }
      }),
    });
  });

  measure();
  ScrollTrigger.addEventListener("refresh", measure);
  scope.cleanup(() => ScrollTrigger.removeEventListener("refresh", measure));
  scope.ticker(perchNow);
}

export function init(scope, core)
{
  const { dot } = core;
  const phone = isPhone();
  dot.park(null);
  const stage = buildStage(scope, dot, phone);
  // Its first ever arrival is from above the i. Coming back from another page, it jumps across from where it is.
  if (dot.state.y < 0) {
    dot.state.size = stage.tittle;
    dot.state.x = stage.onI().x;
    dot.state.y = -80;
  }
  dot.colour(YELLOW, INK);
  const promiseTl = buildPromise();
  const howTl = buildHow(scope, null, phone);
  const toys = buildToys(scope, phone);
  buildNavThemes(scope, stage);
  buildBoard(scope, phone);
  buildReveals(scope);
  const end = buildEnd(scope, phone);
  buildPerches(scope, dot, phone, { stage, promiseTl, howTl, toys, end, rest: core.rest });
}
