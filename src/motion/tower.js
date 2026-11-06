// The money, as a tower: home and /how-it-works share it. The markup is the .how section.
import gsap from "gsap";
import Matter from "matter-js";
import { makeWorld } from "./kit";

const { Bodies, Body } = Matter;
const qs = (s, r = document) => r.querySelector(s);
const qa = (s, r = document) => [...r.querySelectorAll(s)];
const vh = () => innerHeight;

// dot is null on the home page, where Shifter keeps off the middle of the page.
export function buildHow(scope, dot, phone)
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
      dot?.talk("Good. Now you know.", { ms: 2200, side: phone ? "above" : "left" });
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
    dot?.talk("See? You stop paying.", { ms: 3200, side: phone ? "above" : "left" });
    // The button goes off under the mascot as well.
    dot?.fling(phone ? 120 : 260, -1400, { silent: true });
  }

  missBtn.disabled = false;
  scope.on(missBtn, "click", pressMiss);
  scope.cleanup(() => {
    resetMiss();
    missBtn.disabled = true;
  });
  return howTl;
}
