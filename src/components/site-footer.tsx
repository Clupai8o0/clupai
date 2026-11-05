import Link from "next/link";
import type { CSSProperties } from "react";

const BLOCKS = [
  { letter: "C", h: "100%", block: "var(--ink)", color: "var(--paper)" },
  { letter: "L", h: "74%", block: "var(--accent)", color: "var(--ink)" },
  { letter: "U", h: "88%", block: "var(--sage)", color: "var(--ink)" },
  { letter: "P", h: "66%", block: "var(--yellow)", color: "var(--ink)" },
  { letter: "A", h: "100%", block: "var(--ink)", color: "var(--paper)" },
  { letter: "I", h: "80%", block: "var(--accent)", color: "var(--ink)" },
];

export default function SiteFooter()
{
  return (
    <footer className="ft f-white">
      <div className="ft-mark" aria-hidden="true">
        {BLOCKS.map((b) => (
          <span
            key={b.letter}
            style={{ "--h": b.h, "--block": b.block, color: b.color } as CSSProperties}
          >
            {b.letter}
          </span>
        ))}
      </div>
      <div className="ft-grid">
        <div className="rise">
          <p className="ft-big">
            <a className="tlink" href="mailto:hello@clupai.com">
              hello@clupai.com
            </a>
          </p>
          <p className="ft-place">Melbourne, Australia</p>
        </div>
        <div className="rise rise-2">
          <h2>Clupai</h2>
          <ul>
            <li>
              <Link className="tlink" href="/work">
                Work
              </Link>
            </li>
            <li>
              <Link className="tlink" href="/products">
                Products
              </Link>
            </li>
            <li>
              <Link className="tlink" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="tlink" href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="tlink" href="/start">
                Build Risk Check
              </Link>
            </li>
          </ul>
        </div>
        <div className="rise rise-3">
          <h2>Elsewhere</h2>
          <ul>
            <li>
              <a className="tlink" href="https://github.com/Clupai8o0" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a className="tlink" href="https://linkedin.com/company/clupai" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <Link className="tlink" href="/privacy">
                Privacy
              </Link>
            </li>
            <li>
              <Link className="tlink" href="/terms">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="ft-legal t-small">
        <p>© 2026 Sam Limbu, trading as Clupai. ABN 56 228 849 452.</p>
        <p>
          <a className="tlink" href="#main">
            Back to top
          </a>
        </p>
      </div>
    </footer>
  );
}
