// The money, as a tower: home and /how-it-works share it. The markup is the .how section.
import gsap from "gsap";
import Matter from "matter-js";
import { makeWorld } from "./kit";

const { Bodies, Body } = Matter;
const qs = (s, r = document) => r.querySelector(s);
const qa = (s, r = document) => [...r.querySelectorAll(s)];
const vh = () => innerHeight;

export function buildHow(scope, phone)
{
  const blocks = { b20: qs(".tw-20"), b30: qs(".tw-30"), b50: qs(".tw-50"), pad: qs(".tw-pad") };
  const stepEls = qa(".st");
  const missBtn = qs("#miss");
  const fallLayer = qs("#how-fall");
  const howEl = qs("#how");
  const missWord = qs(".miss-w", missBtn);
  const missCue = qs(".miss-k", missBtn);
  const homes = [];
  let missWorld = null;
  let missed = false;
  let missTl = null;

  function label(word, cue)
  {
    missWord.textContent = word;
    missCue.textContent = cue;
  }

  function resetMiss()
  {
    if (missTl) {
      missTl.kill();
      missTl = null;
    }
    if (missWorld) {
      missWorld.stop();
      missWorld = null;
    }
    homes.splice(0).forEach(([el, parent]) => {
      el.removeAttribute("style");
      parent.appendChild(el);
    });
    gsap.killTweensOf([".stick", blocks.b50]);
    gsap.set(".stick", { scale: 0, xPercent: -50, yPercent: -50, rotation: -5 });
    gsap.set(blocks.b50, { x: 0 });
    // Back in its slot. Opacity and scale belong to the scroll timeline, which has finished showing it by now.
    gsap.set(missBtn, { x: 0, y: 0, rotation: 0, opacity: 1, scale: 1 });
    howEl.classList.remove("is-missed", "is-hit");
    missed = false;
    label("Miss the date", "Press it");
  }

  gsap.set(stepEls.slice(1), { autoAlpha: 0 });
  gsap.set([blocks.b20, blocks.b30, blocks.b50], { y: -vh() * 1.3 });
  gsap.set(blocks.pad, { scaleX: 0 });
  gsap.set("#flag", { scaleY: 0 });
  gsap.set(".tw-t", { opacity: 0 });
  gsap.set(missBtn, { autoAlpha: 0, scale: 0.92 });
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
  // Blocks land like something heavy: they speed up as they fall and stop dead. Nothing changes shape;
  // the block underneath takes the weight with a 3px knock.
  const drop = (b, below, at) => {
    howTl.to(b, { y: 0, duration: 0.3, ease: "power3.in" }, at);
    if (below) {
      howTl.to(below, { y: 3, duration: 0.03, ease: "power1.out" }, at + 0.3)
        .to(below, { y: 0, duration: 0.12, ease: "power2.out" }, at + 0.33);
    }
  };
  howTl.to(blocks.pad, { scaleX: 1, duration: 0.3, ease: "power3.out" }, 0.05);
  swap(0, 1, 0.75);
  drop(blocks.b50, null, 0.78);
  howTl.to(".tw-50 .tw-t", { opacity: 1, duration: 0.1 }, 1.1);
  swap(1, 2, 1.6);
  drop(blocks.b30, blocks.b50, 1.63);
  howTl.to(".tw-30 .tw-t", { opacity: 1, duration: 0.1 }, 1.95);
  swap(2, 3, 2.4);
  drop(blocks.b20, blocks.b30, 2.43);
  howTl.to(".tw-20 .tw-t", { opacity: 1, duration: 0.1 }, 2.75);
  howTl.to("#flag", { scaleY: 1, duration: 0.2, ease: "power3.out" }, 2.82);
  swap(3, 4, 3.3);
  howTl.to(howEl, { backgroundColor: "#4da3ff", duration: 0.2 }, 3.3);
  howTl.to(blocks.pad, { backgroundColor: "#070707", color: "#f3f1ec", duration: 0.2 }, 3.3);
  howTl.to(missBtn, { autoAlpha: 1, scale: 1, duration: 0.2, ease: "power3.out" }, 3.46);
  howTl.to({}, { duration: 0.75 }, 3.66);

  // Press it: the missed date flies into the tower like a missile, and the unpaid blocks come apart.
  function pressMiss()
  {
    if (missTl) {
      return;
    }
    if (missed) {
      resetMiss();
      return;
    }
    missed = true;
    howEl.classList.add("is-missed");
    const hr = howEl.getBoundingClientRect();
    const br = missBtn.getBoundingClientRect();
    const tr = qs(".i-30").getBoundingClientRect();
    // It hits the 30% block on the side facing it, half way up.
    const from = { x: br.left + br.width / 2, y: br.top + br.height / 2 };
    const side = tr.left + tr.width / 2 > from.x ? 1 : -1;
    const hit = { x: side > 0 ? tr.left + tr.width * 0.12 : tr.right - tr.width * 0.12, y: tr.top + tr.height / 2 };
    const dx = hit.x - from.x;
    const dy = hit.y - from.y;
    const aim = gsap.utils.clamp(-35, 35, (Math.atan2(dy, dx * side) * 180) / Math.PI) * side;

    missTl = gsap.timeline({ onComplete() { missTl = null; } });
    // A short pull back, then it goes.
    missTl.to(missBtn, { x: -dx * 0.04, y: -dy * 0.04, rotation: aim, duration: 0.18, ease: "power2.out" })
      .to(missBtn, { x: dx, y: dy, duration: 0.32, ease: "power3.in" })
      .add(() => explode(hr, side))
      .to(missBtn, { opacity: 0, duration: 0.08 }, ">")
      // When the pieces have landed it comes back to its slot as the way to undo.
      .add(() => {
        gsap.set(missBtn, { x: 0, y: 0, rotation: 0 });
        label("Put it back", "Press again");
      }, "+=0.9")
      .to(missBtn, { opacity: 1, duration: 0.3, ease: "power2.out" });
  }

  function explode(hr, side)
  {
    howEl.classList.add("is-hit");
    missWorld = makeWorld({ gravity: 1.8 });
    missWorld.walls(hr.width, hr.height);
    const solidOf = (el) => {
      const r = el.getBoundingClientRect();
      missWorld.solid(Bodies.rectangle(r.left + r.width / 2 - hr.left, r.top + r.height / 2 - hr.top, r.width, r.height, { isStatic: true }));
    };
    solidOf(blocks.b50);
    solidOf(blocks.pad);
    const k = phone ? 0.5 : 1;
    // The 30% takes the hit and is thrown away from it; the roof goes up and over.
    [[".i-30", 15, -9, 0.16], [".i-20", 8, -15, -0.12]].forEach(([sel, vx, vy, spin], n) => {
      const el = qs(sel);
      const r = el.getBoundingClientRect();
      homes.push([el, el.parentElement]);
      el.style.position = "absolute";
      el.style.left = "0";
      el.style.top = "0";
      el.style.width = `${r.width}px`;
      el.style.height = `${r.height}px`;
      fallLayer.appendChild(el);
      const o = { restitution: 0.1, friction: 0.6, density: 0.002 };
      const cx0 = r.left + r.width / 2 - hr.left;
      // The 20% is the roof: a triangle, so it falls like one.
      const b = sel === ".i-20"
        ? Bodies.fromVertices(cx0, r.top + (r.height * 2) / 3 - hr.top, [[{ x: 0, y: -(r.height * 2) / 3 }, { x: r.width / 2, y: r.height / 3 }, { x: -r.width / 2, y: r.height / 3 }]], o)
        : Bodies.rectangle(cx0, r.top + r.height / 2 - hr.top, r.width, r.height, o);
      missWorld.add(el, b, r.left - hr.left, r.top - hr.top);
      Body.setVelocity(b, { x: side * vx * k, y: vy * (phone ? 0.7 : 1) });
      Body.setAngularVelocity(b, side * spin);
      gsap.to(qs(".stick", el), { scale: 1, duration: 0.35, delay: 0.5 + n * 0.08, ease: "power3.out" });
    });
    gsap.to("#stick-paid", { scale: 1, duration: 0.35, delay: 0.7, ease: "power3.out" });
    gsap.to("#stick-free", { scale: 1, duration: 0.35, delay: 0.86, ease: "power3.out" });
    // The paid half stays up, but feels it.
    gsap.timeline()
      .to(blocks.b50, { x: side * 9, duration: 0.05, ease: "power2.out" })
      .to(blocks.b50, { x: side * -5, duration: 0.07, ease: "power1.inOut" })
      .to(blocks.b50, { x: 0, duration: 0.18, ease: "power2.out" });
  }

  missBtn.disabled = false;
  scope.on(missBtn, "click", pressMiss);
  scope.cleanup(() => {
    resetMiss();
    missBtn.disabled = true;
  });
  return howTl;
}
