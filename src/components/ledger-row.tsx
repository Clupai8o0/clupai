import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type RowLink = { href: string; label: string; primary?: boolean };

// One dated entry: the name and facts left of the axis, the picture running to the right edge.
export default function LedgerRow({
  name,
  href,
  meta,
  tag,
  line,
  children,
  links,
  picture,
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
  loadFirst?: boolean;
})
{
  const image = (
    <Image
      src={picture.src}
      alt={picture.alt}
      fill
      sizes="(max-width: 820px) 100vw, 58vw"
      loading={loadFirst ? "eager" : "lazy"}
    />
  );

  return (
    <article className="axis ledger-row">
      <div className="l">
        <h3 className="t-name">{href ? <Link href={href}>{name}</Link> : name}</h3>
        <p className="ledger-meta t-small">
          {meta.map((m, i) => (i === 0 ? <strong key={m}>{m}</strong> : <span key={m}>{m}</span>))}
          {tag ? <span className="tag">{tag}</span> : null}
        </p>
        <p>{line}</p>
        {children}
        <div className="ledger-links">
          {links.map((link) =>
            link.primary ? (
              <RowButton key={link.href} link={link} />
            ) : (
              <RowText key={link.href} link={link} />
            ),
          )}
        </div>
      </div>
      <div className="r">
        {href ? (
          <Link className="ledger-pic rise" href={href} tabIndex={-1} aria-hidden="true">
            {image}
          </Link>
        ) : (
          <div className="ledger-pic rise">{image}</div>
        )}
      </div>
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
