import type { ReactNode } from "react";
import "@/app/inner.css";

export type LegalSection = {
  id: string;
  heading: string;
  body: ReactNode;
};

// Plain and readable on purpose: no motion, no mascot lines, one column.
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
    <div className="pg tone-paper legal">
      <header className="legal-head">
        <h1>{title}</h1>
        <p className="g-lead">{intro}</p>
        <p className="legal-date">Last updated {updated}</p>
      </header>
      <div className="legal-body">
        {sections.map((s) => (
          <section key={s.id} id={s.id}>
            <h2>{s.heading}</h2>
            {s.body}
          </section>
        ))}
      </div>
    </div>
  );
}
