// Runs the site's motion. One core lives across routes (smooth scroll, the mascot, the curtain).
// Each route gets a scope: everything it starts is torn down when you leave it.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { SHIFTER } from "./glyphs";
import { makeDot } from "./kit";

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

function makeCurtain()
{
  const el = document.createElement("div");
  el.id = "curtain";
  el.setAttribute("aria-hidden", "true");
  document.body.appendChild(el);
  let safety = null;

  return {
    // Grows from a rectangle to the whole screen, then calls done.
    over(rect, colour, done)
    {
      gsap.killTweensOf(el);
      el.style.background = colour;
      gsap.set(el, { autoAlpha: 1 });
      const c = { t: rect.top, r: innerWidth - rect.right, b: innerHeight - rect.bottom, l: rect.left };
      const paint = () => {
        el.style.clipPath = `inset(${c.t}px ${c.r}px ${c.b}px ${c.l}px)`;
      };
      paint();
      gsap.to(c, { t: 0, r: 0, b: 0, l: 0, duration: 0.72, ease: "expo.inOut", onUpdate: paint, onComplete: done });
      if (safety) {
        safety.kill();
      }
      // If the next page never arrives, don't leave the screen covered.
      safety = gsap.delayedCall(5, () => this.out());
    },
    out()
    {
      if (safety) {
        safety.kill();
        safety = null;
      }
      if (gsap.getProperty(el, "autoAlpha") > 0) {
        gsap.to(el, { autoAlpha: 0, duration: 0.36, ease: "power2.out" });
      }
    },
  };
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
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) {
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

function loadRoute(pathname)
{
  if (pathname === "/") {
    return import("./home");
  }
  if (pathname.startsWith("/start")) {
    return import("./funnel");
  }
  if (pathname === "/products") {
    return import("./shelf");
  }
  if (pathname === "/how-it-works") {
    return import("./how");
  }
  return import("./inner");
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
      main.dataset.ready = "1";
    }
    window.__mOk = true;
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
    document.documentElement.classList.remove("m");
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
