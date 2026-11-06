export type MediaItem = {
  src: string;
  type: "image" | "video";
  label: string;
  poster?: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  /** client: built for someone else. product: our own. earlier: small row at the bottom of /work. */
  group: "client" | "product" | "earlier";
  /** How we were involved, always stated plainly. */
  role: string;
  line: string;
  /** Dates on the page axis, e.g. "Mar 2026 → Apr 2026". */
  when: string;
  took?: string;
  status: string;
  url?: { href: string; label: string };
  picture: { src: string; alt: string };
  clip?: { src: string; poster: string };
  facts: { k: string; v: string }[];
  problem: string[];
  built: { title: string; body: string }[];
  testimonial?: { quote: string; name: string; role: string };
  media: MediaItem[];
  stack?: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "hoddle-melbourne",
    name: "Hoddle Melbourne",
    group: "client",
    role: "Co-founder and CTO",
    line: "A mentoring platform for first-year international students in Melbourne.",
    when: "Mar 2026 → Apr 2026",
    took: "Six weeks",
    status: "Live",
    url: { href: "https://hoddle.org", label: "hoddle.org" },
    picture: {
      src: "/work/hoddle/new/home.webp",
      alt: "Hoddle’s home page: Navigate Melbourne with someone who’s been in your shoes.",
    },
    clip: { src: "/work/hoddle/loop.mp4", poster: "/work/hoddle/poster.jpg" },
    facts: [
      { k: "Took", v: "Six weeks, one developer" },
      { k: "Result", v: "Live, and 2nd at Study Melbourne Leadership 4Impact" },
      { k: "Our part", v: "Co-founder and CTO, so this one is our own venture" },
    ],
    problem: [
      "First-year international students land in Melbourne without the networks local students grow up with. Marking, housing, part-time work and visa paperwork all get learned the hard way.",
      "The team was in the Study Melbourne Leadership 4Impact program, with a public pitch day that wasn’t going to move.",
    ],
    built: [
      {
        title: "Mentor matching",
        body: "Students answer a few questions. The platform ranks mentors on where they’re from, what they study and what they’re stuck on, then says why it picked each one.",
      },
      {
        title: "One mentor, many students",
        body: "Mentors write articles, answer in forums and host live Q&As, so one hour of their time reaches a lot of people. Forum posts can be anonymous for questions nobody wants their name on.",
      },
      {
        title: "Who can see what",
        body: "Access rules sit in the database itself as well as the app, from the first table onward.",
      },
      {
        title: "A link for every change",
        body: "Each change got its own preview link. The co-founders clicked through every feature before it went live, so pitch day held no surprises.",
      },
    ],
    testimonial: {
      quote:
        "We had the idea, we had people who were interested, but the solution that Sam put together really brought the product to life. Usually the website is the cherry on top, but for us, Hoddle became the cake.",
      name: "Chirag P Agarwal",
      role: "Co-founder, Hoddle Melbourne",
    },
    media: [
      { src: "/work/hoddle/loop.mp4", type: "video", label: "Signing up as a student", poster: "/work/hoddle/poster.jpg" },
      { src: "/work/hoddle/new/phone-home.webp", type: "image", label: "On a phone" },
      { src: "/work/hoddle/new/matching.webp", type: "image", label: "Mentors picked for a student" },
    ],
    stack: "Next.js, Supabase, Tailwind",
  },
  {
    slug: "king-double-glazing",
    name: "King Double Glazing",
    group: "client",
    role: "Built for a client",
    line: "A new brand and website for a Melbourne glazier, built around a tool that shows customers a price straight away.",
    when: "2026",
    took: "Five weeks",
    status: "Live",
    url: { href: "https://kingdoubleglazing.com.au", label: "kingdoubleglazing.com.au" },
    picture: {
      src: "/work/kdg/new/estimate-options.webp",
      alt: "King Double Glazing’s estimate tool, asking a customer to pick a glass option.",
    },
    clip: { src: "/work/kdg/loop.mp4", poster: "/work/kdg/poster.jpg" },
    facts: [
      { k: "Took", v: "Five weeks" },
      { k: "Speed", v: "Google’s desktop score went from 75 to 99" },
      { k: "Our part", v: "Brand, site, price tool and quote emails" },
    ],
    problem: [
      "Every enquiry landed on the owner’s phone, including people only shopping for a number.",
      "The old site was slow and the brand felt dated, so the business started again under a new name.",
    ],
    built: [
      {
        title: "A price before a phone call",
        body: "Customers enter their window sizes and see a price range before giving any contact details. People who get in touch already know the number.",
      },
      {
        title: "Quotes confirmed by email",
        body: "A customer has to click a link in an email before the lead reaches the owner. Junk enquiries stop there.",
      },
      {
        title: "Five pages, one job",
        body: "The first plan was 27 pages. We cut it to five, all pointing at the price tool.",
      },
      {
        title: "Editable without us",
        body: "The owner changes pages in a visual editor and doesn’t need a developer to do it.",
      },
    ],
    testimonial: {
      quote:
        "The calculator came out exactly how I had it in my head. Sam showed me every update as he built it. I could see the changes straight away and tell him what I wanted. I felt in control the whole way through.",
      name: "Tas",
      role: "King Double Glazing, Melbourne",
    },
    media: [
      { src: "/work/kdg/loop.mp4", type: "video", label: "Getting a price", poster: "/work/kdg/poster.jpg" },
      { src: "/work/kdg/new/hero.webp", type: "image", label: "Home page" },
      { src: "/work/kdg/new/estimate-windows-mobile.webp", type: "image", label: "The price tool on a phone" },
      { src: "/work/kdg/gallery.webp", type: "image", label: "Gallery" },
    ],
    stack: "Next.js, TinaCMS, Postgres, Resend",
  },
  {
    slug: "tempo",
    name: "Tempo",
    group: "product",
    role: "Our own product",
    line: "Log your workouts, see your progress, and let Claude read and log them for you.",
    when: "Apr 2026 → Aug 2026",
    status: "Released",
    url: { href: "https://tempo.clupai.com", label: "tempo.clupai.com" },
    picture: {
      src: "/products/tempo/dashboard.webp",
      alt: "Tempo’s dashboard: workouts this week, volume, and a frequency chart.",
    },
    facts: [
      { k: "Live since", v: "August 2026" },
      { k: "Library", v: "800+ exercises" },
      { k: "Checks", v: "353 automated tests on the API" },
    ],
    problem: [
      "Workout apps keep your history inside their own screens. An AI assistant can’t read it, and can’t log a set for you.",
    ],
    built: [
      {
        title: "One log, two ways in",
        body: "The web app and Claude read and write the same training history, so a set logged in chat shows up in the browser.",
      },
      {
        title: "Written once",
        body: "Every feature lives in one shared layer, and the tests fail if the app and the Claude tools ever disagree.",
      },
      {
        title: "Still being finished",
        body: "Planning a workout ahead works through Claude today. Its web screens aren’t done yet.",
      },
    ],
    media: [
      { src: "/products/tempo/session.webp", type: "image", label: "Logging a set" },
      { src: "/products/tempo/log-mobile.webp", type: "image", label: "On a phone" },
    ],
    stack: "Next.js, FastAPI, Postgres",
  },
  {
    slug: "govchat",
    name: "GovChat",
    group: "product",
    role: "Our own product",
    line: "Ask in plain English and find Australian government datasets, with sources.",
    when: "Aug 2025 → Dec 2025",
    status: "In the works",
    picture: {
      src: "/products/govchat/trust.webp",
      alt: "GovChat answering a question about languages spoken at home, next to a trust score.",
    },
    facts: [
      { k: "Award", v: "A GovHack 2025 winner" },
      { k: "Covers", v: "2,016 government datasets" },
      { k: "Team", v: "Built for GovHack, with one other contributor on the API" },
      { k: "Now", v: "The live demo is offline until we repair its search" },
    ],
    problem: [
      "Australia publishes thousands of useful datasets, but finding the right one means knowing what it’s called and which agency holds it.",
    ],
    built: [
      {
        title: "Plain English search",
        body: "Ask a question the way you’d say it. GovChat finds the datasets that answer it and links to where they came from.",
      },
      {
        title: "A first go at a trust score",
        body: "Answers carry a score for how much to rely on them. It’s an early version, and we say so.",
      },
    ],
    media: [{ src: "/products/govchat/trust.webp", type: "image", label: "An answer with its sources" }],
    stack: "Next.js, FastAPI, ChromaDB",
  },
  {
    slug: "acknowledgement-force",
    name: "Acknowledgement Force",
    group: "product",
    role: "Our own product",
    line: "Blocks your Mac until you read your own rules and name what matters today.",
    when: "Jan 2026 → May 2026",
    status: "Released",
    url: { href: "https://force.clupai.com", label: "force.clupai.com" },
    picture: {
      src: "/products/force/desktop.webp",
      alt: "The Acknowledgement Force home page.",
    },
    clip: { src: "/products/force/demo.mp4", poster: "/products/force/demo-poster.webp" },
    facts: [
      { k: "Runs on", v: "macOS, with a web editor" },
      { k: "Version", v: "v0.3, free and open source" },
      { k: "Privacy", v: "No telemetry. Works fully local with no account" },
    ],
    problem: [
      "The rule you set last week disappears the moment you’re stressed. Reminders get swiped away.",
    ],
    built: [
      {
        title: "A screen you can’t skip",
        body: "On a schedule you pick, the app covers the screen until you’ve read your rules, ticked the box and named one thing for the day.",
      },
      {
        title: "Rewritten properly",
        body: "The first version was a web app in a wrapper. We rebuilt it as a native Mac app so it’s small and quick to open.",
      },
    ],
    media: [{ src: "/products/force/demo.mp4", type: "video", label: "The daily screen", poster: "/products/force/demo-poster.webp" }],
    stack: "Swift, SwiftUI, Supabase",
  },
  {
    slug: "cstack",
    name: "cstack",
    group: "product",
    role: "Our own product",
    line: "Keeps several AI coding tools from clashing, and cuts what they cost to run.",
    when: "Sep 2026",
    status: "Released",
    url: { href: "https://github.com/Clupai8o0/cstack", label: "github.com/Clupai8o0/cstack" },
    picture: {
      src: "/products/cstack/cover.webp",
      alt: "The cstack README: one rules, hooks and skills layer for AI coding tools.",
    },
    facts: [
      { k: "For", v: "Developers, and it’s how we run our own builds" },
      { k: "Works with", v: "Six AI coding tools" },
      { k: "Cost", v: "US$0.33 a task against US$0.90, in our own benchmarks" },
    ],
    problem: [
      "Run a few AI coding tools on one project and they overwrite each other’s work, repeat each other’s mistakes and burn money.",
    ],
    built: [
      {
        title: "One set of rules",
        body: "All the tools read the same rules, and a mistake one of them makes becomes a rule for the others.",
      },
      {
        title: "Each tool claims its files",
        body: "A tool claims a file before it edits it, so another session can’t write over its work.",
      },
    ],
    media: [],
  },
  {
    slug: "kairos",
    name: "Kairos",
    group: "product",
    role: "Our own product",
    line: "Paste your notes and it books the tasks into your calendar.",
    when: "Apr 2026 → now",
    status: "In the works",
    picture: {
      src: "/products/kairos/week.webp",
      alt: "Kairos’s week view, with tasks booked into a calendar.",
    },
    facts: [
      { k: "Plans", v: "The next 14 days, around fixed events" },
      { k: "Checks", v: "306 automated tests" },
      { k: "Now", v: "A full rebuild, started October 2026" },
    ],
    problem: [
      "To-do lists don’t know how long anything takes or when you’re free, so the list just grows.",
    ],
    built: [
      {
        title: "Plain rules do the planning",
        body: "Ordinary code decides what goes where. The AI suggests how long things take and drafts goals, and nothing changes until you accept it.",
      },
      {
        title: "It learns how long you take",
        body: "When a block ends, it asks how it went. After a few answers it suggests planning that kind of task longer or shorter.",
      },
    ],
    media: [
      { src: "/work/kairos/kairos-demo.mp4", type: "video", label: "A walkthrough of an earlier build", poster: "/products/kairos/week.webp" },
      { src: "/products/kairos/today.webp", type: "image", label: "Today" },
    ],
    stack: "Next.js, Vercel AI SDK, Google Calendar",
  },
  {
    slug: "tapcraft",
    name: "TapCraft",
    group: "earlier",
    role: "Co-founder",
    line: "A store for 3D-printed NFC keychains.",
    when: "Feb 2026 → Oct 2026",
    status: "Business ended, store still up",
    url: { href: "https://tapcraft.shop", label: "tapcraft.shop" },
    picture: {
      src: "/work/tapcraft/new/desktop.webp",
      alt: "The TapCraft store.",
    },
    facts: [
      { k: "Our part", v: "Co-founder, and we built the store" },
      { k: "Ran", v: "February to October 2026" },
    ],
    problem: ["We sold custom NFC keychains and needed a store that looked as good as the keychains."],
    built: [
      {
        title: "A store on Shopify’s engine",
        body: "A custom storefront with Shopify handling cart and payment underneath.",
      },
    ],
    media: [],
    stack: "Next.js, Shopify",
  },
  {
    slug: "krishnaveni-school",
    name: "Krishnaveni School",
    group: "earlier",
    role: "Website for a client",
    line: "A school website its staff can run on their own.",
    when: "2026",
    status: "Live",
    picture: {
      src: "/work/krishnaveni/homepage.webp",
      alt: "The Krishnaveni School home page.",
    },
    facts: [
      { k: "Before", v: "Every change meant emailing a developer" },
      { k: "After", v: "Staff manage pages, posts and facilities themselves" },
    ],
    problem: ["The school ran on a static site. A new gallery post or an announcement needed a developer."],
    built: [
      {
        title: "Handover built in",
        body: "Staff edit through a content system set up so they can’t break the layout by accident.",
      },
    ],
    testimonial: {
      quote:
        "We’re not a technical team. We gave Samridh the brief and he handled everything else. What we asked for, he delivered. Then he delivered more.",
      name: "Krishnaveni School",
      role: "India",
    },
    media: [
      { src: "/work/krishnaveni/mobile.webp", type: "image", label: "On a phone" },
      { src: "/work/krishnaveni/contact.webp", type: "image", label: "Contact page" },
    ],
    stack: "Next.js, Sanity",
  },
  {
    slug: "nmmun",
    name: "NMMUN",
    group: "earlier",
    role: "Website for a school conference",
    line: "A conference site for a Model UN in New Delhi, with registration and schedules.",
    when: "2023",
    status: "Ran for two conferences",
    picture: {
      src: "/work/nmmun/homepage.webp",
      alt: "The NMMUN conference home page.",
    },
    facts: [
      { k: "Before", v: "No proper conference website" },
      { k: "After", v: "Used across two years of the conference" },
    ],
    problem: ["The conference needed committee pages, schedules and registration, polished enough to send to other schools."],
    built: [
      {
        title: "Built for the next team",
        body: "Content sits in plain data files, so next year’s organisers could take it over. They did.",
      },
    ],
    testimonial: {
      quote:
        "Samridh took over the role and immediately delivered something well beyond what any of us expected. We’d never had a proper conference website before. This year we have one we’re genuinely proud to send out.",
      name: "Head Organiser",
      role: "NMMUN",
    },
    media: [{ src: "/work/nmmun/mobile.webp", type: "image", label: "On a phone" }],
  },
];

export function caseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}

export const clientCases = cases.filter((c) => c.group === "client");
export const productCases = cases.filter((c) => c.group === "product");
export const earlierCases = cases.filter((c) => c.group === "earlier");
