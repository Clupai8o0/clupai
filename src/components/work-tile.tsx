import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/data/cases";

// A case study as a picture first: the product screenshot, then who, what and
// the number. Used on /work and in the home page's work section.
export default function WorkTile({
  c,
  lead = false,
  preload = false,
  sizes,
}: {
  c: CaseStudy;
  lead?: boolean;
  preload?: boolean;
  sizes?: string;
}) {
  const src = c.thumbnail ?? c.media?.find((m) => m.type === "image")?.src;

  return (
    <Link href={`/work/${c.slug}`} className={lead ? "wk-tile wk-lead" : "wk-tile"}>
      {src && (
        <span className="wk-shot">
          <Image
            src={src}
            alt=""
            fill
            preload={preload}
            sizes={
              sizes ??
              (lead
                ? "(max-width: 768px) 100vw, (max-width: 1440px) 92vw, 1344px"
                : "(max-width: 900px) 100vw, 46vw")
            }
          />
        </span>
      )}
      <span className="wk-copy">
        <span className="wk-name">
          <span className="wk-client">{c.client}</span>
          <ArrowRight size={lead ? 24 : 20} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className="wk-kind">{c.kind}</span>
        <span className="wk-stat">
          <span className="wk-stat-num">{c.stat}</span>
          <span>{c.sstat}</span>
        </span>
      </span>
    </Link>
  );
}
