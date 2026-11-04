"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Work", href: "/work" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
];

export const CTA_LABEL = "Get your Build Risk Check";

export default function SiteHeader()
{
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  // While the menu covers the page, the page can't take focus or scroll.
  useEffect(() => {
    if (!open) {
      return;
    }
    const button = menuButton.current;
    const behind = document.querySelectorAll<HTMLElement>("main, footer");
    const wide = window.matchMedia("(min-width: 821px)");
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    document.body.style.overflow = "hidden";
    behind.forEach((el) => {
      el.inert = true;
    });
    sheet.current?.querySelector("a")?.focus();
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", close);

    return () => {
      document.body.style.overflow = "";
      behind.forEach((el) => {
        el.inert = false;
      });
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", close);
      button?.focus();
    };
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="hd">
        <div className="hd-left">
          <Link className="hd-mark" href="/" aria-label="Clupai home" onClick={() => setOpen(false)}>
            clup<span>ai</span>
          </Link>
          <nav className="hd-tab" aria-label="Main">
            {links.map((l) => (
              <Link key={l.href} href={l.href} aria-current={isCurrent(l.href) ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        {pathname.startsWith("/start") ? null : (
          <Link className="hd-cta" href="/start">
            {CTA_LABEL}
          </Link>
        )}
        <button
          type="button"
          className="hd-menu"
          ref={menuButton}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>
      {open && (
        <div className="sheet on-field" id="site-menu" ref={sheet}>
          <nav aria-label="Menu">
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <Link className="btn btn--white" href="/start" onClick={() => setOpen(false)}>
              {CTA_LABEL}
            </Link>
            <p className="t-small" style={{ marginTop: 10 }}>
              Free. 2 minutes.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
