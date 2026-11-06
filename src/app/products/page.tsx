import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { inWork, products, released, type Product } from "@/data/products";
import "../inner.css";
import "./products.css";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Software we make for ourselves, the same way we build for founders. See what’s out now and what’s still in the works.",
  alternates: { canonical: "/products" },
};

const PAD = ["A", "B", "C", "1", "2", "3"];
const IDLE = `${released.length} out. ${inWork.length} coming. 1 yours.`;

function SlotInner({ p }: { p: Product })
{
  const name: ReactNode = p.slug === "acknowledgement-force" ? <>Acknowledgement<br />Force</> : p.name;
  const longest = p.slug === "acknowledgement-force" ? 15 : p.name.length;
  const out = p.status === "released";
  return (
    <>
      <span className={`item ${p.tone} ${p.slug === "glow-up" ? "g" : ""}`} style={{ "--len": longest } as CSSProperties}>
        <span className="it-t">
          <span className="it-name">{name}</span>
          {p.poster ? <span className="it-post">{p.poster}</span> : null}
          <span className="it-line">{p.line}</span>
        </span>
        {p.image ? (
          <span className={`pic ${out ? "" : "blurred"}`}>
            <Image src={p.image.src} alt="" fill sizes="(max-width: 720px) 25vw, 12vw" />
          </span>
        ) : null}
        {out ? null : (
          <span className="it-tape" aria-hidden="true">
            In the works. In the works. In the works. In the works. In the works. In the works.
          </span>
        )}
      </span>
      <span className="lip">
        <b>{p.code}</b>
        <span>{p.badge}</span>
      </span>
    </>
  );
}

function Slot({ p }: { p: Product })
{
  // Glow Up and Yap have no page. Their slot still vends, then comes back: machine.js gives it a button role.
  if (p.poster) {
    return (
      <div className="slot is-shut" data-code={p.code} data-name={p.name} data-badge={p.badge}>
        <SlotInner p={p} />
      </div>
    );
  }
  return (
    <Link
      className="slot"
      href={`/products/${p.slug}`}
      data-code={p.code}
      data-name={p.name}
      data-badge={p.badge}
      data-out={p.status === "released" ? "1" : "0"}
    >
      <SlotInner p={p} />
    </Link>
  );
}

export default function ProductsPage()
{
  const top = products.filter((p) => p.code.startsWith("A"));
  const rest = products.filter((p) => !p.code.startsWith("A"));
  return (
    <div className="pg tone-blue market">
      <div className="room">
        <div className="mach" id="mach">
          <header className="mach-head">
            <h1>Press a code. Get a product.</h1>
            <p className="how-m">
              <span className="how-d">
                Press a slot or type a code on your keyboard.
                <br />
                Row A is out. Rows B and C are coming.
              </span>
              <span className="how-p">Tap a slot. Top row is out. The rest are coming.</span>
            </p>
            <p className="how-plain">Software we made for ourselves. The top row is out now, and the rest are coming.</p>
          </header>
          <div className="glass">
            <div className="rows" aria-hidden="true">
              <span>Out now</span>
              <span>In the works</span>
            </div>
            <div className="grid" id="grid">
              <h2 className="grp">Out now</h2>
              {top.map((p) => (
                <Slot key={p.slug} p={p} />
              ))}
              <h2 className="grp w">In the works</h2>
              {rest.map((p) => (
                <Slot key={p.slug} p={p} />
              ))}
              <Link className="slot" href="/start" data-code="C3" data-name="Yours" data-badge="Start a project" data-yours="1">
                <span className="item tone-yellow" style={{ "--len": 5 } as CSSProperties}>
                  <span className="it-t">
                    <span className="it-name">Yours</span>
                    <span className="it-post">Your product here.</span>
                  </span>
                </span>
                <span className="lip">
                  <b>C3</b>
                  <span>Start a project</span>
                </span>
              </Link>
            </div>
          </div>
          <div className="console">
            <div className="side">
              <div className="led" aria-live="polite" data-idle={IDLE}>
                <b id="ledA">Ready</b>
                <span id="ledB">{IDLE}</span>
              </div>
              <div className="pad" id="pad" role="group" aria-label="Keypad">
                {PAD.map((k) => (
                  <button key={k} type="button" data-k={k}>
                    {k}
                  </button>
                ))}
              </div>
              <p className="coin">No coin slot. Nothing here has a price tag from us.</p>
              <Link className="btn mach-start js-start" href="/start" data-curtain="#ffe100">
                Start a project
              </Link>
            </div>
            <div className="tray" id="tray" aria-hidden="true">
              <div className="flap" id="flap">
                Push
              </div>
            </div>
          </div>
        </div>
        <div className="floor" />
      </div>
      <section className="end tone-ink" aria-labelledby="end-h">
        <h2 id="end-h" className="g-huge" data-letters>
          Not in the machine? We can build yours too.
        </h2>
        <Link className="btn js-start" href="/start" data-curtain="#ffe100">
          Start a project
        </Link>
      </section>
    </div>
  );
}
