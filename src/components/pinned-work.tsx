"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LiveClip from "@/components/live-clip";
import type { CaseStudy } from "@/data/cases";

// Small index, large picture. The list scrolls, the picture stays and wipes to whichever
// entry is in the middle of the screen. On a phone each entry carries its own picture.
export default function PinnedWork({ items }: { items: CaseStudy[] })
{
  const [active, setActive] = useState(0);
  const entries = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (seen) => {
        for (const entry of seen) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    entries.current.forEach((el) => {
      if (el) {
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pin">
      <div>
        {items.map((item, i) => {
          const quote = item.testimonial;
          return (
            <article
              key={item.slug}
              className="pin-entry"
              data-index={i}
              ref={(el) => {
                entries.current[i] = el;
              }}
            >
              <Link className="pin-pic" href={`/work/${item.slug}`} tabIndex={-1} aria-hidden="true">
                <Image src={item.picture.src} alt="" width={1280} height={800} sizes="100vw" />
              </Link>
              <h3 className="t-name">
                <Link href={`/work/${item.slug}`}>{item.name}</Link>
              </h3>
              <p className="ledger-meta t-small" style={{ marginTop: 10, marginBottom: 0 }}>
                <strong>{item.when}</strong>
                {item.took ? <span>{item.took}</span> : null}
                <span>{item.role}</span>
              </p>
              <p style={{ marginTop: 14 }}>{item.line}</p>
              {quote ? (
                <blockquote>
                  <p>“{quote.quote}”</p>
                  <cite>
                    {quote.name}, {quote.role}
                  </cite>
                </blockquote>
              ) : (
                <ul className="side-facts">
                  {item.facts.map((f) => (
                    <li key={f.k}>{f.v}</li>
                  ))}
                </ul>
              )}
              <p className="links">
                <Link className="tlink" href={`/work/${item.slug}`}>
                  Read how we built it
                </Link>
                {item.url ? (
                  <a className="tlink" href={item.url.href} rel="noreferrer">
                    {item.url.label}
                  </a>
                ) : null}
              </p>
            </article>
          );
        })}
      </div>
      <div>
        <div className="pin-stage" aria-hidden="true">
          {items.map((item, i) => (
            <div key={item.slug} className={`pin-frame${i <= active ? " is-on" : ""}`} style={{ zIndex: i }}>
              {item.clip ? (
                <LiveClip src={item.clip.src} poster={item.clip.poster} label="" />
              ) : (
                <Image src={item.picture.src} alt="" fill sizes="58vw" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
