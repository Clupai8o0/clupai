import type { ReactNode } from "react";

export type LegalSection = {
  id: string;
  heading: string;
  body: ReactNode;
};

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
})
{
  return (
    <>
      <header className="page-head">
        <h1 className="page-title">{title}</h1>
        <div className="axis page-lead">
          <div className="l" />
          <div className="r">
            <p className="t-lead" style={{ maxWidth: "30em" }}>
              {intro}
            </p>
            <p className="t-small" style={{ marginTop: 18 }}>
              Last updated {updated}
            </p>
          </div>
        </div>
      </header>

      <div className="sec" style={{ paddingTop: 0 }}>
        <div className="axis">
          <div className="l" />
          <div className="r legal-body">
            {sections.map((s) => (
              <section key={s.id} id={s.id}>
                <h2>{s.heading}</h2>
                {s.body}
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
