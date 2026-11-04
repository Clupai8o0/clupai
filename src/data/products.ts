export type Product = {
  slug: string;
  name: string;
  line: string;
  status: "released" | "in-work";
  /** Short label for what it costs or how it’s offered. Never a build price. */
  badge: string;
  /** When we started, or when it came out. */
  since: string;
  /** What a stranger can do right now, if anything. */
  link?: { href: string; label: string };
  caseSlug?: string;
  image?: { src: string; alt: string };
  /** Large line for a product with no public screens to show. */
  poster?: string;
};

export const products: Product[] = [
  {
    slug: "tempo",
    name: "Tempo",
    line: "Log your workouts, see your progress, and let Claude read and log them for you.",
    status: "released",
    badge: "Free",
    since: "Live since Aug 2026",
    link: { href: "https://tempo.clupai.com", label: "Open Tempo" },
    caseSlug: "tempo",
    image: { src: "/products/tempo/dashboard.webp", alt: "Tempo’s dashboard." },
  },
  {
    slug: "acknowledgement-force",
    name: "Acknowledgement Force",
    line: "Blocks your Mac until you read your own rules and name what matters today.",
    status: "released",
    badge: "Free, v0.3",
    since: "Released May 2026, macOS and web",
    link: { href: "https://force.clupai.com", label: "Open Acknowledgement Force" },
    caseSlug: "acknowledgement-force",
    image: { src: "/products/force/desktop.webp", alt: "The Acknowledgement Force home page." },
  },
  {
    slug: "cstack",
    name: "cstack",
    line: "Keeps several AI coding tools from clashing, and cuts what they cost to run.",
    status: "released",
    badge: "Open source, for developers",
    since: "Released Sep 2026",
    link: { href: "https://github.com/Clupai8o0/cstack", label: "See it on GitHub" },
    caseSlug: "cstack",
    image: { src: "/products/cstack/cover.webp", alt: "The cstack README." },
  },
  {
    slug: "kairos",
    name: "Kairos",
    line: "Paste your notes and it books the tasks into your calendar.",
    status: "in-work",
    badge: "Rebuilding now",
    since: "Started Apr 2026, rebuilt from Oct 2026",
    caseSlug: "kairos",
    image: { src: "/products/kairos/week.webp", alt: "Kairos’s week view." },
  },
  {
    slug: "morgue",
    name: "morgue",
    line: "A library of web animations your AI coding tools can watch and rebuild.",
    status: "in-work",
    badge: "Waitlist open",
    since: "Started Aug 2026",
    link: { href: "https://morgue.clupai.com", label: "Join the waitlist" },
    image: { src: "/products/morgue/desktop.webp", alt: "The morgue home page." },
  },
  {
    slug: "glow-up",
    name: "Glow Up",
    line: "A co-op health game. A household logs meals and habits by chat and levels up together.",
    status: "in-work",
    badge: "Private for now",
    since: "Started Nov 2026, no public screens yet",
    poster: "Level up as a household.",
  },
  {
    slug: "yap",
    name: "Yap",
    line: "An Android journal that opens straight into a new note and grows a garden as you write.",
    status: "in-work",
    badge: "Working name",
    since: "Started Nov 2026, no public screens yet",
    poster: "Write, and a garden grows.",
  },
  {
    slug: "govchat",
    name: "GovChat",
    line: "Ask in plain English and find Australian government datasets, with sources.",
    status: "in-work",
    badge: "Demo offline",
    since: "A GovHack 2025 winner",
    caseSlug: "govchat",
    image: { src: "/products/govchat/trust.webp", alt: "GovChat answering a question." },
  },
];

export const released = products.filter((p) => p.status === "released");
export const inWork = products.filter((p) => p.status === "in-work");
