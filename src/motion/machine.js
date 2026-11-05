// /products: the vending machine. The slots are real links, so this only stages what happens on the way there.
import gsap from "gsap";
import { BLUE, INK, RED, YELLOW, isPhone, navFloor } from "./kit";
import { init as initInner } from "./inner";

const qs = (s, r = document) => r.querySelector(s);
const qa = (s, r = document) => [...r.querySelectorAll(s)];

// Lives across routes: the second press jams, then every third one.
let vends = 0;
const COLOURS = { "tone-blue": BLUE, "tone-red": RED, "tone-yellow": YELLOW, "tone-paper": "#f3f1ec", "tone-navy": "#06183a", "tone-ink": INK };

export function init(scope, core)
{
  initInner(scope, core);
  const { dot, curtain } = core;
  const phone = isPhone();
  const side = phone ? "left" : "above";
  const root = qs(".market");
  const mach = qs("#mach");
  const pad = qs("#pad");
  const ledBox = qs(".led");
  const ledA = qs("#ledA");
  const ledB = qs("#ledB");
  const IDLE = ledBox.dataset.idle;
  const slots = qa(".slot", qs("#grid"));
  const stretch = qs(".dot-b", dot.el); // The kit writes .dot-st every frame, so lean the body inside it.
  let typed = "";
  let busy = false;
  let leaning = true;

  const led = (a, b) => {
    ledA.textContent = a;
    ledB.textContent = b;
  };

  // Shut slots have no link, so they get their keyboard role here.
  qa(".is-shut", root).forEach((s) => {
    s.tabIndex = 0;
    s.setAttribute("role", "button");
    s.setAttribute("aria-label", `${s.dataset.code}, ${s.dataset.name}, ${s.dataset.badge}`);
    scope.cleanup(() => {
      s.removeAttribute("tabindex");
      s.removeAttribute("role");
      s.removeAttribute("aria-label");
    });
  });

  // Mascot, leaning on the side of the machine.
  const lean = () => {
    if (phone) {
      const t = qs(".console").getBoundingClientRect();
      return { x: innerWidth - 28, y: Math.max(navFloor(56), Math.min(t.top + 5, innerHeight - 90)) };
    }
    const r = mach.getBoundingClientRect();
    return { x: r.right + 58, y: Math.max(navFloor(104), Math.min(r.bottom, innerHeight - 6)) };
  };
  function leanOn()
  {
    if (!phone && leaning) {
      gsap.to(stretch, { rotation: -15, transformOrigin: "50% 100%", duration: 0.3, ease: "back.out(2)" });
    }
    dot.mood("smug");
  }
  dot.colour(YELLOW, INK);
  dot.hop(lean, {
    size: phone ? 56 : 104,
    done: scope.wrap(() => {
      // After the landing squash, which owns the stretch until it settles.
      gsap.delayedCall(0.7, scope.wrap(leanOn));
    }),
  });
  scope.cleanup(() => {
    gsap.killTweensOf(stretch);
    gsap.set(stretch, { clearProps: "transform,transformOrigin" });
    dot.mood("");
  });

  function kick(after)
  {
    gsap.set(stretch, { rotation: 0 });
    const toward = phone ? 1 : -1;
    gsap.timeline()
      .to(stretch, { x: 16 * -toward, rotation: 8 * -toward, duration: 0.22, ease: "power2.out" })
      .to(stretch, { x: -6 * -toward, rotation: -6 * -toward, duration: 0.07, ease: "power4.in" })
      .add(() => {
        gsap.fromTo(mach, { x: 0, rotation: 0 }, { keyframes: [{ x: -12, rotation: -0.7, duration: 0.05 }, { x: 9, rotation: 0.5, duration: 0.06 }, { x: -5, rotation: -0.25, duration: 0.07 }, { x: 0, rotation: 0, duration: 0.09 }], ease: "none", clearProps: "transform" });
        dot.flash("happy", 1.2);
        after();
      })
      .to(stretch, { x: 0, rotation: 0, duration: 0.25 }, "+=0.1");
  }

  function follow(a, rect, colour)
  {
    if (a) {
      curtain.over(rect, colour, () => {
        passing = true;
        a.click();
        passing = false;
      });
    }
  }

  let passing = false;

  function press(code)
  {
    const s = slots.find((x) => x.dataset.code === code);
    if (!s || busy || scope.dead) {
      return;
    }
    busy = true;
    typed = "";
    vends += 1;
    const yours = s.dataset.yours === "1";
    const jams = vends % 3 === 2 && !yours;
    const shut = s.classList.contains("is-shut");
    const out = s.dataset.out === "1";
    led(code, yours ? "Not built yet. Could be yours." : (out ? `${s.dataset.name}. ${s.dataset.badge}.` : `In the works. ${s.dataset.badge}.`));
    const it = qs(".item", s);
    const r = it.getBoundingClientRect();
    const v = it.cloneNode(true);
    v.classList.add("vend");
    v.style.left = `${r.left}px`;
    v.style.top = `${r.top}px`;
    v.style.width = `${r.width}px`;
    v.style.height = `${r.height}px`;
    root.append(v);
    scope.cleanup(() => v.remove());
    it.classList.add("empty");
    const toneOf = [...it.classList].find((c) => c.startsWith("tone-"));

    const drop = () => {
      const tray = qs("#tray").getBoundingClientRect();
      const fall = tray.top + tray.height / 2 - r.top - r.height / 2;
      const toX = tray.left + tray.width / 2 - r.left - r.width / 2;
      const land = gsap.timeline({
        onComplete: scope.wrap(() => {
          v.remove();
          gsap.to("#flap", { rotationX: 62, duration: 0.2, ease: "power2.out", transformPerspective: 400 });
          if (shut) {
            dot.talk("Nothing to show yet. Back it goes.", { ms: 2400, side });
            gsap.delayedCall(1.1, scope.wrap(() => {
              gsap.set("#flap", { rotationX: 0 });
              it.classList.remove("empty");
              gsap.fromTo(it, { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "back.out(2)", clearProps: "transform,opacity" });
              led("Ready", IDLE);
              busy = false;
            }));
            return;
          }
          dot.quiet();
          follow(s, qs("#tray").getBoundingClientRect(), COLOURS[toneOf] || YELLOW);
        }),
      });
      land.to(v, { y: fall, x: toX, rotation: 7, scale: 0.62, duration: Math.max(0.35, Math.abs(fall) / 1300), ease: "power2.in" })
        .to(v, { y: fall - 22, rotation: -3, duration: 0.1, ease: "power2.out" })
        .to(v, { y: fall + 6, rotation: 0, duration: 0.1, ease: "power2.in" })
        .to(v, { y: fall + 8, duration: 0.2 });
    };

    if (jams) {
      gsap.timeline()
        .to(v, { scale: 1.05, duration: 0.14, ease: "power2.out" })
        .to(v, { y: r.height * 0.32, rotation: 13, duration: 0.2, ease: "power3.in" })
        .to(v, { rotation: 10, y: r.height * 0.29, duration: 0.12, ease: "power1.out" })
        .add(() => {
          led(code, "Jammed.");
          dot.flash("annoyed", 1.2);
          dot.talk("Stuck. Watch this.", { ms: 1500, side });
        })
        .add(() => kick(() => {
          dot.talk("Fixed. That’s the job.", { ms: 1400, side });
          led(code, "Unjammed.");
          drop();
        }), "+=1.2");
    } else {
      gsap.timeline().to(v, { scale: 1.05, y: -4, duration: 0.16, ease: "power2.out" }).add(drop);
    }
  }

  function key(k)
  {
    if (busy) {
      return;
    }
    if (/[ABC]/.test(k)) {
      typed = k;
    } else if (typed.length === 1) {
      typed += k;
    } else {
      led(`?${k}`, "Letter first. A, B or C.");
      return;
    }
    const btn = qs(`[data-k="${k}"]`, pad);
    if (btn) {
      btn.classList.add("down");
      gsap.delayedCall(0.14, () => btn.classList.remove("down"));
    }
    led(typed + (typed.length === 1 ? "_" : ""), typed.length === 1 ? "Now a number." : "");
    if (typed.length === 2) {
      const c = typed;
      typed = "";
      gsap.delayedCall(0.18, scope.wrap(() => press(c)));
    }
  }

  // Capture, so the drop runs before Next's link does. Cmd-click and friends stay a normal link.
  scope.on(qs("#grid"), "click", (e) => {
    if (passing) {
      return;
    }
    const s = e.target.closest(".slot");
    if (!s || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    press(s.dataset.code);
  }, true);
  scope.on(pad, "click", (e) => {
    const k = e.target.dataset ? e.target.dataset.k : null;
    if (k) {
      key(k);
    }
  });
  scope.on(window, "keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || qs(".nav-sheet")) {
      return;
    }
    const focus = document.activeElement;
    if (e.key === "Enter" || e.key === " ") {
      if (focus && focus.classList.contains("is-shut")) {
        e.preventDefault();
        press(focus.dataset.code);
      }
      return;
    }
    const k = e.key.toUpperCase();
    if (/^[ABC123]$/.test(k)) {
      key(k);
    }
  });

  const hello = gsap.delayedCall(1.6, scope.wrap(() => {
    if (!busy) {
      dot.talk("No coins. Just press.", { ms: 2800, side });
    }
  }));
  scope.cleanup(() => hello.kill());
}
