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
  /** Show its pictures sharp even while it’s in the works: charts and diagrams, not unfinished screens. */
  clear?: boolean;
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
      { k: "Now", v: "hoddle.org runs the April build. Our October rebuild is finished and not live yet" },
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
      { src: "/work/hoddle/new/matching.webp", type: "image", label: "Mentors picked for a student, in the October rebuild" },
      { src: "/work/hoddle/new/phone-home.webp", type: "image", label: "On a phone, in the October rebuild" },
      { src: "/work/hoddle/new/forum-thread.webp", type: "image", label: "Two mentors answer a forum question, in the October rebuild" },
    ],
    stack: "Next.js, Supabase, Tailwind",
  },
  {
    slug: "king-double-glazing",
    name: "King Double Glazing",
    group: "client",
    role: "Built for a client",
    line: "A new brand and website for a Melbourne glazier, built around a tool that shows customers a price straight away.",
    when: "Apr 2026 → Jul 2026",
    status: "Live",
    url: { href: "https://kingdoubleglazing.com.au", label: "kingdoubleglazing.com.au" },
    picture: {
      src: "/work/kdg/new/estimate-options.webp",
      alt: "King Double Glazing’s estimate tool, asking a customer to pick a glass option.",
    },
    clip: { src: "/work/kdg/loop.mp4", poster: "/work/kdg/poster.jpg" },
    facts: [
      { k: "Built", v: "April to July 2026" },
      { k: "Speed", v: "Google’s speed test: 99 on desktop, 95 on a phone (Oct 2026)" },
      { k: "Our part", v: "Brand, site, price tool and quote emails" },
    ],
    problem: [
      "Every enquiry landed on the owner’s phone, including people only shopping for a number.",
      "The old site was slow and the brand felt dated, so the business started again under a new name.",
    ],
    built: [
      {
        title: "A price before a phone call",
        body: "Customers pick a glass, enter their window sizes and see one price before giving any contact details. People who get in touch already know the number.",
      },
      {
        title: "The owner checks every quote",
        body: "A sent quote waits for the owner, who confirms it with one click. Only then is it emailed to the customer. The server also works the price out again and rejects a quote more than 5% away from its own total.",
      },
      {
        title: "Five pages, one job",
        body: "The first plan was a large search site, with a page for each suburb and a blog. We cut it to five pages, plus the price tool and a warranty page, and every page points at the tool.",
      },
      {
        title: "Editable without us",
        body: "The owner changes pages and prices in a visual editor and doesn’t need a developer to do it.",
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
      { src: "/work/kdg/new/estimate-quote.webp", type: "image", label: "The quote a customer sees, prices blurred" },
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
      { k: "Library", v: "873 exercises, from an open dataset" },
      { k: "Claude tools", v: "40, from finding an exercise to undoing a set" },
      { k: "Checks", v: "353 automated tests on the API" },
    ],
    problem: [
      "Every new Claude chat started from nothing. Last week’s training was gone by the next conversation.",
      "Workout apps keep your history inside their own screens. An AI assistant can’t read it, and can’t log a set for you.",
    ],
    built: [
      {
        title: "One log, two ways in",
        body: "The web app and Claude read and write the same training history. Tell Claude “log today’s push session, 3×5 bench at 80 kg” and it’s in the browser when you open it.",
      },
      {
        title: "40 tools for Claude",
        body: "Claude can find exercises, log and edit sets, plan a session and tick it off, and read your progress. You add Tempo as a connector in Claude’s settings and sign in with Google to let it in.",
      },
      {
        title: "Made for the gym floor",
        body: "Your last set fills in the next one, a rest timer starts on every save, and personal records are spotted as you log. It installs on a phone, and sets logged with no signal are sent once you’re back online.",
      },
      {
        title: "Safe to hand to an AI",
        body: "Claude only ever sees the account that approved it. Deletes can be undone, and a request sent twice can’t log the same set twice.",
      },
      {
        title: "Written once",
        body: "Every feature lives in one shared layer that the app and the Claude tools both call. Tests check that the main Claude tools return exactly what the app does.",
      },
      {
        title: "Still being finished",
        body: "Planning a workout ahead works through Claude today. Its web screens aren’t done yet.",
      },
    ],
    media: [
      { src: "/products/tempo/connector.webp", type: "image", label: "Adding Tempo to Claude, from Settings. Taken on a test copy, so its address is blurred" },
      { src: "/products/tempo/session.webp", type: "image", label: "Logging a set" },
      { src: "/products/tempo/log-mobile.webp", type: "image", label: "On a phone. The Upcoming card is from planning screens that aren’t live yet" },
    ],
    stack: "Next.js, FastAPI, Postgres",
  },
  {
    slug: "flowerpress",
    name: "Flowerpress",
    group: "product",
    role: "Our own product",
    line: "A free journal for Android. It opens on a blank page, and every note you finish grows into a plant in your garden.",
    when: "Nov 2026 → now",
    status: "Waitlist open",
    url: { href: "https://flowerpress.clupai.com", label: "flowerpress.clupai.com" },
    picture: {
      src: "/products/flowerpress/desktop.webp",
      alt: "The Flowerpress home page: “Every note gets pressed into a flower.”",
    },
    facts: [
      { k: "Started", v: "2 November 2026. The waitlist page went live four days later" },
      { k: "Price", v: "Free, with no account needed" },
      { k: "Runs on", v: "Android 9 or newer" },
      { k: "Now", v: "Waitlist open. The Play Store release is next" },
    ],
    problem: [
      "Journaling often takes too many steps before the first word. Every step is a chance to close the app and not write at all.",
      "Rewards help a habit stick, but they shouldn’t turn into guilt the day you miss one.",
    ],
    built: [
      {
        title: "Opens on a blank page",
        body: "Every time you open it, a new note is waiting. Come back within five minutes and you carry on the same note. It saves as you type, and empty notes are thrown away.",
      },
      {
        title: "Every note grows something",
        body: "Finish a note and a plant grows in your garden, from five kinds. A long note grows a vine that blooms at 1,000 words. The garden follows the seasons, and a year view shows them all.",
      },
      {
        title: "No guilt",
        body: "Nothing in the garden dies on a missed day. Streaks come with two freezes, so a day or two off doesn’t reset them.",
      },
      {
        title: "Your notes stay on your phone",
        body: "Notes are kept on the phone, with no account. Markdown, screenshots and files on a note, search, a month calendar and daily reminders are all built in.",
      },
      {
        title: "Fast to open, on purpose",
        body: "We built it natively for Android, in Kotlin, instead of with a cross-platform toolkit. For a journal, how quickly the page appears is the product.",
      },
    ],
    media: [
      { src: "/products/flowerpress/flowerpress-three.webp", type: "image", label: "Opening, writing, and the month’s garden. Made-up notes on a test phone" },
      { src: "/products/flowerpress/flowerpress-write.webp", type: "image", label: "A new note. The vine grows as you write" },
      { src: "/products/flowerpress/flowerpress-garden.webp", type: "image", label: "A plant for each day you wrote; a mark where a freeze kept the streak" },
    ],
    stack: "Kotlin, Jetpack Compose, Next.js, Postgres",
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
      { k: "Team", v: "A GovHack team project. We wrote the frontend and about half of the API" },
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
      {
        title: "Measured, then improved",
        body: "In October 2026 we wrote 40 test questions. A test copy with better search found the right dataset first for 28 of them, up from 21. That copy isn’t live yet.",
      },
    ],
    media: [
      { src: "/products/govchat/trust.webp", type: "image", label: "An answer with its sources and trust score" },
      { src: "/products/govchat/audit.webp", type: "image", label: "The record kept for every answer" },
    ],
    stack: "Next.js, FastAPI, ChromaDB",
  },
  {
    slug: "acknowledgement-force",
    name: "Acknowledgement Force",
    group: "product",
    role: "Our own product",
    line: "Blocks your Mac until you read your own rules and name what matters today.",
    when: "Jan 2026 → now",
    status: "In the works",
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
        body: "The first version was a web app in a wrapper. We rebuilt it as a native Mac app so it’s small and quick to open: about 3 MB, down from about 30.",
      },
    ],
    media: [
      { src: "/products/force/demo.mp4", type: "video", label: "The daily screen", poster: "/products/force/demo-poster.webp" },
      { src: "/products/force/desktop.webp", type: "image", label: "force.clupai.com" },
      { src: "/products/force/mobile.webp", type: "image", label: "force.clupai.com on a phone" },
    ],
    stack: "Swift, SwiftUI, Next.js, Supabase",
  },
  {
    slug: "cstack",
    name: "cstack",
    group: "product",
    role: "Our own product",
    line: "Keeps several AI coding tools from clashing, and cuts what they cost to run.",
    when: "Sep 2026 → now",
    status: "In the works",
    clear: true,
    url: { href: "https://github.com/Clupai8o0/cstack", label: "github.com/Clupai8o0/cstack" },
    picture: {
      src: "/products/cstack/cover.webp",
      alt: "Six AI coding tools, Claude Code, Codex, OpenCode, DeepSeek, Kimi and Grok Build, all reading one set of rules.",
    },
    facts: [
      { k: "For", v: "Developers, and it’s how we run our own builds" },
      { k: "Works with", v: "Six AI coding tools" },
      { k: "Cost", v: "US$0.33 a task at low effort against US$0.90 at the highest, in our own benchmark (Sep 2026)" },
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
        body: "A tool claims each file it edits. Another session in the same copy of the code is blocked from that file until the first one hands over.",
      },
    ],
    media: [
      { src: "/products/cstack/cost.webp", type: "image", label: "Cost per task at four effort settings: US$0.33 at low, US$0.90 at the highest" },
      { src: "/products/cstack/claims.webp", type: "image", label: "Two tools, one file: the second waits for a handover" },
      { src: "/products/cstack/lessons.webp", type: "image", label: "124 rules written after real mistakes, 18 Sep to 7 Nov 2026" },
    ],
    stack: "Python, Shell",
  },
  {
    slug: "kairos",
    name: "Kairos",
    group: "product",
    role: "Our own product",
    line: "Books your tasks into the next two weeks and learns how long they really take.",
    when: "Mar 2026 → now",
    status: "In the works",
    url: { href: "https://kairos.clupai.com", label: "kairos.clupai.com" },
    picture: {
      src: "/products/kairos/week.webp",
      alt: "Kairos’s week view, with tasks booked into a calendar.",
    },
    facts: [
      { k: "Plans", v: "The next 14 days, around fixed events" },
      { k: "Checks", v: "306 automated tests" },
      { k: "Now", v: "A rebuild from October 2026. It runs locally and isn’t live yet" },
    ],
    problem: [
      "To-do lists don’t know how long anything takes or when you’re free, so the list just grows.",
    ],
    built: [
      {
        title: "Plain rules do the planning",
        body: "Ordinary code decides what goes where. The AI suggests how long things take and drafts goals for you to confirm. Moving work to another day always waits for your OK.",
      },
      {
        title: "It learns how long you take",
        body: "When a block of half an hour or more ends, it asks how it went. After a few answers it suggests planning that kind of task longer or shorter.",
      },
    ],
    media: [
      { src: "/work/kairos/kairos-demo.mp4", type: "video", label: "A walkthrough of an earlier build", poster: "/work/kairos/kairos-demo-poster.webp" },
      { src: "/products/kairos/today.webp", type: "image", label: "Today, in the October rebuild" },
      { src: "/products/kairos/goal.webp", type: "image", label: "A goal and the sessions booked for it" },
      { src: "/products/kairos/quickadd-mobile.webp", type: "image", label: "Adding a task on a phone" },
    ],
    stack: "Next.js, Vercel AI SDK, Google Calendar",
  },
  {
    slug: "nomnom",
    name: "nomnom",
    group: "product",
    role: "Our own product",
    line: "A calorie tracker you fill in by sending Claude a photo of your meal.",
    when: "Aug 2026 → now",
    status: "In the works",
    url: { href: "https://nomnom.clupai.com", label: "nomnom.clupai.com" },
    picture: {
      src: "/work/nomnom/hero.webp",
      alt: "nomnom’s Today page: 527 kcal logged, 1,773 left of 2,300, with protein, carbs and fat below.",
    },
    facts: [
      { k: "Live since", v: "August 2026" },
      { k: "Food data", v: "8,114 foods from the USDA’s database" },
      { k: "Built for", v: "Ourselves. Sign-up is off" },
    ],
    problem: [
      "We weren’t going to type four foods into a form three times a day. We wanted to log a meal by sending a photo of it.",
      "AI can read a photo of a plate. We didn’t want it making up the calorie numbers.",
    ],
    built: [
      {
        title: "The AI names the food. Code does the maths.",
        body: "Claude says what’s on the plate and how much of it. The calories come from a copy of the USDA food database, and ordinary code turns each portion into grams and then into calories.",
      },
      {
        title: "No guessing when it can’t tell",
        body: "If a portion can’t be turned into a weight, nothing is counted. The item goes on a review list and counts as zero until you fix it.",
      },
      {
        title: "Past days stay put",
        body: "Each entry keeps its own numbers, so updating the food database never changes a day you’ve already logged.",
      },
      {
        title: "Next: two weeks of real use",
        body: "The Claude connection isn’t on a phone yet. Before we write more code, we’ll use it for a fortnight to see if logging by photo sticks.",
      },
    ],
    media: [
      { src: "/work/nomnom/review-wide.webp", type: "image", label: "A slice of pizza with no weight counts zero until it’s fixed" },
      { src: "/work/nomnom/demo.mp4", type: "video", label: "Fixing a portion on a phone", poster: "/work/nomnom/demo-poster.webp" },
      { src: "/work/nomnom/today.webp", type: "image", label: "The day’s total and where each entry came from" },
    ],
    stack: "Next.js, tRPC, Prisma, Postgres, MCP",
  },
  {
    slug: "glow-up",
    name: "Glow Up",
    group: "product",
    role: "Our own product",
    line: "A health game for a household. The plan: log meals, weight and workouts by chatting with Claude or ChatGPT.",
    when: "Nov 2026 → now",
    status: "In the works",
    picture: {
      src: "/work/glow-up/hero.webp",
      alt: "Glow Up’s Today screen in a design preview: Level 7, 12 days in a row, a trail through painted hills, and dinner as the next thing to log.",
    },
    facts: [
      { k: "Started", v: "November 2026" },
      { k: "Checks", v: "144 automated tests" },
      { k: "Now", v: "Sign-in is live. Logging and the phone app aren’t public yet" },
    ],
    problem: [
      "Our bet: tracking apps feel like a chore and get dropped, but sending a chat message is easy, and logging next to someone at home may keep you at it.",
    ],
    built: [
      {
        title: "Log by chatting",
        body: "You tell Claude or ChatGPT what you ate, weighed or did, and it saves it to Glow Up. Both chats go through one set of rules, and a test checks they agree. So far this runs on a preview copy, and no real chat has connected yet.",
      },
      {
        title: "One login for the household",
        body: "The chat signs in for the household, not for one person, and is told to ask who’s speaking before it logs anything. It can’t reach any other household.",
      },
      {
        title: "No meal photos kept",
        body: "A chat can read a photo of a meal, but Glow Up stores only the text and a calorie guess. If a chat sends the photo itself, Glow Up refuses it.",
      },
      {
        title: "The game comes next",
        body: "Levels and rewards run only in a design preview so far, with a made-up household. They aren’t connected to real logs yet.",
      },
    ],
    media: [
      { src: "/work/glow-up/log.webp", type: "image", label: "Logging dinner: type it like a text, or pick a recent meal" },
      { src: "/work/glow-up/demo.mp4", type: "video", label: "Logging dinner in the design preview", poster: "/work/glow-up/demo-poster.webp" },
      { src: "/work/glow-up/shop.webp", type: "image", label: "The shared shopping list, with sample prices" },
      { src: "/work/glow-up/reward.webp", type: "image", label: "A level-up reward, in the design preview only" },
    ],
    stack: "Next.js, Better Auth, Drizzle, Postgres, MCP",
  },
  {
    slug: "morgue",
    name: "morgue",
    group: "product",
    role: "Our own product",
    line: "A library of web animations your AI coding tools can watch and rebuild.",
    when: "Aug 2026 → now",
    status: "In the works",
    url: { href: "https://morgue.clupai.com", label: "morgue.clupai.com" },
    picture: {
      src: "/products/morgue/desktop.webp",
      alt: "The morgue home page: “Give your AI taste.”",
    },
    facts: [
      { k: "Started", v: "August 2026" },
      { k: "Now", v: "Waitlist open" },
      { k: "For", v: "Developers who build with AI coding tools" },
    ],
    problem: [
      "AI coding tools build screens from words and, at best, a screenshot. A screenshot can’t show how something moves, so the motion gets lost.",
      "We also had nowhere to keep the effects we liked, with the code and a note on how each one works.",
    ],
    built: [
      {
        title: "A video of every effect",
        body: "morgue plays each animation on a controlled clock and records it. Two recordings of our test effects came out identical, frame for frame.",
      },
      {
        title: "Built around the browser’s limits",
        body: "In Chrome, only 16 of 40 live 3D scenes on one page keep running. So the library plays videos, and only one effect at a time runs live.",
      },
      {
        title: "Private files stay private",
        body: "Private videos sit in storage with no public access and are only served through signed links. Locking the app isn’t enough if the file behind it is open to anyone with the address.",
      },
      {
        title: "Ready for your AI tool",
        body: "Each effect exports as one bundle: its code, what it depends on, its licence, and a list of demo-only parts the AI shouldn’t copy.",
      },
    ],
    media: [],
    stack: "Next.js, Playwright, ffmpeg, Postgres, Cloudflare R2",
  },
  {
    slug: "visatrack",
    name: "VisaTrack",
    group: "product",
    role: "Our own product",
    line: "A work-hours tracker for international students in Australia, with one answer: how many more hours you can work.",
    when: "Jul 2026",
    status: "In the works",
    picture: {
      src: "/work/visatrack/dashboard.webp",
      alt: "VisaTrack’s Today card: within your limit, you can work 17 hours more, 31 of 48 hours used from 2 to 15 November.",
    },
    clip: { src: "/work/visatrack/demo.mp4", poster: "/work/visatrack/demo-poster.webp" },
    facts: [
      { k: "Built", v: "In one week, July 2026" },
      { k: "Checks", v: "458 automated tests on the API" },
      { k: "Now", v: "Not released. It waits on a review by a registered migration agent" },
    ],
    problem: [
      "Student visa holders may work up to 48 hours a fortnight while their course is in session. The rule defines a fortnight as 14 days starting on a Monday, and doesn’t say which Monday.",
      "Count in pairs of weeks, 1 and 2, then 3 and 4, and weeks 2 and 3 never get checked together.",
    ],
    built: [
      {
        title: "A window for every Monday",
        body: "We read the rule as a new 14-day window every Monday, so each day sits in two windows. The app shows whichever one has less room left.",
      },
      {
        title: "It says when it doesn’t know",
        body: "Without the student’s term dates and breaks, it can’t tell which days are capped. So it says it doesn’t know, instead of showing a green tick.",
      },
      {
        title: "The rules in one place",
        body: "The limit is worked out in one place, and a test fails if other backend code tries to work it out. The legal claims sit in one file that quotes the regulation.",
      },
      {
        title: "A prototype, not advice",
        body: "It isn’t migration advice. Its release checklist starts with a review by a registered migration agent and a fresh check of the rules.",
      },
    ],
    media: [
      { src: "/work/visatrack/demo.mp4", type: "video", label: "Checking whether a shift fits", poster: "/work/visatrack/demo-poster.webp" },
      { src: "/work/visatrack/shifts-week.webp", type: "image", label: "A week of made-up casual shifts" },
      { src: "/work/visatrack/dashboard-mobile.webp", type: "image", label: "The same answer on a phone" },
    ],
    stack: "Next.js, FastAPI, PostgreSQL",
  },
  {
    slug: "tapcraft",
    name: "TapCraft",
    group: "earlier",
    role: "Co-founder",
    line: "A store for 3D-printed NFC keychains.",
    when: "Feb 2026 → Oct 2026",
    status: "Our part ended Oct 2026, store still up",
    url: { href: "https://tapcraft.shop", label: "tapcraft.shop" },
    picture: {
      src: "/work/tapcraft/new/desktop.webp",
      alt: "The TapCraft store.",
    },
    facts: [
      { k: "Our part", v: "Co-founder, and we built the store" },
      { k: "Co-founder", v: "February to October 2026" },
    ],
    problem: ["We sold custom NFC keychains and needed a store that looked as good as the keychains."],
    built: [
      {
        title: "A store on Shopify’s engine",
        body: "A custom storefront with Shopify handling cart and payment underneath. Affiliate links carry through to checkout.",
      },
    ],
    media: [
      { src: "/work/tapcraft/new/configurator.webp", type: "image", label: "A 3D keychain designer from the starter code, kept off the live store" },
    ],
    stack: "Next.js, Shopify",
  },
  {
    slug: "krishnaveni-school",
    name: "Krishnaveni School",
    group: "earlier",
    role: "Website for a client",
    line: "A school website its staff can run on their own.",
    when: "2025 → 2026",
    status: "Live",
    picture: {
      src: "/work/krishnaveni/homepage.webp",
      alt: "The Krishnaveni School home page.",
    },
    facts: [
      { k: "Before", v: "Every change meant emailing a developer" },
      { k: "After", v: "Staff post updates and manage facilities themselves" },
    ],
    problem: ["The school ran on a static site. A new gallery post or an announcement needed a developer."],
    built: [
      {
        title: "Handover built in",
        body: "Staff edit through a content system set up so they can’t break the layout by accident.",
      },
      {
        title: "Only what they can keep up",
        body: "The 2025 version had every page in English, Hindi and Telugu. No one at the school could keep the other two up to date, so the 2026 rebuild kept English only.",
      },
    ],
    testimonial: {
      quote:
        "We’re not a technical team. We gave Samridh the brief and he handled everything else. What we asked for, he delivered. Then he delivered more.",
      name: "Krishnaveni School",
      role: "India",
    },
    media: [
      { src: "/work/krishnaveni/early-te-news.webp", type: "image", label: "The 2025 version, in three languages" },
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
    line: "A conference site for a school Model UN in Bahrain, with councils, schedules and links to register.",
    when: "Feb 2024 → Nov 2024",
    status: "Handed over, Nov 2024 build still live",
    picture: {
      src: "/work/nmmun/home-countdown.webp",
      alt: "The NMMUN 2024-25 home page with a countdown and a Register button, over a blurred photo.",
    },
    facts: [
      { k: "Before", v: "No proper conference website" },
      { k: "After", v: "The next student team ran the November 2024 conference on it, 500+ participants by the school’s count" },
    ],
    problem: ["The conference needed committee pages, schedules and registration, polished enough to send to other schools."],
    built: [
      {
        title: "Built for the next team",
        body: "Content sits in plain data files, so next year’s organisers could take it over. They did: 101 of their 105 changes left the site’s shared components alone.",
      },
    ],
    testimonial: {
      quote:
        "Samridh took over the role and immediately delivered something well beyond what any of us expected. We’d never had a proper conference website before. This year we have one we’re genuinely proud to send out.",
      name: "Head Organiser",
      role: "NMMUN",
    },
    media: [
      { src: "/work/nmmun/councils-grid.webp", type: "image", label: "All 14 councils, from one data file" },
      { src: "/work/nmmun/phone-home.webp", type: "image", label: "On a phone, photos blurred" },
    ],
  },
];

export function caseBySlug(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}

export const clientCases = cases.filter((c) => c.group === "client");
export const productCases = cases.filter((c) => c.group === "product");
export const earlierCases = cases.filter((c) => c.group === "earlier");
