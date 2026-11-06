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
    gsap.to(lc, { yPercent: 0, duration: 0.9, stagger: 0.02, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 86%", once: true } });
  });
}

// A page's big heading: its letters rise into place and settle, with no bounce and no change of shape, and
// whatever follows it in the same block comes up just after, so the head arrives as one piece.
// CSS hides all of it until motion is ready, so the text is never shown and then snatched away. data-squash
function initSquash(scope)
{
  qa("[data-squash]").forEach((el) => {
    const lc = letterDrop(scope, el);
    const rest = [];
    for (let n = el.nextElementSibling; n; n = n.nextElementSibling) {
      rest.push(n);
    }
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    tl.fromTo(lc, { y: "0.32em", opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.018 });
    if (rest.length) {
      tl.fromTo(rest, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: "expo.out", stagger: 0.08 }, 0.25);
    }
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
