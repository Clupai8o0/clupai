"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { questions } from "@/lib/risk-check";

// The first question of the risk check, offered in a small card a few seconds after a page opens.
// It never blocks the page: you can read on, close it, or answer. Closed once, it stays closed for the visit.
const KEY = "clupai-nudge";
const DELAY = 6000;
const COLOURS = ["#4da3ff", "#ffe100", "#c8102e", "#f3f1ec"];
const first = questions[0]!;

function closedBefore()
{
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

function remember()
{
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    // Private mode can refuse storage. Then it can come back on the next page, which is fine.
  }
}

export default function StartNudge()
{
  const pathname = usePathname();
  const [shown, setShown] = useState(false);
  const [gone, setGone] = useState(false);
  const onFunnel = pathname.startsWith("/start");

  useEffect(() => {
    if (onFunnel || gone || closedBefore()) {
      return;
    }
    // On the home page the same question is already on screen in its own section; don't stack a copy over it.
    const ask = document.getElementById("ask");
    let askInView = false;
    const watch = ask ? new IntersectionObserver(([e]) => {
      askInView = e!.isIntersecting;
      if (askInView) {
        setShown(false);
      }
    }) : null;
    if (ask && watch) {
      watch.observe(ask);
    }
    const timer = window.setTimeout(() => {
      if (!askInView) {
        setShown(true);
      }
    }, DELAY);
    return () => {
      window.clearTimeout(timer);
      if (watch) {
        watch.disconnect();
      }
    };
  }, [onFunnel, gone, pathname]);

  useEffect(() => {
    if (!shown) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shown]);

  function close()
  {
    remember();
    setShown(false);
    setGone(true);
  }

  if (onFunnel || gone) {
    return null;
  }

  return (
    <aside className={`nudge${shown ? " is-on" : ""}`} aria-labelledby="nudge-h" aria-hidden={!shown} inert={!shown}>
      <div className="nudge-top">
        <p className="nudge-k">Build Risk Check · about two minutes</p>
        <button type="button" className="nudge-x" onClick={close} aria-label="Close">
          <svg viewBox="0 0 14 14" aria-hidden="true"><path d="M1 1l12 12M13 1L1 13" /></svg>
        </button>
      </div>
      <h2 id="nudge-h" className="nudge-h">{first.title}</h2>
      <p className="nudge-sub">Pick one to start.</p>
      <div className="nudge-a">
        {first.answers.map((a, i) => (
          <Link key={a.key} href={`/start?what=${a.key}`} data-curtain={COLOURS[i % COLOURS.length]} onClick={remember} style={{ "--c": COLOURS[i % COLOURS.length] } as React.CSSProperties}>
            <i aria-hidden="true" />
            <span>{a.label}</span>
            <b aria-hidden="true">→</b>
          </Link>
        ))}
      </div>
    </aside>
  );
}
