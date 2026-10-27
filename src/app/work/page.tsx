import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import FinalCTA from "@/components/final-cta";
import WorkTile from "@/components/work-tile";
import { visibleCases as cases } from "@/data/cases";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Websites and apps we've shipped for businesses, schools and events, with real screens and results from each project.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const [lead, ...rest] = cases;

  return (
    <>
      <Nav page="work" />

      <section className="wk-hero">
        <h1 className="wk-title">Shipped, scored, in the wild.</h1>
        <p className="wk-lede">
          Websites and apps we&apos;ve built for clients and for ourselves,
          shown with real screens from each shipped product.
        </p>
      </section>

      <section className="wk-list" aria-label="Case studies">
        {lead && <WorkTile c={lead} lead preload />}
        <div className="wk-grid">
          {rest.map((c) => (
            <WorkTile key={c.slug} c={c} />
          ))}
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </>
  );
}
