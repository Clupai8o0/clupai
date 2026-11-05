import type { ReactNode } from "react";
import ScreenStrip from "@/components/screen-strip";

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
      <header className="head f-sage">
        <h1 className="t-giant">{title}</h1>
        <div className="head-lead">
          <div>
            <p className="t-lead">{intro}</p>
            <p className="t-small" style={{ marginTop: 18 }}>
              Last updated {updated}
            </p>
          </div>
        </div>
      </header>

      <div className="sec grid">
        <div className="legal-body">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="rise">
              <h2>{s.heading}</h2>
              {s.body}
            </section>
          ))}
        </div>
      </div>

      <ScreenStrip />
    </>
  );
}
