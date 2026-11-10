// Runs the site's motion. One core lives across routes (smooth scroll, the mascot, the curtain).
// Each route gets a scope: everything it starts is torn down when you leave it.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { SHIFTER } from "./glyphs";
import { makeDot } from "./kit";
import { loadRoute } from "./routes";

let core = null;

// Everything one page starts: tweens and triggers in a gsap context, listeners, ticker callbacks, worlds.
function makeScope()
{
  const ctx = gsap.context(() => {});
  const cleanups = [];
  let dead = false;

  const scope = {
    ctx,
    get dead()
    {
      return dead;
    },
    // Runs fn now. Tweens and triggers it makes belong to this page.
    run(fn)
    {
      if (!dead) {
        ctx.add(() => {
          fn();
        });
      }
    },
    // Wraps a callback that fires later (a listener, a mascot's done) so it obeys the same rule.
    wrap(fn)
    {
      return (...args) => {
        if (!dead) {
          ctx.add(() => {
            fn(...args);
          });
        }
      };
    },
    on(target, type, fn, opts)
    {
      const handler = scope.wrap(fn);
      target.addEventListener(type, handler, opts);
      cleanups.push(() => target.removeEventListener(type, handler, opts));
    },
    ticker(fn)
    {
      gsap.ticker.add(fn);
      cleanups.push(() => gsap.ticker.remove(fn));
    },
    world(w)
    {
      cleanups.push(() => w.stop());
      return w;
    },
    cleanup(fn)
    {
      cleanups.push(fn);
    },
    destroy()
    {
      dead = true;
      cleanups.splice(0).reverse().forEach((fn) => fn());
      ctx.revert();
    },
  };
  return scope;
}

// Columns of colour. Between pages they rise from the bottom one after another, then peel off the top the same way.
const BAND = { in: 0.5, out: 0.75, gap: 0.04, ease: "power4.inOut" };

function makeCurtain()
{
  const el = document.createElement("div");
  el.id = "curtain";
  el.setAttribute("aria-hidden", "true");
  const bands = Array.from({ length: 5 }, () => {
    const b = document.createElement("div");
    b.className = "cb";
    el.appendChild(b);
    return b;
  });
  // The first-load loader's star. It turns on the curtain when the next page is slow to arrive.
  const star = document.querySelector(".loader-star");
  if (star) {
    el.appendChild(star.cloneNode(true));
  }
  document.body.appendChild(el);
  gsap.set(bands, { yPercent: 100 });
  let safety = null;
  // One tween at a time. Killing it also drops its onComplete, so a cancelled link never navigates late.
  let anim = null;
  // Covering, or on its way to covering.
  let up = false;
  // A link is waiting for the cover to finish before it navigates.
  let leaving = false;
  // The columns in use: three on a phone, five wider than that.
  let live = bands;

  function stop()
  {
    if (anim) {
      anim.kill();
      anim = null;
    }
  }

  // If the next page never arrives, don't leave the screen covered. boot gives up on a page sooner than this.
  function guard()
  {
    if (safety) {
      safety.kill();
    }
    safety = gsap.delayedCall(9, () => curtain.out());
  }

  function cover(colour)
  {
    // Columns already part way across stay where they are, so a quick second change never jumps.
    const settled = !up && !anim;
    stop();
    up = true;
    el.classList.remove("is-slow");
    el.style.pointerEvents = "";
    const n = innerWidth < 720 ? 3 : 5;
    live = bands.slice(0, n);
    bands.forEach((b, i) => {
      b.style.display = i < n ? "" : "none";
      b.style.left = `${(i * 100) / n}%`;
      // A pixel over, so no seam of the page shows between two columns.
      b.style.width = `calc(${100 / n}% + 1px)`;
      b.style.background = colour;
    });
    if (settled) {
      gsap.set(live, { yPercent: 100 });
    }
    gsap.set(el, { autoAlpha: 1 });
    guard();
  }

  // The columns rise from the bottom, left to right.
  function rise(onComplete)
  {
    el.style.clipPath = "none";
    return gsap.to(live, { yPercent: 0, duration: BAND.in, ease: BAND.ease, stagger: BAND.gap, onComplete });
  }

  function go(done)
  {
    leaving = true;
    return () => {
      leaving = false;
      anim = null;
      done();
      // Motion gave up while this was covering: no page will boot to lift it, so lift it now.
      if (!document.documentElement.classList.contains("m")) {
        curtain.out();
      }
    };
  }

  const curtain = {
    leaving: () => leaving,
    isUp: () => up,
    // Grows from a rectangle to the whole screen, then calls done.
    over(rect, colour, done)
    {
      cover(colour);
      gsap.set(live, { yPercent: 0 });
      const c = { t: rect.top, r: innerWidth - rect.right, b: innerHeight - rect.bottom, l: rect.left };
      const paint = () => {
        el.style.clipPath = `inset(${c.t}px ${c.r}px ${c.b}px ${c.l}px)`;
      };
      paint();
      anim = gsap.to(c, { t: 0, r: 0, b: 0, l: 0, duration: 0.72, ease: "expo.inOut", onUpdate: paint, onComplete: go(done) });
    },
    // Any other link: the columns rise over the page, then done. They peel off once the next page is staged.
    fade(colour, done)
    {
      cover(colour);
      anim = rise(go(done));
    },
    // A page that is taking a while (a back or forward, a slow connection): cover it and turn the star.
    // A cover that is already coming up, and the link waiting on it, are left alone.
    wait(colour)
    {
      if (!up) {
        cover(colour);
        anim = rise();
      }
      el.classList.add("is-slow");
      guard();
    },
    out()
    {
      if (safety) {
        safety.kill();
        safety = null;
      }
      if (!up) {
        return;
      }
      stop();
      up = false;
      leaving = false;
      // The page underneath is live again as soon as the columns start to go.
      el.style.pointerEvents = "none";
      el.classList.remove("is-slow");
      anim = gsap.to(live, {
        yPercent: -100,
        duration: BAND.out,
        ease: BAND.ease,
        stagger: BAND.gap,
        onComplete: () => {
          anim = null;
          gsap.set(el, { autoAlpha: 0 });
          gsap.set(bands, { yPercent: 100 });
          el.style.clipPath = "none";
        },
      });
    },
  };
  return curtain;
}

// Ink, the darkest colour on the site, for the columns between pages.
function pageColour()
{
  return getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#070707";
}

// A link that goes to another page of this site, in this tab, through the router.
function isPageLink(a)
{
  if (!(a instanceof HTMLAnchorElement) || (a.target && a.target !== "_self") || a.hasAttribute("download")) {
    return false;
  }
  let url;
  try {
    url = new URL(a.href, location.href);
  } catch {
    return false;
  }
  // A file (a PDF, an image) isn't a page.
  return url.origin === location.origin && url.pathname !== location.pathname && !/\.[a-z0-9]+$/i.test(url.pathname);
}

function restSpot(dot)
{
  return () => {
    const size = dot.state.size;
    // It stands on the footer as that comes up, so it never sits on the footer's links.
    const foot = document.querySelector(".site-ft");
    const top = foot ? foot.getBoundingClientRect().top - 4 : innerHeight;
    return { x: innerWidth - size * 0.9, y: Math.min(innerHeight - 10, top) };
  };
}

function createCore()
{
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  const dot = makeDot();
  gsap.ticker.add(dot.keepVisible);
  const curtain = makeCurtain();
  const made = { lenis, dot, curtain, rest: restSpot(dot) };

  // Other code talks to the mascot through events on window, so nothing else has to load it.
  const events = {
    "mascot:say": ({ text, ms, side, theme }) => dot.talk(text, { ms, side, theme }),
    "mascot:quiet": () => dot.quiet(),
    "mascot:mood": ({ mood }) => dot.mood(mood),
    "mascot:flash": ({ mood, seconds }) => dot.flash(mood, seconds ?? 1),
    "mascot:colour": ({ colour, eye }) => dot.colour(colour, eye),
    "mascot:hop": ({ x, y, size, line, side, theme, ms }) => {
      dot.hop(() => ({ x, y }), {
        size,
        done() {
          if (line) {
            dot.talk(line, { side, theme, ms });
          }
        },
      });
    },
    "mascot:fling": ({ vx, vy, silent }) => dot.fling(vx ?? -260, vy ?? -1050, { silent }),
  };
  Object.entries(events).forEach(([name, fn]) => {
    addEventListener(name, (e) => fn(e.detail || {}));
  });

  // The menu sheet covers the page. Smooth scroll has to stop behind it.
  addEventListener("site:lock", (e) => {
    if (e.detail) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });

  // Any start button: it gets excited when you go near one.
  let toldStart = false;
  document.addEventListener("mouseover", (e) => {
    const a = e.target.closest ? e.target.closest(".js-start") : null;
    if (!a || a.contains(e.relatedTarget) || dot.away()) {
      return;
    }
    dot.flash("happy", 1.1);
    dot.jump();
    if (!toldStart) {
      toldStart = true;
      dot.talk("That one. Press that one.", { ms: 2000 });
    }
  });

  let passing = false;
  document.addEventListener("click", (e) => {
    const a = e.target.closest ? e.target.closest("a") : null;
    if (!a || passing) {
      return;
    }
    // The end of a drag isn't a click.
    if (a.dataset.dragged === "1") {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // Once motion has given up, links are plain links: no page would boot to lift a curtain.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button || !document.documentElement.classList.contains("m")) {
      return;
    }
    // A link is already on its way out: one page at a time.
    if (curtain.leaving()) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // Same-page anchors go through smooth scroll, which knows about the pinned sections.
    const href = a.getAttribute("href") || "";
    const hash = href.startsWith("#") ? href : href.startsWith("/#") && location.pathname === "/" ? href.slice(1) : null;
    if (hash && !a.classList.contains("skip")) {
      const target = hashTarget(hash);
      if (target) {
        e.preventDefault();
        e.stopPropagation();
        lenis.scrollTo(hash === "#main" ? 0 : target, { duration: 1.2 });
      }
      return;
    }
    // A coloured curtain grows out of what you pressed, then the real link fires.
    if (a.dataset.curtain) {
      e.preventDefault();
      e.stopPropagation();
      curtain.over(a.getBoundingClientRect(), a.dataset.curtain, () => {
        passing = true;
        a.click();
        passing = false;
      });
      return;
    }
    // Any other page here is covered first, so the next one never cuts in half-built.
    if (isPageLink(a)) {
      e.preventDefault();
      e.stopPropagation();
      curtain.fade(pageColour(), () => {
        passing = true;
        a.click();
        passing = false;
      });
    }
  }, true);

  // Tests can look inside. Nothing is on window unless a test asks for it first.
  if (window.__mDebug) {
    window.__mDebug({ gsap, ScrollTrigger, lenis, dot });
  }

  return made;
}

// A hash can be anything someone typed, so it never goes near a CSS selector.
function hashTarget(hash)
{
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

// The first page load opens behind the loader (layout.tsx). It wipes up once, then stays gone.
function liftLoader()
{
  const d = document.documentElement;
  if (d.classList.contains("m-in")) {
    return;
  }
  d.classList.add("m-in");
  setTimeout(() => d.classList.add("m-done"), 1000);
}

function fontsReady()
{
  return Promise.race([document.fonts.ready, new Promise((resolve) => {
    setTimeout(resolve, 2500);
  })]);
}

// Starts this route's motion. Returns destroy(). Safe to call destroy before the route has finished loading.
export function boot(pathname)
{
  if (!core) {
    core = createCore();
  }
  // Shifter only lives on the home page. Hidden now, not after this route's code and fonts have loaded.
  core.dot.hide(!SHIFTER || pathname !== "/");
  const main = document.querySelector("main");
  let scope = null;
  let stopped = false;
  let resizeCall = null;
  let width = innerWidth;
  let latest = 0;
  const staged = () => Boolean(main && main.dataset.ready);
  // Coming from another page (the first load has its own loader). Until this one is staged it's hidden
  // (globals.css). Slow to stage: the curtain covers it and turns the star. Never staged: the plain page shows.
  const later = document.documentElement.classList.contains("m-in");
  const slowCall = later ? setTimeout(() => {
    if (!stopped && !staged() && document.documentElement.classList.contains("m")) {
      core.curtain.wait(pageColour());
    }
  }, 400) : null;
  const giveUp = later ? setTimeout(() => {
    if (!stopped && !staged()) {
      failed();
    }
  }, 8000) : null;

  async function start()
  {
    // A resize can start this again while the last one is still loading. Only the newest may run.
    latest += 1;
    const turn = latest;
    const route = await loadRoute(pathname);
    await fontsReady();
    if (stopped || turn !== latest || !document.documentElement.classList.contains("m")) {
      return;
    }
    const mine = makeScope();
    scope = mine;
    // Arriving under the columns: they leave upward, so the top of the page clears last. The intro waits for
    // that, so it is seen and not spent under them.
    mine.lead = core.curtain.isUp() ? 0.6 : 0;
    core.dot.park(core.rest);
    core.dot.hide(!SHIFTER || pathname !== "/");
    // The film grain on soft pictures only moves while you can see it, so it isn't repainting all page long.
    const grain = new IntersectionObserver((seen) => {
      seen.forEach((e) => e.target.classList.toggle("is-live", e.isIntersecting));
    });
    document.querySelectorAll(".soft").forEach((el) => grain.observe(el));
    mine.cleanup(() => grain.disconnect());
    mine.run(() => {
      route.init(mine, core);
    });
    ScrollTrigger.refresh();
    if (main) {
      // Under the columns the page is already hidden, so it's shown at once: a fade would let the background
      // flash through as they lift.
      if (mine.lead) {
        main.style.transition = "none";
      }
      main.dataset.ready = "1";
      if (mine.lead) {
        void main.offsetHeight;
        main.style.transition = "";
      }
    }
    window.__mOk = true;
    liftLoader();
    core.curtain.out();
    if (location.hash) {
      const target = hashTarget(location.hash);
      if (target) {
        core.lenis.scrollTo(target, { immediate: true, force: true });
      }
    }
  }

  function end()
  {
    if (scope) {
      scope.destroy();
      scope = null;
    }
  }

  // Undoing the scope clears any text it hid, so the plain page that's left can be read.
  function failed()
  {
    end();
    core.dot.hide(true);
    clearTimeout(slowCall);
    clearTimeout(giveUp);
    document.documentElement.classList.remove("m");
    // A link mid-fade still goes. Its cover comes off once it has (curtain's go()).
    if (!core.curtain.leaving()) {
      core.curtain.out();
    }
  }

  // Only a real width change rebuilds: a phone's address bar changes the height all the time.
  function onResize()
  {
    if (innerWidth === width) {
      return;
    }
    width = innerWidth;
    if (resizeCall) {
      clearTimeout(resizeCall);
    }
    resizeCall = setTimeout(() => {
      end();
      start().catch(failed);
    }, 280);
  }
  addEventListener("resize", onResize);

  start().catch(failed);

  return () => {
    stopped = true;
    removeEventListener("resize", onResize);
    if (resizeCall) {
      clearTimeout(resizeCall);
    }
    clearTimeout(slowCall);
    clearTimeout(giveUp);
    end();
    if (main) {
      delete main.dataset.ready;
    }
    core.dot.park(core.rest);
    core.dot.hide(true);
    core.lenis.scrollTo(0, { immediate: true, force: true });
    core.lenis.start();
  };
}
