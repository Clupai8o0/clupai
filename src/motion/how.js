// /how-it-works: the home page's tower, plus the generic page motion.
import { BLUE, INK, YELLOW, clamp, isPhone, navFloor } from "./kit";
import { init as initInner } from "./inner";
import { buildHow } from "./tower";

export function init(scope, core)
{
  const { dot } = core;
  const phone = isPhone();
  const roam = phone ? 44 : 72;
  const howTl = buildHow(scope, dot, phone);
  initInner(scope, core);

  // While the tower builds, the mascot climbs it, as it does on the home page.
  const st = howTl.scrollTrigger;
  const scrollAt = (t) => st.start + (st.end - st.start) * (t / howTl.duration());
  const atop = (sel, fx = 0.5, dy = 0) => {
    const el = document.querySelector(sel);
    return () => {
      const r = el.getBoundingClientRect();
      return {
        x: clamp(r.left + r.width * fx, roam / 2 + 8, innerWidth - roam / 2 - 8),
        y: clamp(r.top + dy, navFloor(roam), innerHeight - 6),
      };
    };
  };
  const STOPS = [
    { t: 0, at: atop(".tw-pad", 0.5, 1), colour: [BLUE, INK], mood: "", line: "Watch where your money goes.", theme: "ink" },
    { t: 1.08, at: atop(".tw-50", 0.5, 1), colour: [BLUE, INK], mood: "" },
    { t: 1.93, at: atop(".tw-30", 0.5, 1), colour: [BLUE, INK], mood: "" },
    { t: 2.76, at: atop(".tw-30", 0.93, 1), colour: [BLUE, INK], mood: "smug" },
    { t: 3.52, at: atop("#miss", 0.5, 2), colour: [YELLOW, INK], mood: "smug", line: "Press it. Go on." },
  ];
  let now = null;
  scope.ticker(() => {
    const y = scrollY;
    let stop = null;
    if (y >= st.start - innerHeight * 0.2 && y <= st.end + innerHeight * 0.3) {
      STOPS.forEach((s) => {
        if (s.t === 0 || y >= scrollAt(s.t)) {
          stop = s;
        }
      });
    }
    if (stop === now) {
      return;
    }
    now = stop;
    dot.quiet();
    if (!stop) {
      dot.mood("");
      dot.colour(YELLOW, INK);
      dot.hop(core.rest, { size: roam });
      return;
    }
    dot.colour(stop.colour[0], stop.colour[1]);
    dot.mood(stop.mood);
    dot.state.side = "left";
    dot.hop(stop.at, {
      size: roam,
      done: scope.wrap(() => {
        if (now === stop && stop.line) {
          dot.talk(stop.line, { side: "left", theme: stop.theme, ms: 3400 });
        }
      }),
    });
  });
}
