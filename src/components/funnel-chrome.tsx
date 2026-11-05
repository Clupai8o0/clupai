import Link from "next/link";
import type { ReactNode } from "react";
import { Mark } from "@/components/wordmark";

const PICTURES = ["scaffold", "blocks", "desk"];

export function FunnelTop({ label, children }: { label: string; children?: ReactNode })
{
  return (
    <header className="f-top">
      <Link className="f-logo" href="/" aria-label="Clupai home">
        <Mark height={30} />
      </Link>
      <p className="f-count">{label}</p>
      <div className="f-acts">
        {children}
        <Link className="f-link" href="/">
          Close
        </Link>
      </div>
    </header>
  );
}

// Soft pictures behind the questions, mood only, and the box the tower falls into.
export function FunnelBack({ picture }: { picture: number })
{
  return (
    <>
      <div className="f-soft" aria-hidden="true">
        {PICTURES.map((name, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={name} className={i === picture ? "is-on" : undefined} src={`/soft/${name}.webp`} alt="" />
        ))}
      </div>
      <div className="f-tower" aria-hidden="true" />
    </>
  );
}
