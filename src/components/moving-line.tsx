"use client";

import { useEffect, useRef, type ReactNode } from "react";

const SPEED = 40;
const COPIES = [0, 1, 2, 3];

function Track({ words }: { words: string })
{
  return (
    <div className="line-track">
      {COPIES.map((n) => (
        <span key={n} style={{ display: "contents" }}>
          <span className="line-word">{words}</span>
          <span className="line-dot" />
        </span>
      ))}
    </div>
  );
}

// One line of type moving across the page at a constant speed. It's set twice: dark on the
// ground, then light and clipped to the square, so letters turn light as they cross the picture.
export default function MovingLine({ words, children }: { words: string; children: ReactNode })
{
  const band = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = band.current;
    const track = el?.querySelector<HTMLElement>(".line-track");
    if (!el || !track) {
      return;
    }
    const setSpeed = () => {
      el.style.setProperty("--line-seconds", `${track.scrollWidth / 2 / SPEED}s`);
    };
    setSpeed();
    const observer = new ResizeObserver(setSpeed);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="band" ref={band}>
      <div className="line" aria-hidden="true">
        <Track words={words} />
      </div>
      <div className="band-pic">{children}</div>
      <div className="line line--over" aria-hidden="true">
        <Track words={words} />
      </div>
    </div>
  );
}
