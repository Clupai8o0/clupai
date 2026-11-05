// The home page, moving. Every word is already in the server's HTML: this only stages it.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Matter from "matter-js";
import { GLYPHS, SPACE, TITTLE } from "./glyphs";
import { BLUE, INK, YELLOW, clamp, glyphBody, glyphEl, grabbable, isPhone, makeWorld, placeShape, sized } from "./kit";
import { brickPath, scramble, seeded, splitLetters } from "./text";

const { Bodies, Body, Sleeping } = Matter;
const qs = (s, r = document) => r.querySelector(s);
const qa = (s, r = document) => [...r.querySelectorAll(s)];
const vw = () => innerWidth;
const vh = () => innerHeight;
const widthOf = (word) => [...word].reduce((sum, ch) => sum + GLYPHS[ch].w, 0);
const grabbing = (on) => document.documentElement.classList.toggle("is-grabbing", on);

const TILES = [
  "/work/kdg/new/hero.webp", "/work/hoddle/new/home.webp", "/work/krishnaveni/homepage.webp", "/products/tempo/dashboard.webp",
  "/products/morgue/desktop.webp", "/work/kdg/gallery.webp", "/work/nmmun/homepage.webp", "/work/hoddle/new/matching.webp",
  "/work/tapcraft/new/desktop.webp", "/products/kairos/week.webp", "/products/cstack/cover.webp", "/products/govchat/trust.webp",
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
function buildStage(scope, dot, phone)
{
  const stage = qs(".stage");
  const nav = qs(".nav");
  const sw = vw();
  const sh = stage.offsetHeight;
  const TILE_W = phone ? 186 : 112;
  const widthsRow = phone ? widthOf("clup") + 3 * SPACE : widthOf("clup") + 3 * SPACE + 20 + TILE_W + 22 + widthOf("ai") + SPACE;
  const u = (sw - (phone ? 24 : sw * 0.04)) / widthsRow;
  const marginX = phone ? 12 : sw * 0.02;
  const floorY = sh - 38 * u - (phone ? 10 : 12);
  const heroW = scope.world(makeWorld({ sleep: true, gravity: 1.3 }));
  heroW.walls(sw, floorY);
  const letters = [];
  const clup = qs(".w-clup");
  const ai = qs(".w-ai");
  const wordEl = qs("#wordmark");

  function setLetter(ch, x, baseline, group)
  {
    const g = GLYPHS[ch];
    const top = baseline - (100 - g.top) * u;
    const el = glyphEl(ch, u);
    group.appendChild(el);
    const body = glyphBody(ch, x, top, u);
    const it = heroW.add(el, body, x, top);
    it.ch = ch;
    it.home = { x: body.position.x, y: body.position.y, a: 0 };
    it.grabEl = el.querySelector("svg");
    letters.push(it);
    return it;
  }

  let cx = marginX;
  const row1Base = phone ? floorY - 152 * u : floorY;
  [..."clup"].forEach((ch) => {
    setLetter(ch, cx, row1Base, clup);
    cx += (GLYPHS[ch].w + SPACE) * u;
  });
  // The film tile sits in the word, as tall as the l. On a phone it starts the second row.
  let slot;
  if (phone) {
    slot = { left: marginX, width: TILE_W * u, height: 133 * u, top: floorY - 133 * u };
    cx = marginX + (TILE_W + 12) * u;
  } else {
    cx += (20 - SPACE) * u;
    slot = { left: cx, width: TILE_W * u, height: 133 * u, top: floorY - 133 * u };
    cx += (TILE_W + 22) * u;
  }
  const lettersAi = [];
  [..."ai"].forEach((ch) => {
    lettersAi.push(setLetter(ch, cx, floorY, ai));
    cx += (GLYPHS[ch].w + SPACE) * u;
  });
  const letterI = lettersAi[1];
  heroW.solid(Bodies.rectangle(slot.left + slot.width / 2, slot.top + slot.height / 2, slot.width, slot.height, { isStatic: true }));
  scope.cleanup(() => {
    clup.textContent = "";
    ai.textContent = "";
    grabbing(false);
  });

  // On a phone the top row has nothing under it, so letters at home hold still until grabbed.
  const settle = (it) => {
    if (phone) {
      Body.setStatic(it.body, true);
    } else {
      Sleeping.set(it.body, true);
    }
  };
  letters.forEach((it) => {
    Sleeping.set(it.body, true);
    settle(it);
  });

  const homing = (it, on) => {
    it.body.collisionFilter.mask = on ? 0 : 0xFFFFFFFF;
  };

  // A letter landing: it squashes on its baseline and the word takes the hit.
  function squash(it, k = 1)
  {
    const g = GLYPHS[it.ch];
    const svg = it.el.querySelector("svg");
    gsap.set(svg, { transformOrigin: `50% ${((100 - g.top) / (g.bottom - g.top)) * 100}%` });
    gsap.fromTo(svg, { scaleX: 1 + 0.16 * k, scaleY: 1 - 0.26 * k }, { scaleX: 1, scaleY: 1, duration: 0.75, ease: "elastic.out(1, 0.45)", overwrite: true });
  }

  // Letters drop in, one by one.
  letters.forEach((it, i) => {
    homing(it, true);
    const p = { y: -sh * 0.62 };
    Body.setPosition(it.body, { x: it.home.x, y: it.home.y + p.y });
    heroW.render(it);
    gsap.to(p, {
      y: 0,
      duration: 0.55,
      delay: 0.2 + i * 0.075,
      ease: "power3.in",
      onUpdate() {
        Body.setPosition(it.body, { x: it.home.x, y: it.home.y + p.y });
        heroW.render(it);
      },
      onComplete() {
        homing(it, false);
        settle(it);
        squash(it);
        gsap.fromTo(wordEl, { y: 6 }, { y: 0, duration: 0.2, ease: "power2.out", overwrite: true });
      },
    });
  });

  const isOff = (it) => Math.hypot(it.body.position.x - it.home.x, it.body.position.y - it.home.y) > 6 || Math.abs(it.body.angle) > 0.05;

  function sendHome(it, dur = 0.55)
  {
    homing(it, true);
    Sleeping.set(it.body, false);
    const b = it.body;
    const p = { x: b.position.x, y: b.position.y, a: ((b.angle + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI };
    const still = () => {
      Body.setVelocity(b, { x: 0, y: 0 });
      Body.setAngularVelocity(b, 0);
    };
    still();
    it.homeT = gsap.to(p, {
      x: it.home.x,
      y: it.home.y,
      a: 0,
      duration: dur,
      ease: "back.out(1.4)",
      onUpdate() {
        Body.setPosition(b, { x: p.x, y: p.y });
        Body.setAngle(b, p.a);
        still();
      },
      onComplete() {
        it.homeT = null;
        homing(it, false);
        Body.setPosition(b, { x: it.home.x, y: it.home.y });
        Body.setAngle(b, 0);
        settle(it);
        squash(it, 0.6);
      },
    });
  }

  const tittle = Math.max(TITTLE.size * u * 1.15, 40);
  const onI = () => {
    const b = letterI.body;
    const up = 50 * u + 14 * u;
    return { x: b.position.x + Math.sin(b.angle) * up, y: b.position.y - Math.cos(b.angle) * up };
  };

  // The mascot cleans up: it jumps from letter to letter, and each one snaps home as it lands.
  let fixing = false;
  function fixUp()
  {
    if (fixing) {
      return;
    }
    fixing = true;
    dot.mood("smug");
    dot.talk("Fine. I’ll fix it. On time.", { ms: 2800, side: "left" });
    const stray = () => letters.filter((it) => !it.homeT && isOff(it));
    let queue = stray();
    let pass = 0;
    const next = scope.wrap(() => {
      if (!fixing) {
        return;
      }
      if (!queue.length) {
        queue = pass < 2 ? stray() : [];
        pass += 1;
      }
      if (!queue.length) {
        fixing = false;
        dot.mood("");
        dot.hop(onI, {
          size: tittle,
          done() {
            dot.flash("happy", 1.3);
            dot.wink();
          },
        });
        return;
      }
      const it = queue.shift();
      dot.hop(() => ({ x: it.body.position.x, y: it.body.bounds.min.y + 2 }), {
        size: phone ? 42 : 60,
        rise: 130,
        duration: 0.36,
        done: scope.wrap(() => {
          if (fixing) {
            sendHome(it);
            gsap.delayedCall(0.34, next);
          }
        }),
      });
    });
    next();
  }

  let quietTimer = null;
  // Scrolled away mid-mess: everything goes back at once.
  function forceHome()
  {
    fixing = false;
    if (quietTimer) {
      quietTimer.kill();
      quietTimer = null;
    }
    letters.forEach((it) => {
      if (it.homeT) {
        it.homeT.kill();
        it.homeT = null;
      }
      homing(it, false);
      if (phone) {
        Body.setStatic(it.body, false);
      }
      Body.setPosition(it.body, { x: it.home.x, y: it.home.y });
      Body.setAngle(it.body, 0);
      Body.setVelocity(it.body, { x: 0, y: 0 });
      Body.setAngularVelocity(it.body, 0);
      settle(it);
      heroW.render(it);
    });
  }

  let thrown = 0;
  letters.forEach((it) => {
    const release = grabbable(heroW, it, (e) => ({ x: e.clientX, y: e.clientY + scrollY }), {
      allow: () => scrollY < 8 && !fixing && !it.homeT,
      down() {
        Body.setStatic(it.body, false);
        grabbing(true);
        dot.flash("wide", 1.4);
        if (quietTimer) {
          quietTimer.kill();
        }
      },
      up: scope.wrap((_, moved, cancelled) => {
        grabbing(false);
        // A finger that turned into a scroll: it was never a throw.
        if (cancelled && moved < 7) {
          settle(it);
          return;
        }
        thrown += 1;
        if (moved < 7) {
          Body.setVelocity(it.body, { x: (Math.random() - 0.5) * 3, y: -11 });
          Body.setAngularVelocity(it.body, (Math.random() - 0.5) * 0.16);
        }
        dot.talk(thrown === 1 ? "Put that back." : "Really?", { ms: 2200, side: "left" });
        quietTimer = gsap.delayedCall(4.6, () => {
          if (scrollY < 8 && letters.some(isOff)) {
            fixUp();
          }
        });
      }),
    });
    scope.cleanup(release);
  });

  // ------------------------------------------------------------ the film tile
  const film = qs("#film");
  gsap.set(film, { left: slot.left, top: slot.top, width: slot.width, height: slot.height });
  const stageRect = stage.getBoundingClientRect();
  const winEl = qs("#win-hoddle").getBoundingClientRect();
  const win = { left: winEl.left - stageRect.left, top: winEl.top - stageRect.top, width: winEl.width, height: winEl.height };

  // Fast cuts of real work, in a plain sharp window. The last one is the Hoddle home page, on its way to full screen.
  const cuts = qa(".cut").filter((c) => getComputedStyle(c).display !== "none");
  let cutLock = false;
  let cutIndex = 0;
  const showCut = (i) => {
    cuts.forEach((c, n) => c.classList.toggle("is-on", n === i));
  };
  showCut(0);
  gsap.to({}, {
    duration: 0.78,
    repeat: -1,
    onRepeat() {
      if (!cutLock) {
        cutIndex = (cutIndex + 1) % (cuts.length - 1);
        showCut(cutIndex);
      }
    },
  });
  scope.cleanup(() => {
    cuts.forEach((c) => c.classList.remove("is-on"));
  });

  // ------------------------------------------------------------ names, as letters in a mask
  const nameLetters = (el) => {
    scope.cleanup(splitLetters(el));
    return el.querySelectorAll(".lc");
  };
  const hdL = nameLetters(qs(".hd-name"));
  const kdL = nameLetters(qs(".kd-name"));
  const scL = nameLetters(qs(".sc-name"));

  gsap.fromTo(film, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, delay: 0.9, ease: "expo.inOut" });
  const drift = gsap.to(".soft-hero img", { scale: 1.09, xPercent: -2, duration: 15, ease: "none", yoyo: true, repeat: -1 });

  // ------------------------------------------------------------ the scrubbed stage
  gsap.set(hdL, { yPercent: 130 });
  gsap.set(kdL, { yPercent: 130 });
  gsap.set(scL, { yPercent: 130 });
  gsap.set("#t-hoddle .what, #t-hoddle .fact, #t-hoddle .quote", { autoAlpha: 0, y: 26 });
  gsap.set(".ch-hoddle", { autoAlpha: 0 });

  // The next chapter gets built over the last one, brick by brick.
  const chK = qs("#ch-kdg");
  const chS = qs("#ch-school");
  const BRICKS = phone ? { rows: 7, cols: 3 } : { rows: 6, cols: 8 };
  const walls = { k: 0, s: 0 };
  const paintWalls = () => {
    chK.style.clipPath = brickPath(sw, sh, walls.k, BRICKS);
    chS.style.clipPath = brickPath(sw, sh, walls.s, BRICKS);
  };
  paintWalls();
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

  const navTo = (fg, bg) => ({ "--nav": fg, "--navf": bg, duration: 0.05 });
  let drifting = true;
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
        if (self.progress > 0.003) {
          cutLock = true;
          heroW.pause();
          if (fixing || letters.some(isOff)) {
            forceHome();
          }
        } else {
          cutLock = false;
          heroW.resume();
        }
        const t = self.progress * tl.duration();
        playHoddle(t);
        playKdg(t);
        const keep = self.progress < 0.3;
        if (keep !== drifting) {
          drifting = keep;
          drift.paused(!keep);
        }
      },
    },
  });
  const origin = `${slot.left + slot.width / 2}px ${floorY}px`;
  gsap.set(clup, { transformOrigin: origin });
  gsap.set(ai, { transformOrigin: origin });
  tl.to(".hero-top", { y: -sh * 0.34, autoAlpha: 0, duration: 0.55, ease: "power2.in" }, 0)
    .to(film, { left: 0, top: 0, width: sw, height: sh, duration: 1.4, ease: "power2.inOut" }, 0)
    .to(clup, { x: -sw * (phone ? 2.6 : 1.1), scale: 2.1, duration: 1.4, ease: "power2.in" }, 0)
    .to(ai, { x: sw * 1.1, scale: 2.1, duration: 1.4, ease: "power2.in" }, 0)
    .add(() => {
      showCut(cuts.length - 1);
    }, 0.08)
    .to(nav, { yPercent: -100, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 0.5)
    .set(".ch-hoddle", { autoAlpha: 1 }, 1.45)
    .set(wordEl, { autoAlpha: 0 }, 1.45)
    .to(film, { ...win, duration: 0.9, ease: "power3.inOut" }, 1.95)
    .to(hoddleFilm, { opacity: 1, duration: 0.3 }, 2.45)
    .set(nav, { "--nav": "#ffffff", "--navf": "#06183a" }, 2.2)
    .set(".nav-logo", { opacity: 1 }, 2.2)
    .to(nav, { yPercent: 0, autoAlpha: 1, duration: 0.25, ease: "power2.out" }, 2.25)
    .to(hdL, { yPercent: 0, duration: 0.7, stagger: 0.035, ease: "back.out(1.5)" }, 2.2)
    .to("#t-hoddle .what", { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 2.5)
    .to("#t-hoddle .fact", { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" }, 2.55)
    .to("#t-hoddle .quote", { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, 2.65)
    .to(walls, { k: 1, duration: 0.85, ease: "none", onUpdate: paintWalls }, 3.45)
    .from(".kd-film", { yPercent: 24, duration: 0.95, ease: "power3.out" }, 3.5)
    .to(nav, navTo("#050505", "#ffe100"), 4.15)
    .to(kdL, { yPercent: 0, duration: 0.7, stagger: 0.016, ease: "back.out(1.5)" }, 3.95)
    .from(".kd-num, .kd-side", { autoAlpha: 0, y: 26, duration: 0.45, stagger: 0.08, ease: "power2.out" }, 4.15)
    .to({ v: 75 }, {
      v: 99,
      duration: 0.8,
      ease: "power1.inOut",
      onUpdate() {
        kdVal.textContent = String(Math.round(this.targets()[0].v));
      },
    }, 4.25)
    .to(walls, { s: 1, duration: 0.85, ease: "none", onUpdate: paintWalls }, 5.2)
    .fromTo("#sc-pic > *", { scale: 1.22 }, { scale: 1, duration: 1.4, ease: "power2.out" }, 5.2)
    .to(nav, navTo("#ffffff", "#c8102e"), 5.9)
    .to(scL, { yPercent: 0, duration: 0.7, stagger: 0.018, ease: "back.out(1.5)" }, 5.7)
    .from(".sc-copy", { autoAlpha: 0, y: 26, duration: 0.45, ease: "power2.out" }, 5.95)
    .to({}, { duration: 0.4 }, 6.3);

  return { tl, tittle, onI, letterI };
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

// ---------------------------------------------------------------- how it works: the money, as a tower
function buildHow(scope, dot, phone)
{
  const blocks = { b20: qs(".tw-20"), b30: qs(".tw-30"), b50: qs(".tw-50"), pad: qs(".tw-pad") };
  const stepEls = qa(".st");
  const missBtn = qs("#miss");
  const fallLayer = qs("#how-fall");
  const howEl = qs("#how");
  const homes = [];
  let missWorld = null;
  let missed = false;

  function resetMiss()
  {
    if (missWorld) {
      missWorld.stop();
      missWorld = null;
    }
    homes.splice(0).forEach(([el, parent]) => {
      el.removeAttribute("style");
      parent.appendChild(el);
    });
    gsap.killTweensOf(".stick");
    gsap.set(".stick", { scale: 0, xPercent: -50, yPercent: -50, rotation: -5 });
    howEl.classList.remove("is-missed");
    missed = false;
    missBtn.textContent = "Miss the date";
  }

  gsap.set(stepEls.slice(1), { autoAlpha: 0 });
  gsap.set([blocks.b20, blocks.b30, blocks.b50], { y: -vh() * 1.3 });
  gsap.set(blocks.pad, { scaleX: 0 });
  gsap.set("#flag", { scaleY: 0 });
  gsap.set(".tw-t", { opacity: 0 });
  gsap.set(missBtn, { autoAlpha: 0, scale: 0.2 });
  gsap.set(".stick", { scale: 0, xPercent: -50, yPercent: -50, rotation: -5 });
  const howTl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: howEl,
      pin: true,
      start: "top top",
      end: () => `+=${vh() * 3.3}`,
      scrub: true,
      onUpdate(self) {
        if (missed && self.progress < 0.86) {
          resetMiss();
        }
      },
    },
  });
  const swap = (a, b, at) => {
    howTl.to(stepEls[a], { autoAlpha: 0, x: -30, duration: 0.14, ease: "power2.in" }, at)
      .fromTo(stepEls[b], { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 0.22, ease: "power3.out", immediateRender: false }, at + 0.1);
  };
  const inner = (b) => qs(".tw-i", b);
  const drop = (b, below, at) => {
    howTl.to(b, { y: 0, duration: 0.3, ease: "power3.in" }, at);
    howTl.fromTo(inner(b), { scaleX: 1.14, scaleY: 0.76 }, { scaleX: 1, scaleY: 1, duration: 0.34, ease: "elastic.out(1, 0.45)", immediateRender: false }, at + 0.3);
    if (below) {
      howTl.fromTo(inner(below), { scaleY: 0.92 }, { scaleY: 1, duration: 0.26, ease: "elastic.out(1, 0.5)", immediateRender: false }, at + 0.3);
    }
  };
  howTl.to(blocks.pad, { scaleX: 1, duration: 0.3, ease: "back.out(1.6)" }, 0.05);
  swap(0, 1, 0.75);
  drop(blocks.b50, null, 0.78);
  howTl.to(".tw-50 .tw-t", { opacity: 1, duration: 0.1 }, 1.1);
  swap(1, 2, 1.6);
  drop(blocks.b30, blocks.b50, 1.63);
  howTl.to(".tw-30 .tw-t", { opacity: 1, duration: 0.1 }, 1.95);
  swap(2, 3, 2.4);
  drop(blocks.b20, blocks.b30, 2.43);
  howTl.to(".tw-20 .tw-t", { opacity: 1, duration: 0.1 }, 2.75);
  howTl.to("#flag", { scaleY: 1, duration: 0.2, ease: "back.out(2)" }, 2.82);
  swap(3, 4, 3.3);
  howTl.to(howEl, { backgroundColor: "#4da3ff", duration: 0.2 }, 3.3);
  howTl.to(blocks.pad, { backgroundColor: "#070707", color: "#f3f1ec", duration: 0.2 }, 3.3);
  howTl.to(missBtn, { autoAlpha: 1, scale: 1, duration: 0.2, ease: "back.out(2.4)" }, 3.46);
  howTl.to({}, { duration: 0.75 }, 3.66);

  // Press it: the unpaid blocks really do fall off.
  function pressMiss()
  {
    if (missed) {
      resetMiss();
      dot.talk("Good. Now you know.", { ms: 2200, side: phone ? "above" : "left" });
      return;
    }
    missed = true;
    howEl.classList.add("is-missed");
    const hr = howEl.getBoundingClientRect();
    missWorld = makeWorld({ gravity: 1.6 });
    missWorld.walls(hr.width, hr.height);
    const solidOf = (el) => {
      const r = el.getBoundingClientRect();
      missWorld.solid(Bodies.rectangle(r.left + r.width / 2 - hr.left, r.top + r.height / 2 - hr.top, r.width, r.height, { isStatic: true }));
    };
    solidOf(blocks.b50);
    solidOf(blocks.pad);
    solidOf(missBtn);
    [[".i-30", 1.3], [".i-20", -1.2]].forEach(([sel, dir], n) => {
      const el = qs(sel);
      const r = el.getBoundingClientRect();
      homes.push([el, el.parentElement]);
      el.style.position = "absolute";
      el.style.left = "0";
      el.style.top = "0";
      el.style.width = `${r.width}px`;
      el.style.height = `${r.height}px`;
      fallLayer.appendChild(el);
      const o = { restitution: 0.3, friction: 0.5, density: 0.002 };
      const cx0 = r.left + r.width / 2 - hr.left;
      // The 20% is the roof: a triangle, so it falls like one.
      const b = sel === ".i-20"
        ? Bodies.fromVertices(cx0, r.top + (r.height * 2) / 3 - hr.top, [[{ x: 0, y: -(r.height * 2) / 3 }, { x: r.width / 2, y: r.height / 3 }, { x: -r.width / 2, y: r.height / 3 }]], o)
        : Bodies.rectangle(cx0, r.top + r.height / 2 - hr.top, r.width, r.height, o);
      missWorld.add(el, b, r.left - hr.left, r.top - hr.top);
      Body.setVelocity(b, { x: dir * (phone ? 3 : 8), y: -7 - n * 6 });
      Body.setAngularVelocity(b, dir * 0.07);
      gsap.to(qs(".stick", el), { scale: 1, duration: 0.5, delay: 0.28 + n * 0.08, ease: "back.out(3)" });
    });
    gsap.to("#stick-paid", { scale: 1, duration: 0.5, delay: 0.5, ease: "back.out(3)" });
    gsap.to("#stick-free", { scale: 1, duration: 0.5, delay: 0.66, ease: "back.out(3)" });
    gsap.fromTo(blocks.b50, { y: 0 }, { y: 7, duration: 0.07, yoyo: true, repeat: 3 });
    missBtn.textContent = "Put it back";
    gsap.fromTo(missBtn, { scaleX: 1.2, scaleY: 0.72 }, { scaleX: 1, scaleY: 1, duration: 0.65, ease: "elastic.out(1, 0.4)" });
    dot.talk("See? You stop paying.", { ms: 3200, side: phone ? "above" : "left" });
    // The button goes off under the mascot as well.
    dot.fling(phone ? 120 : 260, -1400, { silent: true });
  }

  missBtn.disabled = false;
  scope.on(missBtn, "click", pressMiss);
  scope.cleanup(() => {
    resetMiss();
    missBtn.disabled = true;
  });
  return howTl;
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
function buildNavThemes(scope)
{
  const nav = qs(".nav");
  const THEMES = [
    ["#promise", "#f3f1ec", "#070707"],
    ["#how", "#070707", "#f3f1ec"],
    ["#ask", "#f3f1ec", "#070707"],
    ["#board", "#f3f1ec", "#070707"],
    ["#founder", "#070707", "#ffe100"],
    ["#faq", "#f3f1ec", "#070707"],
    [".close-ask", "#070707", "#f3f1ec"],
  ].map(([sel, fg, bg]) => ({ el: qs(sel), fg, bg }));
  let themeNow = null;
  const setColours = (fg, bg) => {
    nav.style.setProperty("--nav", fg);
    nav.style.setProperty("--navf", bg);
  };
  scope.ticker(() => {
    const hit = THEMES.find((t) => {
      const r = t.el.getBoundingClientRect();
      return r.top <= 40 && r.bottom > 40;
    }) || null;
    if (hit === themeNow) {
      return;
    }
    themeNow = hit;
    if (hit) {
      setColours(hit.fg, hit.bg);
    } else {
      setColours("#ffffff", "#c8102e");
    }
  });
  scope.cleanup(() => {
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

// ---------------------------------------------------------------- the closing name: throw the work at it
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
  const { stage, promiseTl, howTl, toys, end } = parts;
  const { tl, onI, tittle } = stage;
  const roam = phone ? 44 : 72;
  const unitY = (t) => {
    const st = tl.scrollTrigger;
    return st.start + (st.end - st.start) * (t / tl.duration());
  };
  const hAt = (t) => howTl.scrollTrigger.start + (howTl.scrollTrigger.end - howTl.scrollTrigger.start) * (t / howTl.duration());
  const atop = (sel, fx = 0.5, dy = 0) => {
    const el = qs(sel);
    return () => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width * fx, y: r.top + dy };
    };
  };
  const inView = (fn, s = roam) => () => {
    const p = fn();
    return { x: clamp(p.x, s / 2 + 8, vw() - s / 2 - 8), y: clamp(p.y, s + 8, vh() - 6) };
  };
  const pageTop = (sel) => {
    const el = qs(sel);
    return () => el.getBoundingClientRect().top + scrollY;
  };
  const askTop = pageTop("#ask");
  const boardTop = pageTop("#board");
  const founderTop = pageTop("#founder");
  const faqTop = pageTop("#faq");
  const closeTop = pageTop("#close");
  const endTop = pageTop("#close-end");
  const chipStop = qs("#chip-stop");
  const promiseWords = atop("#promise-t", 0.84, -4);
  const redToy = toys.toys[2];
  const PERCH = [
    { id: "hero", y: () => -1, at: onI, size: tittle, colour: [YELLOW, INK], line: phone ? "Go on, flick a letter." : "Go on, throw a letter.", side: "left", mood: "" },
    { id: "full", y: () => unitY(0.35), at: () => ({ x: vw() - roam, y: vh() - 10 }), colour: [YELLOW, INK], line: "Real work. Real clients.", side: "left", mood: "smug" },
    { id: "hoddle", y: () => unitY(2.5), at: inView(phone ? atop("#win-hoddle", 0.88, 2) : atop(".hd-name", 0.09, 16)), colour: [YELLOW, INK], line: "The cake. We’ll take it.", side: phone ? "left" : "right", mood: "smug" },
    { id: "kdg", y: () => unitY(4.4), at: inView(atop("#kd-num", 0.92, 6)), colour: [INK, YELLOW], line: "75 to 99. You’re welcome.", side: "left", mood: "smug" },
    { id: "school", y: () => unitY(5.95), at: inView(atop("#sc-pic", phone ? 0.84 : 0.32, 0)), colour: [YELLOW, INK], line: "Their words, not ours.", side: phone ? "left" : "right", mood: "" },
    {
      id: "promise",
      y: () => promiseTl.scrollTrigger.start + vh() * 0.92,
      at: inView(() => {
        if (phone) {
          return promiseWords();
        }
        const r = chipStop.getBoundingClientRect();
        return { x: r.right + roam * 0.75, y: r.bottom - 4 };
      }),
      colour: [YELLOW, INK],
      line: "Yes, really. It’s in the contract.",
      side: phone ? "left" : "right",
      mood: "smug",
    },
    { id: "how", y: () => howTl.scrollTrigger.start - vh() * 0.2, at: inView(atop(".tw-pad", 0.5, 1)), colour: [BLUE, INK], line: "Watch where your money goes.", side: "left", mood: "", theme: "ink" },
    { id: "how50", y: () => hAt(1.08), at: inView(atop(".tw-50", 0.5, 1)), colour: [BLUE, INK], side: "left", mood: "" },
    { id: "how30", y: () => hAt(1.93), at: inView(atop(".tw-30", 0.5, 1)), colour: [BLUE, INK], side: "left", mood: "" },
    { id: "how20", y: () => hAt(2.76), at: inView(atop(".tw-30", 0.93, 1)), colour: [BLUE, INK], side: "left", mood: "smug" },
    { id: "miss", y: () => hAt(3.52), at: inView(atop("#miss", 0.5, 2)), colour: [YELLOW, INK], line: "Press it. Go on.", side: "left", mood: "smug" },
    {
      id: "ask",
      y: () => askTop() - vh() * 0.25,
      at: inView(() => {
        const r = toys.ask.getBoundingClientRect();
        const b = redToy.body;
        return { x: r.left + b.position.x, y: r.top + b.bounds.min.y + 2 };
      }),
      colour: [YELLOW, INK],
      line: "Pick one. Or throw one.",
      side: "right",
      mood: "",
    },
    { id: "board", y: () => boardTop() - vh() * 0.3, at: inView(atop("#board-h", phone ? 0.86 : 0.62, phone ? -4 : 6)), colour: [YELLOW, INK], line: "We list the unfinished ones too.", side: phone ? "left" : "right", mood: "" },
    { id: "founder", y: () => founderTop() - vh() * 0.3, at: inView(atop("#founder-pic", phone ? 0.9 : 0.5, phone ? 46 : 2)), colour: [INK, YELLOW], line: "That’s Samridh. Your first call.", side: phone ? "left" : "right", mood: "" },
    { id: "faq", y: () => faqTop() - vh() * 0.3, at: inView(atop("#faq-h", phone ? 0.9 : 0.2, 2)), colour: [YELLOW, INK], line: "Ask the awkward one.", side: phone ? "left" : "right", mood: "smug" },
    { id: "close", y: () => closeTop() - vh() * 0.3, at: inView(atop("#close-t", phone ? 0.8 : 0.56, 4)), colour: [BLUE, INK], line: "Two minutes. I’ll wait.", side: phone ? "left" : "right", mood: "smug", theme: "ink" },
    {
      id: "end",
      y: () => endTop() - vh() * 0.35,
      at: () => {
        const r = end.end.getBoundingClientRect();
        return { x: r.left + end.endI.x, y: r.top + end.endI.top - 14 * end.eu };
      },
      size: end.eTittle,
      colour: [YELLOW, INK],
      line: "Make a mess. We’ll fix it by the date.",
      side: "left",
      mood: "",
    },
  ];
  let perchY = [];
  const measure = () => {
    perchY = PERCH.map((p) => p.y());
  };
  let current = null;
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
    if (current === p.id) {
      return;
    }
    const first = current === null;
    current = p.id;
    dot.colour(p.colour[0], p.colour[1]);
    dot.mood(p.mood);
    dot.quiet();
    if (first && p.id === "hero") {
      return;
    }
    dot.state.side = p.side;
    dot.hop(p.at, {
      size: p.size || roam,
      done: scope.wrap(() => {
        if (p.line && current === p.id) {
          dot.talk(p.line, { side: p.side, theme: p.theme, ms: p.id === "end" ? 0 : 3400 });
        }
        if (p.id === "end") {
          // It lands on the i, and the whole word feels it.
          gsap.fromTo(".end-word .blk svg", { y: 0 }, { y: -end.eu * 7, duration: 0.15, yoyo: true, repeat: 1, stagger: { each: 0.05, from: "end" }, ease: "power2.out" });
          dot.flash("happy", 1.5);
          dot.wink();
        }
      }),
    });
  }

  // The mascot arrives last: it lands on the i, then wakes up.
  gsap.delayedCall(1.25, () => {
    if (current !== null && current !== "hero") {
      return;
    }
    current = "hero";
    dot.hop(onI, {
      size: tittle,
      rise: dot.state.y < 0 ? 0 : undefined,
      duration: dot.state.y < 0 ? 0.4 : undefined,
      done: scope.wrap(() => {
        if (current === "hero") {
          dot.talk(PERCH[0].line, { side: "left", ms: 0 });
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
    dot.state.x = stage.letterI.home.x;
    dot.state.y = -80;
  }
  dot.colour(YELLOW, INK);
  const promiseTl = buildPromise();
  const howTl = buildHow(scope, dot, phone);
  const toys = buildToys(scope, phone);
  buildNavThemes(scope);
  buildBoard(scope, phone);
  buildReveals(scope);
  const end = buildEnd(scope, phone);
  buildPerches(scope, dot, phone, { stage, promiseTl, howTl, toys, end });
}
