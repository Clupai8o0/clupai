import Image from "next/image";
import Link from "next/link";

const SCREENS = [
  { src: "/work/hoddle/new/home.webp", alt: "The Hoddle home page.", label: "Hoddle", slug: "hoddle-melbourne" },
  {
    src: "/work/kdg/new/estimate-options.webp",
    alt: "King Double Glazing’s price tool.",
    label: "King Double Glazing",
    slug: "king-double-glazing",
  },
  { src: "/products/tempo/dashboard.webp", alt: "Tempo’s dashboard.", label: "Tempo", slug: "tempo" },
  { src: "/products/kairos/week.webp", alt: "A week in Kairos.", label: "Kairos", slug: "kairos" },
  { src: "/products/cstack/cover.webp", alt: "The cstack README.", label: "cstack", slug: "cstack" },
  {
    src: "/products/force/desktop.webp",
    alt: "The Acknowledgement Force home page.",
    label: "Acknowledgement Force",
    slug: "acknowledgement-force",
  },
];

// Real screens, edge to edge, each one linking to the case behind it.
// Pass `except` to leave out cases already on the page.
export default function ScreenStrip({ except = [] }: { except?: string[] })
{
  const screens = SCREENS.filter((s) => !except.includes(s.slug)).slice(0, 4);

  return (
    <div className="strip">
      {screens.map((s) => (
        <Link key={s.src} href={`/work/${s.slug}`}>
          <Image src={s.src} alt={s.alt} fill sizes="(max-width: 820px) 100vw, 50vw" />
          <span>{s.label}</span>
        </Link>
      ))}
    </div>
  );
}
