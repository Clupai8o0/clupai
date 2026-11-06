import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { inWork, released, type Product } from "@/data/products";
import "../inner.css";
import "./products.css";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Software we make for ourselves, the same way we build for founders. See what’s out now and what’s still in the works.",
  alternates: { canonical: "/products" },
};

// Each box: its width as a share of its column, its height in vw on a wide screen, and in px on a phone.
const SIZE: Record<string, [number, number, number]> = {
  tempo: [0.86, 27.8, 250],
  "acknowledgement-force": [0.96, 25.3, 230],
  cstack: [0.74, 28.5, 250],
  kairos: [0.9, 22.2, 220],
  morgue: [0.8, 24, 240],
  "glow-up": [0.88, 20.8, 240],
  yap: [0.76, 24, 240],
  govchat: [0.9, 22.2, 220],
};

// The curtain that grows out of a box on the way to its page takes the box's colour.
const CURTAIN: Record<string, string> = {
  "tone-blue": "#4da3ff",
  "tone-red": "#c8102e",
  "tone-yellow": "#ffe100",
  "tone-paper": "#f3f1ec",
  "tone-navy": "#06183a",
  "tone-ink": "#070707",
};

const TAPE = "In the works. In the works. In the works. In the works. In the works. In the works.";

function boxStyle(p: Product): CSSProperties
{
  const [w, h, hp] = SIZE[p.slug] ?? [0.86, 24, 240];
  const longest = p.slug === "acknowledgement-force" ? 15 : p.name.length;
  return { "--bw": w, "--h": h, "--hp": `${hp}px`, "--len": longest } as CSSProperties;
}

function BoxInner({ p }: { p: Product })
{
  const name: ReactNode = p.slug === "acknowledgement-force" ? <>Acknowledgement<br />Force</> : p.name;
  const out = p.status === "released";
  return (
    <>
      <span className="bx-name">{name}</span>
      {p.image ? (
        <span className="bx-pic">
          <Image src={p.image.src} alt="" fill sizes="(max-width: 720px) 45vw, 22vw" draggable={false} />
        </span>
      ) : (
        <span className="bx-post">{p.poster}</span>
      )}
      <span className="bx-bar" aria-hidden="true" />
      {out ? null : (
        <span className="tape" aria-hidden="true">
          {TAPE}
        </span>
      )}
    </>
  );
}

function Box({ p }: { p: Product })
{
  const cls = `bx ${p.tone} ${p.tone === "tone-paper" ? "edge" : ""} ${p.status === "released" ? "" : "wip"} ${p.image ? "" : "post"}`;
  // Glow Up and Yap have no page yet, so their boxes are just boxes.
  if (p.poster) {
    return (
      <div className={cls} style={boxStyle(p)}>
        <BoxInner p={p} />
      </div>
    );
  }
  return (
    <Link className={cls} style={boxStyle(p)} href={`/products/${p.slug}`} data-curtain={CURTAIN[p.tone]} draggable={false}>
      <BoxInner p={p} />
    </Link>
  );
}

function Col({ p }: { p: Product })
{
  return (
    <div className="col">
      <div className="bay">
        <Box p={p} />
      </div>
      <div className="plank" />
      <p className="tk">
        <b>{p.badge}</b>
        {p.line}
      </p>
    </div>
  );
}

function Shelf({ items, bay, children }: { items: Product[]; bay: number; children?: ReactNode })
{
  return (
    <div className="shelf" style={{ "--bay": bay } as CSSProperties}>
      {items.map((p) => (
        <Col key={p.slug} p={p} />
      ))}
      {children}
    </div>
  );
}

const tallest = (items: Product[]) => Math.max(...items.map((p) => (SIZE[p.slug] ?? [0, 24])[1]));

export default function ProductsPage()
{
  return (
    <div className="pg tone-paper shelf-pg">
      <header className="sh-hero">
        <h1>Proof we ship. Pull one.</h1>
        <p>
          <span className="how-d">Click</span>
          <span className="how-p">Tap</span> a box to open it.
          <span className="how-m"> Drag one sideways to knock it over.</span>
        </p>
      </header>

      <section aria-labelledby="out-h">
        <div className="sh-hd">
          <h2 id="out-h">Out now</h2>
          <small>Eye level</small>
        </div>
        <Shelf items={released} bay={tallest(released)}>
          <div className="col yours">
            <div className="bay">
              <div className="gap">
                <b>This spot is empty. Could be yours.</b>
                <Link className="btn js-start" href="/start" data-curtain="#ffe100">
                  Start a project
                </Link>
              </div>
            </div>
            <div className="plank" />
            <p className="tk">
              <b>Yours</b>
              We can build it too.
            </p>
          </div>
        </Shelf>
      </section>

      <section aria-labelledby="wip-h">
        <div className="sh-hd">
          <h2 id="wip-h">In the works</h2>
          <small>Taped up. Being built.</small>
        </div>
        <Shelf items={inWork} bay={tallest(inWork)} />
      </section>

      <section className="end tone-ink" aria-labelledby="end-h">
        <h2 id="end-h" className="g-huge" data-letters>
          Your box isn’t on the shelf yet. We can build yours too.
        </h2>
        <Link className="btn js-start" href="/start" data-curtain="#ffe100">
          Start a project
        </Link>
      </section>

      <button type="button" className="tidy" hidden>
        Stand them back up
      </button>
    </div>
  );
}
