export type Kit = {
  slug: string;
  n: string;
  name: string;
  tag: string;
  price: string;
  mrr: string;
  mrrLabel: string;
  desc: string;
  tech: string;
  status: "Live" | "Beta" | "Free";
  href?: string;
};

export const kits: Kit[] = [
  {
    slug: "acknowledgement-force",
    n: "01",
    name: "Acknowledgement Force",
    tag: "identity tool · macOS",
    price: "Free",
    mrr: "—",
    mrrLabel: "—",
    desc: "Blocks your Mac screen until you read your personal rules, tick the box, and name one thing that matters today. Native Swift 6. No backend, no telemetry, nothing leaving your machine.",
    tech: "Swift 6 · SwiftUI · macOS 14+",
    status: "Live",
    href: "https://force.clupai.com",
  },
  {
    slug: "kairos",
    n: "00",
    name: "Kairos",
    tag: "AI scheduling",
    price: "Free beta",
    mrr: "—",
    mrrLabel: "—",
    desc: "Paste your notes. Kairos pulls out the tasks and books them into Google Calendar — deadlines, dependencies, and your working hours respected. No drag and drop.",
    tech: "Next.js · Vercel AI SDK · Google Calendar",
    status: "Beta",
    href: "https://kairos.clupai.com",
  },
];

export const featuredKits = kits.slice(0, 3);
