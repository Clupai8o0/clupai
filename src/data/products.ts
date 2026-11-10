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
  /** Show its picture sharp even while it’s in the works: a diagram, not an unfinished screen. */
  clear?: boolean;
  /** Its colour class: tone-blue, tone-red and so on, in inner.css. */
  tone: string;
};

export const products: Product[] = [
  {
    slug: "tempo",
    tone: "tone-blue",
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
    tone: "tone-red",
    name: "Acknowledgement Force",
    line: "Blocks your Mac until you read your own rules and name what matters today.",
    status: "in-work",
    badge: "Free, v0.3",
    since: "v0.3 out May 2026, next version in development",
    link: { href: "https://force.clupai.com", label: "Open Acknowledgement Force" },
    caseSlug: "acknowledgement-force",
    image: { src: "/products/force/desktop.webp", alt: "The Acknowledgement Force home page." },
  },
  {
    slug: "cstack",
    tone: "tone-paper",
    name: "cstack",
    line: "Keeps several AI coding tools from clashing, and cuts what they cost to run.",
    status: "in-work",
    badge: "Open source, for developers",
    since: "First version out Sep 2026, still in development",
    clear: true,
    link: { href: "https://github.com/Clupai8o0/cstack", label: "See it on GitHub" },
    caseSlug: "cstack",
    image: { src: "/products/cstack/cover.webp", alt: "Six AI coding tools, Claude Code, Codex, OpenCode, DeepSeek, Kimi and Grok Build, all reading one set of rules." },
  },
  {
    slug: "nomnom",
    tone: "tone-yellow",
    name: "nomnom",
    line: "A calorie tracker you fill in by sending Claude a photo of your meal.",
    status: "in-work",
    badge: "Built for us, sign-up off",
    since: "Running since Aug 2026, still in development",
    link: { href: "https://nomnom.clupai.com", label: "See nomnom" },
    caseSlug: "nomnom",
    image: { src: "/work/nomnom/hero.webp", alt: "nomnom’s Today page." },
  },
  {
    slug: "kairos",
    tone: "tone-navy",
    name: "Kairos",
    line: "Books your tasks into the next two weeks and learns how long they really take.",
    status: "in-work",
    badge: "Rebuilding now",
    since: "Started Mar 2026, rebuilt from Oct 2026",
    link: { href: "https://kairos.clupai.com", label: "Join the beta" },
    caseSlug: "kairos",
    image: { src: "/products/kairos/week.webp", alt: "Kairos’s week view." },
  },
  {
    slug: "morgue",
    tone: "tone-ink",
    name: "morgue",
    line: "A library of web animations your AI coding tools can watch and rebuild.",
    status: "in-work",
    badge: "Waitlist open",
    since: "Started Aug 2026",
    link: { href: "https://morgue.clupai.com", label: "Join the waitlist" },
    caseSlug: "morgue",
    image: { src: "/products/morgue/desktop.webp", alt: "The morgue home page." },
  },
  {
    slug: "glow-up",
    tone: "tone-yellow",
    name: "Glow Up",
    line: "A health game for a household. The plan: log meals, weight and workouts by chatting with Claude or ChatGPT.",
    status: "in-work",
    badge: "Private for now",
    since: "Started Nov 2026",
    caseSlug: "glow-up",
    image: { src: "/work/glow-up/hero.webp", alt: "Glow Up’s Today screen, in a design preview." },
  },
  {
    slug: "flowerpress",
    tone: "tone-red",
    name: "Flowerpress",
    line: "A free journal for Android. It opens on a blank page, and every note you finish grows into a plant in your garden.",
    status: "released",
    badge: "Waitlist open",
    since: "Ready Nov 2026, waitlist open",
    link: { href: "https://flowerpress.clupai.com", label: "Join the waitlist" },
    caseSlug: "flowerpress",
    image: { src: "/products/flowerpress/desktop.webp", alt: "The Flowerpress home page: “Every note gets pressed into a flower.”" },
  },
  {
    slug: "clearroll",
    tone: "tone-yellow",
    name: "Clearroll",
    line: "An Android app for clearing out your phone’s photos: swipe through them to clean, sort and remove duplicates, fast.",
    status: "in-work",
    badge: "Early build",
    since: "Started Nov 2026, no public screens yet",
    poster: "Swipe, and the clutter goes.",
  },
  {
    slug: "visatrack",
    tone: "tone-blue",
    name: "VisaTrack",
    line: "A work-hours tracker for international students in Australia, with one answer: how many more hours you can work.",
    status: "in-work",
    badge: "Not released",
    since: "Built Jul 2026, waiting on a legal review",
    caseSlug: "visatrack",
    image: { src: "/work/visatrack/dashboard.webp", alt: "VisaTrack’s Today card." },
  },
  {
    slug: "govchat",
    tone: "tone-paper",
    name: "GovChat",
    line: "Ask in plain English and find Australian government datasets, with sources.",
    status: "in-work",
    badge: "Demo offline",
    since: "A GovHack 2025 winner",
    caseSlug: "govchat",
    image: { src: "/products/govchat/trust.webp", alt: "GovChat answering a question." },
  },
];

/** Products with a page of their own. Clearroll has nothing public to show yet. */
export const withPage = products.filter((p) => !p.poster);

export function productBySlug(slug: string): Product | undefined
{
  return withPage.find((p) => p.slug === slug);
}

export const released = products.filter((p) => p.status === "released");
export const inWork = products.filter((p) => p.status === "in-work");
