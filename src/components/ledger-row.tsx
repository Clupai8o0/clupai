import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import LiveClip from "@/components/live-clip";

type RowLink = { href: string; label: string; primary?: boolean };

// One dated entry: a colour panel meeting a picture that runs off the edge of the page.
export default function LedgerRow({
  name,
  href,
  meta,
  tag,
  line,
  children,
  links,
  picture,
  clip,
  tone,
  flip = false,
  loadFirst = false,
}: {
  name: string;
  /** The case page. The name and the picture both link to it. */
  href?: string;
  meta: string[];
  tag?: string;
  line: string;
  children?: ReactNode;
  links: RowLink[];
  picture: { src: string; alt: string };
  /** A short loop of the real thing, shown in place of the picture. */
  clip?: { src: string; poster: string };
  tone: string;
  flip?: boolean;
  loadFirst?: boolean;
})
{
  const image = clip ? (
    <LiveClip src={clip.src} poster={clip.poster} label={href ? "" : picture.alt} />
  ) : (
    <Image
      src={picture.src}
      alt={picture.alt}
      fill
      sizes="(max-width: 1099px) 100vw, 50vw"
      loading={loadFirst ? "eager" : "lazy"}
    />
  );

  return (
    <article className={`row ${tone}${flip ? " row--flip" : ""}`}>
      <div className="row-copy">
        <h3 className="t-head rise">{href ? <Link href={href}>{name}</Link> : name}</h3>
        <p className="meta t-small rise rise-2">
          {meta.map((m, i) => (i === 0 ? <strong key={m}>{m}</strong> : <span key={m}>{m}</span>))}
          {tag ? <span className="tag">{tag}</span> : null}
        </p>
        <p className="rise rise-2">{line}</p>
        {children}
        <div className="links rise rise-3">
          {links.map((link) =>
            link.primary ? (
              <RowButton key={link.href} link={link} />
            ) : (
              <RowText key={link.href} link={link} />
            ),
          )}
        </div>
      </div>
      {href ? (
        <Link className="row-pic" href={href} tabIndex={-1} aria-hidden="true">
          {image}
        </Link>
      ) : (
        <div className="row-pic">{image}</div>
      )}
    </article>
  );
}

function RowButton({ link }: { link: RowLink })
{
  return link.href.startsWith("/") ? (
    <Link className="btn" href={link.href}>
      {link.label}
    </Link>
  ) : (
    <a className="btn" href={link.href} rel="noreferrer">
      {link.label}
    </a>
  );
}

function RowText({ link }: { link: RowLink })
{
  return link.href.startsWith("/") ? (
    <Link className="tlink" href={link.href}>
      {link.label}
    </Link>
  ) : (
    <a className="tlink" href={link.href} rel="noreferrer">
      {link.label}
    </a>
  );
}
