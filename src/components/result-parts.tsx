"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import CalBooking from "@/components/cal-booking";
import { decodePrefill, PREFILL_KEY } from "@/lib/prefill";

const COUNT_MS = 1100;
const noopSubscribe = () => () => undefined;

function useStoredPrefill()
{
  const raw = useSyncExternalStore(
    noopSubscribe,
    () => {
      try {
        return window.sessionStorage.getItem(PREFILL_KEY) ?? "";
      } catch {
        return "";
      }
    },
    () => null,
  );
  return { ready: raw !== null, prefill: useMemo(() => decodePrefill(raw), [raw]) };
}

export function ScoreCount({ score }: { score: number })
{
  const [shown, setShown] = useState(score);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      setShown(Math.round(score * (1 - Math.pow(1 - t, 3))));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  return (
    <p className="r-num">
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{score}</span>
      <span className="sr-only"> out of 100</span>
    </p>
  );
}

export function NotSentNote()
{
  const { prefill } = useStoredPrefill();
  if (!prefill.notSent) {
    return null;
  }
  return (
    <p className="f-small">
      We couldn’t email you a copy just now, so bookmark this page to keep your result.
    </p>
  );
}

export function ResultBooking({ projectType, budget }: { projectType: string; budget: string })
{
  const { ready, prefill } = useStoredPrefill();
  if (!ready) {
    return (
      <div className="bk bk--wait">
        <noscript>
          <p>
            Email{" "}
            <a className="tlink" href="mailto:hello@clupai.com">
              hello@clupai.com
            </a>{" "}
            and we’ll find a time.
          </p>
        </noscript>
      </div>
    );
  }
  return <CalBooking prefill={{ ...prefill, projectType, budget }} />;
}
