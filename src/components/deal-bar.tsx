"use client";

import { useState, useSyncExternalStore } from "react";

const LENGTHS = [6, 8, 12];
const SCOPING_WEEKS = 2;
const NOW = Date.now();
const noopSubscribe = () => () => undefined;

function weekLabel(today: number | null, weeks: number): string
{
  if (today === null) {
    return weeks === 0 ? "Start" : `Week ${weeks}`;
  }
  const date = new Date(today + weeks * 7 * 24 * 60 * 60 * 1000);
  return date.toLocaleDateString("en-AU", { day: "numeric", month: "short" });
}

// The deal as one bar: scoping, then build, with the three payments marked on real dates.
// Dates are only an example worked out from today, because the real one is set in scoping.
export default function DealBar()
{
  const [build, setBuild] = useState(8);
  const [missed, setMissed] = useState(false);
  const today = useSyncExternalStore(noopSubscribe, () => NOW, () => null);

  const firstVersion = Math.ceil(build / 2);
  const total = SCOPING_WEEKS + build;
  const parts = [
    { start: 0, size: SCOPING_WEEKS },
    { start: SCOPING_WEEKS, size: firstVersion },
    { start: SCOPING_WEEKS + firstVersion, size: build - firstVersion },
  ];

  return (
    <div data-ui>
      <div className="deal-controls">
        <div role="group" aria-label="Length of the build">
          <p className="t-small" style={{ marginBottom: 6 }}>
            Example build
          </p>
          <div className="seg">
            {LENGTHS.map((n) => (
              <button key={n} type="button" aria-pressed={build === n} onClick={() => setBuild(n)}>
                {n} weeks
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="t-small" style={{ marginBottom: 6 }}>
            What if
          </p>
          <div className="seg">
            <button type="button" aria-pressed={missed} onClick={() => setMissed((v) => !v)}>
              We miss the date
            </button>
          </div>
        </div>
      </div>

      <div className="bar" aria-hidden="true">
        {parts.map((p, i) => (
          <i
            key={i}
            className={`s${i}${i === 2 && missed ? " is-missed" : ""}`}
            style={{
              transform: `translateX(${(p.start / total) * 100}%) scaleX(${p.size / total})`,
            }}
          />
        ))}
        {missed ? <span className="bar-free">We finish it free</span> : null}
      </div>

      <ol className="plan" aria-live="polite">
        <li>
          <span className="date">{weekLabel(today, 0)}</span>
          <span>Scoping starts. It’s paid, and it comes off the build.</span>
          <span className="pay" />
        </li>
        <li>
          <span className="date">{weekLabel(today, SCOPING_WEEKS)}</span>
          <span>You have a scope, a prototype, a price and a date. You sign.</span>
          <span className="pay">50%</span>
        </li>
        <li>
          <span className="date">{weekLabel(today, SCOPING_WEEKS + firstVersion)}</span>
          <span>First working version. You click it before you pay.</span>
          <span className="pay">30%</span>
        </li>
        <li>
          <span className="date">{weekLabel(today, total)}</span>
          <span>{missed ? "The date passes and it isn’t live." : "Live, by the date we agreed."}</span>
          <span className="pay">{missed ? <s>20%</s> : "20%"}</span>
          {missed ? (
            <span className="free-note">
              Anything unpaid is cancelled. Here, that’s the last 20%. We finish it free and you keep everything built.
            </span>
          ) : null}
        </li>
      </ol>
      <p className="t-small" style={{ marginTop: 22 }}>
        An example worked out from today. Your real date is set in scoping.
      </p>
    </div>
  );
}
