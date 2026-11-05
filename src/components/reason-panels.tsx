"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

const PANELS: { tab: string; title: string; body: ReactNode; tone: string; src: string; alt: string; face?: boolean }[] = [
  {
    tab: "The date",
    title: "A date in writing, with our money on it.",
    body: "Miss it and everything unpaid is cancelled. We finish the build for free.",
    tone: "tone-ink",
    src: "/work/kdg/new/hero.webp",
    alt: "The King Double Glazing home page, built for a client.",
  },
  {
    tab: "The person",
    title: "The same person, scope to launch.",
    body: "The person who sells it scopes it, then builds it or directs the build.",
    tone: "tone-red",
    src: "/sam.jpeg",
    alt: "Samridh Limbu, founder of Clupai.",
    face: true,
  },
  {
    tab: "The code",
    title: "Your code, from day one.",
    body: "It sits in your GitHub while we work. Hosting and domain go in your name.",
    tone: "tone-blue",
    src: "/products/cstack/cover.webp",
    alt: "The cstack README, one of our own products.",
  },
  {
    tab: "The proof",
    title: "Software you can click today.",
    body: (
      <>
        Don’t take our word for it. Open{" "}
        <Link className="ln-u" href="/work/hoddle-melbourne">
          Hoddle
        </Link>{" "}
        or{" "}
        <Link className="ln-u" href="/work/king-double-glazing">
          King Double Glazing’s price tool
        </Link>{" "}
        and use them.
      </>
    ),
    tone: "tone-paper",
    src: "/work/hoddle/new/home.webp",
    alt: "The Hoddle home page.",
  },
];

// Four tinted panels side by side. One stays open; click a sliver to open it. Stacked on a phone.
export default function ReasonPanels()
{
  const [open, setOpen] = useState(0);

  return (
    <div className="acc">
      {PANELS.map((p, i) => (
        <article key={p.tab} className={`acc-panel ${p.tone}${open === i ? " is-open" : ""}`}>
          <button
            type="button"
            className="acc-toggle"
            aria-expanded={open === i}
            aria-controls={`reason-${i}`}
            onClick={() => setOpen(i)}
          >
            <span>{p.tab}</span>
          </button>
          <div className="acc-body" id={`reason-${i}`}>
            <div className="acc-text">
              <h3 className="acc-t">{p.title}</h3>
              <p>{p.body}</p>
            </div>
            <div className="acc-pic">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 1099px) 100vw, 45vw"
                style={p.face ? { objectPosition: "44% 22%" } : undefined}
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
