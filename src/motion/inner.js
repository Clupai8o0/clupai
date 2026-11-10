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

// A picture, a film or a data-reveal block. In a page's head it's uncovered, not faded.
const isMedia = (el) => el.matches("[data-reveal], figure, picture, img, video");

// Sits in a heading's head, so that head's entrance runs it.
const inHead = (el) => Boolean(el.parentElement && el.parentElement.querySelector(":scope > [data-squash]"));

// A layer laid over the head (a faint picture behind the heading). It fades up to its own opacity, never past it.
const isLayer = (el) => /^(absolute|fixed)$/.test(getComputedStyle(el).position);

// A picture is uncovered from the bottom up while the image inside settles from a slight zoom.
// A figure with a caption: only the picture is uncovered, with no zoom (the figure doesn't clip, so a zoomed
// picture would sit over the caption), and the caption lifts in after it. Adds it all to tl at the given time.
function uncover(tl, el, at)
{
  tl.set(el, { autoAlpha: 1 }, at);
  const pic = el.querySelector("img, video");
  const caption = el.querySelector(":scope > figcaption");
  const box = caption && pic ? pic : el;
  tl.fromTo(box, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power4.inOut" }, at);
  if (pic && box !== pic) {
    tl.fromTo(pic, { scale: 1.18, yPercent: 6 }, { scale: 1, yPercent: 0, duration: 1.9, ease: "expo.out" }, at);
  }
  if (caption) {
    tl.fromTo(caption, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: "expo.out" }, at + 0.7);
  }
}

// A page's big heading and the head it sits in, as one staged entrance:
//   1. whatever sits above the heading (a date, a label) lifts in,
//   2. the heading's letters rise out of their masks, one after another,
//   3. the lines under it lift in, one after another,
//   4. a picture is uncovered from the bottom up.
// CSS hides the whole head until motion is ready, so nothing is shown and then snatched away. data-squash
function initSquash(scope)
{
  const lead = scope.lead || 0;
  qa("[data-squash]").forEach((el) => {
    const lc = letterDrop(scope, el);
    const kids = el.parentElement ? [...el.parentElement.children] : [el];
    const at = kids.indexOf(el);
    const layers = kids.filter((n) => n !== el && isLayer(n));
    const above = kids.slice(0, at).filter((n) => !layers.includes(n));
    const after = kids.slice(at + 1).filter((n) => !layers.includes(n));
    const below = after.filter((n) => !isMedia(n));
    const media = after.filter(isMedia);
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    if (layers.length) {
      tl.from(layers, { autoAlpha: 0, duration: 1.6, ease: "power2.out" }, lead);
    }
    if (above.length) {
      tl.fromTo(above, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: "expo.out", stagger: 0.08 }, lead);
    }
    // A long heading keeps the same pace: the wave across all its letters never takes longer than 0.6 s.
    const each = Math.min(0.016, 0.6 / Math.max(1, lc.length));
    tl.fromTo(lc, { yPercent: 115 }, { yPercent: 0, duration: 1.15, ease: "expo.out", stagger: each }, lead + 0.08);
    if (below.length) {
      tl.fromTo(below, { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2, ease: "expo.out", stagger: 0.1 }, lead + 0.4);
    }
    media.forEach((m, i) => uncover(tl, m, lead + 0.5 + i * 0.12));
  });
}

// data-rise: comes up and fades in. data-rise="0.2" delays it. In a heading's head, the head runs it.
function initRise()
{
  qa("[data-rise]").forEach((el) => {
    if (inHead(el)) {
      return;
    }
    gsap.from(el, { y: 30, autoAlpha: 0, duration: 1, delay: Number(el.dataset.rise) || 0, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
  });
}

// data-reveal: a picture uncovered from the bottom up as it comes into view. In a heading's head, the head runs it.
function initReveal()
{
  qa("[data-reveal]").forEach((el) => {
    if (inHead(el)) {
      return;
    }
    uncover(gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } }), el, 0);
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
  initReveal();
  initParallax();
  initWipes(scope);
  initFall();
  initNav(scope);
  ScrollTrigger.refresh();
}
