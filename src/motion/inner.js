// Generic motion for any page, driven by data attributes. The list is in the brief's "Motion contract".
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitLetters } from "./text";

const qa = (s, r = document) => [...r.querySelectorAll(s)];

function letterDrop(scope, el)
{
  const restore = splitLetters(el);
  scope.cleanup(restore);
  return el.querySelectorAll(".lc");
}

// A line of letters comes up out of a mask. data-letters
function initLetters(scope)
{
  qa("[data-letters]").forEach((el) => {
    const lc = letterDrop(scope, el);
    gsap.set(lc, { yPercent: 130 });
    gsap.to(lc, { yPercent: 0, duration: 0.9, stagger: 0.02, ease: "back.out(1.5)", scrollTrigger: { trigger: el, start: "top 86%", once: true } });
  });
}

// Letters drop from above and squash on landing. Never hides the text first if it's above the fold. data-squash
function initSquash(scope)
{
  qa("[data-squash]").forEach((el) => {
    const lc = letterDrop(scope, el);
    gsap.fromTo(lc, { y: "-0.9em", opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.42,
      ease: "power3.in",
      stagger: 0.03,
      onStart() {
        el.style.minHeight = `${el.getBoundingClientRect().height}px`;
      },
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
    gsap.fromTo(lc, { scaleX: 1.12, scaleY: 0.78, transformOrigin: "50% 100%" }, { scaleX: 1, scaleY: 1, duration: 0.7, ease: "elastic.out(1, 0.45)", stagger: 0.03, delay: 0.42, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
  });
}

// data-rise: comes up and fades in. data-rise="0.2" delays it.
function initRise()
{
  qa("[data-rise]").forEach((el) => {
    gsap.from(el, { y: 30, autoAlpha: 0, duration: 1, delay: Number(el.dataset.rise) || 0, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
  });
}

// data-parallax="4": the element drifts that many percent either way as it crosses the screen.
function initParallax()
{
  qa("[data-parallax]").forEach((el) => {
    const n = Number(el.dataset.parallax) || 4;
    gsap.fromTo(el, { yPercent: -n }, { yPercent: n, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
  });
}

// data-wipe: the element is uncovered in one straight edge, from the bottom up, as it enters. Scrubbed with the scroll.
function initWipes(scope)
{
  qa("[data-wipe]").forEach((el) => {
    scope.cleanup(() => {
      el.style.clipPath = "";
    });
    gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 40%", scrub: true } });
  });
}

// data-nav="#fg,#bg" on a section: the nav takes those colours while it's under it.
function initNav(scope)
{
  const nav = document.querySelector(".nav");
  const zones = qa("[data-nav]").map((el) => {
    const [fg, bg] = el.dataset.nav.split(",");
    return { el, fg, bg };
  });
  if (!nav || !zones.length) {
    return;
  }
  let now = null;
  scope.ticker(() => {
    const hit = zones.find((z) => {
      const r = z.el.getBoundingClientRect();
      return r.top <= 40 && r.bottom > 40;
    }) || null;
    if (hit === now) {
      return;
    }
    now = hit;
    if (hit) {
      nav.style.setProperty("--nav", hit.fg);
      nav.style.setProperty("--navf", hit.bg);
    } else {
      nav.style.removeProperty("--nav");
      nav.style.removeProperty("--navf");
    }
  });
  scope.cleanup(() => {
    nav.style.removeProperty("--nav");
    nav.style.removeProperty("--navf");
  });
}

// data-fall: a letter that has come off the wordmark drops and lands where the CSS leaves it.
function initFall()
{
  qa("[data-fall]").forEach((el, i) => {
    gsap.from(el, { y: -innerHeight, duration: 0.9 + i * 0.08, delay: 0.2 + i * 0.09, ease: "bounce.out" });
  });
}

// Shifter isn't on these pages: it only lives on the home page, as the dot of the i (boot.js hides it).
export function init(scope)
{
  initLetters(scope);
  initSquash(scope);
  initRise();
  initParallax();
  initWipes(scope);
  initFall();
  initNav(scope);
  ScrollTrigger.refresh();
}
