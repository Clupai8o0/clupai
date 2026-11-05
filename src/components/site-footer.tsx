import Link from "next/link";

export default function SiteFooter()
{
  return (
    <footer className="site-ft">
      <p className="site-ft-place">
        Melbourne, Australia · <a href="mailto:hello@clupai.com">hello@clupai.com</a>
      </p>
      <nav className="site-ft-links" aria-label="Footer">
        <Link href="/work">Work</Link>
        <Link href="/products">Products</Link>
        <Link href="/how-it-works">How it works</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/start">Build Risk Check</Link>
      </nav>
      <p className="site-ft-legal">© 2026 Sam Limbu, trading as Clupai. ABN 56 228 849 452.</p>
      <nav className="site-ft-links site-ft-more" aria-label="More">
        <a href="https://github.com/Clupai8o0" rel="noreferrer">
          GitHub
        </a>
        <a href="https://linkedin.com/company/clupai" rel="noreferrer">
          LinkedIn
        </a>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <a href="#main">Back to top</a>
      </nav>
    </footer>
  );
}
