import Link from "next/link";
import { Mark } from "@/components/wordmark";

const COLUMNS = [
  {
    h: "Company",
    items: [
      { label: "Work", href: "/work" },
      { label: "Products", href: "/products" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
    ],
  },
  {
    h: "Start",
    items: [
      { label: "Build Risk Check", href: "/start" },
      { label: "Contact", href: "/contact" },
      { label: "hello@clupai.com", href: "mailto:hello@clupai.com" },
    ],
  },
  {
    h: "Elsewhere",
    items: [
      { label: "GitHub", href: "https://github.com/Clupai8o0" },
      { label: "LinkedIn", href: "https://linkedin.com/company/clupai" },
    ],
  },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode })
{
  if (href.startsWith("/")) {
    return <Link href={href}>{children}</Link>;
  }
  return (
    <a href={href} rel={href.startsWith("http") ? "noreferrer" : undefined}>
      {children}
    </a>
  );
}

export default function SiteFooter()
{
  return (
    <footer className="site-ft">
      <div className="site-ft-top">
        <div className="site-ft-brand">
          <Link className="site-ft-logo" href="/" aria-label="clupai home">
            <Mark height={22} accent />
          </Link>
          <p>Software built and launched by a fixed date. From Melbourne, Australia.</p>
          <span className="site-ft-chip">ABN 56 228 849 452 · Melbourne</span>
        </div>
        {COLUMNS.map((c) => (
          <nav key={c.h} className="site-ft-col" aria-label={c.h}>
            <h2>{c.h}</h2>
            <ul>
              {c.items.map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="site-ft-base">
        <span>© 2026 Sam Limbu · trading as clupai</span>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <a className="site-ft-up" href="#main">Back to top</a>
      </div>
    </footer>
  );
}
