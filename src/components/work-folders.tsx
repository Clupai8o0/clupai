import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import LiveClip from "@/components/live-clip";
import type { CaseStudy } from "@/data/cases";

const TONES = ["f-sage", "f-yellow", "f-ink"];

// Each build is a folder with its name and dates on the tab, like a bill with a show on it.
// On a big enough screen the folders stack up as you scroll, leaving each tab showing.
export default function WorkFolders({ items }: { items: CaseStudy[] })
{
  return (
    <div className="folders">
      {items.map((item, i) => {
        const quote = item.testimonial;
        return (
          <article
            key={item.slug}
            className={`folder ${TONES[i % TONES.length]}`}
            style={{ "--i": i } as CSSProperties}
          >
            <div className="folder-tab">
              <h3 className="t-name">
                <Link href={`/work/${item.slug}`}>{item.name}</Link>
              </h3>
              <p className="folder-when">{item.when}</p>
            </div>
            <div className="folder-body grid">
              <Link className="folder-pic" href={`/work/${item.slug}`} tabIndex={-1} aria-hidden="true">
                {item.clip ? (
                  <LiveClip src={item.clip.src} poster={item.clip.poster} label="" />
                ) : (
                  <Image src={item.picture.src} alt="" fill sizes="(max-width: 1099px) 100vw, 66vw" />
                )}
              </Link>
              <div className="folder-copy">
                <p className="meta t-small">
                  {item.took ? <strong>{item.took}</strong> : null}
                  <span>{item.role}</span>
                </p>
                <p>{item.line}</p>
                {quote ? (
                  <blockquote>
                    <p>“{quote.quote}”</p>
                    <cite>
                      {quote.name}, {quote.role}
                    </cite>
                  </blockquote>
                ) : (
                  <ul>
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
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
