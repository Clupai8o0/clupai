import Link from "next/link";

export default function SiteFooter()
{
  return (
    <footer className="ft on-ink">
      <div className="ft-mark" aria-hidden="true">
        clup<span>ai</span>
      </div>
      <div className="ft-grid">
        <div className="ft-big">
          <p>
            <a className="tlink" href="mailto:hello@clupai.com">
              hello@clupai.com
            </a>
          </p>
          <p>Melbourne, Australia</p>
        </div>
        <div>
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
              <Link className="tlink" href="/start">
                Build Risk Check
              </Link>
            </li>
          </ul>
        </div>
        <div>
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
