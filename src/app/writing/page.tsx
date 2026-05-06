import Nav from "@/components/nav";
import Footer from "@/components/footer";
import WritingGrid from "@/components/writing-grid";
import RssSection from "@/components/rss-section";
import { postMetas } from "@/data/writing";

export default function WritingPage() {
  return (
    <>
      <Nav page="writing" />

      {/* Header */}
      <div
        className="px-6 md:px-12 pt-20 pb-10"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-5">
          <div>
            <div className="cp-eyebrow mb-3">Writing · essays · working notes</div>
            <h1
              className="cp-display"
              style={{ fontSize: "clamp(2.75rem, 6vw, 5.5rem)", margin: 0 }}
            >
              Things we&apos;ve figured out.
              <br />
              <span style={{ color: "var(--accent)" }}>Mostly the hard way.</span>
            </h1>
          </div>
          <div className="hidden md:block text-right shrink-0">
            <div className="cp-mono mb-1" style={{ color: "var(--text-muted)" }}>
              {postMetas.length} essays · RSS available
            </div>
            <div className="cp-mono" style={{ color: "var(--text-dim)" }}>
              One post every 3–4 weeks. No newsletter guilt.
            </div>
          </div>
        </div>
        {/* Mobile essay count */}
        <div className="cp-mono mt-4 md:hidden" style={{ color: "var(--text-dim)" }}>
          {postMetas.length} essays · one every 3–4 weeks
        </div>
      </div>

      {/* Interactive grid with filters */}
      <WritingGrid posts={postMetas} />

      {/* RSS */}
      <RssSection />

      <Footer />
    </>
  );
}
