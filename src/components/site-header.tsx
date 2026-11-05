"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Mark } from "@/components/wordmark";

const links = [
  { label: "Work", href: "/work" },
  { label: "Products", href: "/products" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
];

export const CTA_LABEL = "Start a project";

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
    const wide = window.matchMedia("(min-width: 721px)");
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("site:lock", { detail: true }));
    behind.forEach((el) => {
      el.inert = true;
    });
    sheet.current?.querySelector("a")?.focus();
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", close);

    return () => {
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("site:lock", { detail: false }));
      behind.forEach((el) => {
        el.inert = false;
      });
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", close);
      button?.focus();
    };
  }, [open]);

  // "page" only on the page itself. Deeper pages, like a single case, mark their section with "true".
  const currentState = (href: string) => {
    if (pathname === href) {
      return "page";
    }
    return pathname.startsWith(`${href}/`) ? "true" : undefined;
  };

  return (
    <>
      <header className="nav" data-over={pathname === "/"}>
        <Link className="nav-logo" href="/" aria-label="Clupai home" onClick={() => setOpen(false)}>
          <Mark height={30} className="nav-mark" />
        </Link>
        <nav className="nav-r" aria-label="Main">
          {links.map((l) => (
            <Link className="nav-link" key={l.href} href={l.href} aria-current={currentState(l.href)}>
              {l.label}
            </Link>
          ))}
          {pathname.startsWith("/start") ? null : (
            <Link className="btn nav-btn js-start" href="/start" data-curtain="#ffe100">
              {CTA_LABEL}
            </Link>
          )}
          <button
            type="button"
            className="nav-menu"
            ref={menuButton}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>
      </header>
      {open && (
        <div className="nav-sheet" id="site-menu" ref={sheet}>
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
          <Link className="btn" href="/start" onClick={() => setOpen(false)}>
            {CTA_LABEL}
          </Link>
        </div>
      )}
    </>
  );
}
