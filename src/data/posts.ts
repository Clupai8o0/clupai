/** One block of a post body. Plain text only: no HTML, no markdown. */
export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "facts"; items: { k: string; v: string }[] }
  /** A call-out link inside the body, e.g. to a case study or a live product. */
  | { type: "link"; href: string; label: string };

export type Post = {
  slug: string;
  title: string;
  /** One line for the blog index and the meta description. Under 160 characters. */
  line: string;
  /** ISO date, yyyy-mm-dd. */
  date: string;
  /** Colour chapter for the post header: a tone class from src/app/inner.css. */
  tone: "tone-blue" | "tone-red" | "tone-yellow" | "tone-paper" | "tone-ink" | "tone-navy";
  /** The case study the post draws on, if any. Shown as a link at the end. */
  caseSlug?: string;
  /** Picture for the index card and social shares. */
  cover?: { src: string; alt: string };
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "a-pitch-day-that-wouldnt-move",
    title: "Building to a pitch day that wouldn’t move",
    line: "What a fixed pitch date made us do on Hoddle: a small first build, a link for every change, and access rules from the first table.",
    date: "2026-11-10",
    tone: "tone-navy",
    caseSlug: "hoddle-melbourne",
    cover: {
      src: "/work/hoddle/new/home.webp",
      alt: "Hoddle’s home page: Navigate Melbourne with someone who’s been in your shoes.",
    },
    body: [
      {
        type: "p",
        text: "Hoddle is a mentoring platform for first-year international students in Melbourne. We were its co-founder and CTO, so this one is our own venture as well as a build.",
      },
      {
        type: "p",
        text: "The team was in the Study Melbourne Leadership 4Impact program, and the program ended with a public final pitch. The program set that date, and nobody on the team could move it. If you have a launch, an investor meeting or a demo day in your calendar, you’re in the same position. The date changed three things about how we built Hoddle, and you can ask for all three on your own first version.",
      },
      { type: "h2", text: "Ten days of code, one clear job" },
      {
        type: "p",
        text: "The whole build took six weeks. The code went from an empty repository on 13 April 2026 to the build hoddle.org still runs on 23 April: 181 commits in ten days. The final pitch came in May, and Hoddle placed 2nd.",
      },
      {
        type: "p",
        text: "That build had one job: match a student with a mentor and give the mentor ways to help many students at once. A student answers a few questions. Hoddle ranks mentors on where they’re from, what they study and what they need help with, and shows a line saying why it picked each one. Around that sit articles, forums where students can ask without their name on the post, live Q&As and direct messages.",
      },
      {
        type: "image",
        src: "/work/hoddle/new/matching.webp",
        alt: "Hoddle’s Mentors picked for you section: three mentor cards, each with a university and a line such as “Has navigated career direction · Can help with build my network, land an internship”.",
        caption: "Mentors picked for a demo student. The line under each name is the reason the matching code wrote. This screen comes from a later rebuild, on made-up accounts.",
      },
      { type: "h2", text: "What waited" },
      {
        type: "p",
        text: "A date makes you choose. Hoddle’s matching uses fixed weights a person can read: a mentor from the same country counts most, then shared fields of study, then the challenges and goals they can help with. Tuning those weights from real use is still on the list, and you can only tune from real use once you have some.",
      },
      {
        type: "p",
        text: "Some protections came later too. After the program ended we rebuilt every page and moved more rules into the database: rate limits, meeting links that only registered students can see, and a check on sign-in links. That rebuild is finished on a branch and isn’t deployed yet, so hoddle.org still runs the April build.",
      },
      {
        type: "p",
        text: "When you plan a first version, ask your builder to write that list down: what’s in, what waits, and what has to happen before it comes back.",
      },
      { type: "h2", text: "A link to click before anything went live" },
      {
        type: "p",
        text: "The other co-founders weren’t writing code, and they didn’t need to read it. Each change got its own preview link, a private copy of the site with that change in it. They clicked through each feature there before it reached hoddle.org.",
      },
      {
        type: "p",
        text: "That let them flag a problem days before the pitch, with time left to fix it. They didn’t have to take our word that something worked, because they could open the link and try it. Ask anyone who builds for you whether you’ll get a link like that for each change, and how soon after work starts.",
      },
      { type: "h2", text: "Access rules from the first table" },
      {
        type: "p",
        text: "Hoddle holds students’ details and their private messages. Who can see what had to be right on pitch day and every day after it.",
      },
      {
        type: "p",
        text: "So the rules about who can read and change each record went into the database itself, as well as the app, from the first day of code. A mistake on one page can’t hand one student another student’s data, because the database checks every request against those rules. Adding rules like these later means going back over every screen that already reads the data.",
      },
      {
        type: "quote",
        text: "We had the idea, we had people who were interested, but the solution that Sam put together really brought the product to life. Usually the website is the cherry on top, but for us, Hoddle became the cake.",
        cite: "Chirag P Agarwal, co-founder, Hoddle Melbourne",
      },
      { type: "h2", text: "What to ask for on your own build" },
      {
        type: "list",
        items: [
          "Give your builder the date on day one, and ask what they would leave out to meet it.",
          "Ask for a preview link for each change, so you can click it before it goes live.",
          "Ask where the access rules live. You want to hear “in the database, from the first table”.",
        ],
      },
      {
        type: "p",
        text: "Hoddle is still live at hoddle.org, and the case study has the recording and the details.",
      },
      { type: "link", href: "/work/hoddle-melbourne", label: "Read the Hoddle case study" },
    ],
  },
  {
    slug: "show-the-price-before-the-phone-call",
    title: "Show the price before the phone call",
    line: "How a Melbourne glazier’s website shows customers a price from their own window sizes before it asks who they are.",
    date: "2026-11-10",
    tone: "tone-yellow",
    caseSlug: "king-double-glazing",
    cover: {
      src: "/work/kdg/new/estimate-options.webp",
      alt: "King Double Glazing’s price tool asking a customer to choose one of four glass options, with the prices blurred.",
    },
    body: [
      {
        type: "p",
        text: "King Double Glazing fits double-glazed glass into the window frames people already have. Before we built its new site, every enquiry landed on the owner’s phone, including people only shopping for a number.",
      },
      {
        type: "p",
        text: "Many trade sites ask for your name, email and phone before they show a price. We built this one the other way round: the price comes first, and contact details come last, if the customer wants to send them.",
      },
      { type: "h2", text: "A price from your own windows" },
      {
        type: "p",
        text: "The quote page is the point of the site. A customer picks one of four glass options, adds a row for each window with its height and width, and sees one total that updates as they type. All four glass prices stay on screen, and each row shows its own area.",
      },
      {
        type: "p",
        text: "It didn’t start that way. The first version, in April 2026, asked about the property, the number of windows, which way they faced, the frames and what mattered most, then showed a price range. In July we rebuilt it as one form with one total. The result screen tells the customer the price is accurate to within 10%.",
      },
      {
        type: "image",
        src: "/work/kdg/new/estimate-windows-mobile.webp",
        alt: "The price tool on a phone: three window rows with height, width and quantity, a second-storey checkbox on each, and the area worked out underneath.",
        caption: "One row per window, on a phone. The sizes are made up and the prices are blurred.",
      },
      { type: "h2", text: "The server checks the maths" },
      {
        type: "p",
        text: "The browser shows the total, and anyone can edit a web page in their own browser. So when a customer sends a quote, the server works the price out again with the same pricing code. If the two totals differ by more than 5%, it rejects the quote.",
      },
      {
        type: "p",
        text: "If your product shows customers a number, ask your builder where that number gets checked. The answer you want is “on the server, as well as on the screen”.",
      },
      { type: "h2", text: "The owner sees it before the customer does" },
      {
        type: "p",
        text: "A sent quote doesn’t go straight back to the customer. The site saves it as pending and emails the business a link to confirm it. Only after someone at the business clicks that link does the customer get the confirmed quote by email.",
      },
      {
        type: "p",
        text: "No confirmed quote goes out that the business hasn’t checked. The software does the arithmetic, and a person at the business presses the button that sends it.",
      },
      { type: "h2", text: "Five pages, all pointing at the tool" },
      {
        type: "p",
        text: "The first plan was a large search site, with a page for each suburb and a blog, and the first week of work built it. On 15 April we cut it to five pages, plus the quote tool and a warranty page. Every page has a button to the quote tool.",
      },
      {
        type: "p",
        text: "It can feel wasteful to throw away a week of pages. Each page you keep needs words, upkeep and a reason to exist, and a small site that sends everyone to one tool is easier to keep sharp. The small site is also fast. On 27 October 2026, Google’s Lighthouse test gave the live home page 99 on desktop and 95 on a phone. The business’s older WordPress site scores about 80 on a phone in the same test.",
      },
      { type: "h2", text: "The owner edits it himself" },
      {
        type: "p",
        text: "Prices change, and a business shouldn’t need a developer to change its own price list. The four prices per square metre and the second-storey charge sit in a visual editor, next to the page content. The owner changes pages there without a developer.",
      },
      {
        type: "p",
        text: "Each edit is saved as a change in the business’s own code repository, so there is a record of what changed and when. The site deploys from that repository, which the business holds.",
      },
      {
        type: "quote",
        text: "The calculator came out exactly how I had it in my head. Sam showed me every update as he built it. I could see the changes straight away and tell him what I wanted. I felt in control the whole way through.",
        cite: "Tas, King Double Glazing, Melbourne",
      },
      { type: "h2", text: "What to take into your own build" },
      {
        type: "list",
        items: [
          "If customers ring you for a number, give them the number on the site first.",
          "Work out every price again on the server.",
          "Put a person between the software and anything that reads like a promise.",
          "Cut pages that don’t point at the one thing you want people to do.",
          "Keep prices and words where you can change them yourself.",
        ],
      },
      {
        type: "p",
        text: "The site is live at kingdoubleglazing.com.au, and the case study shows the tool working.",
      },
      { type: "link", href: "/work/king-double-glazing", label: "Read the King Double Glazing case study" },
    ],
  },
  {
    slug: "building-with-ai-coding-tools",
    title: "How we build with AI coding tools, and what to ask anyone who does",
    line: "The rules we run AI coding tools under, what we measured, and five questions to ask anyone who uses AI to build your product.",
    date: "2026-11-10",
    tone: "tone-ink",
    caseSlug: "cstack",
    cover: {
      src: "/products/cstack/cover.webp",
      alt: "The cstack README: one rules, hooks and skills layer for Claude Code, Codex, OpenCode, DeepSeek, Kimi and Grok Build.",
    },
    body: [
      {
        type: "p",
        text: "We use AI coding tools on our builds, often several at once. Left alone, they get in each other’s way. Two of them edit the same file, one repeats a mistake another already made, and the bill climbs.",
      },
      {
        type: "p",
        text: "cstack is the setup we built to stop that. It’s open source, and it’s how we run our own builds. If someone builds your product with AI, you can’t see from outside how they run it, but you can ask. The questions we’d ask in your seat are at the end.",
      },
      { type: "h2", text: "One set of rules for every tool" },
      {
        type: "p",
        text: "cstack gives six AI coding tools the same rules: Claude Code, Codex, OpenCode, DeepSeek, Kimi and Grok Build. Change a rule once and all six read the new version.",
      },
      {
        type: "p",
        text: "When one tool fails in a way another could repeat, we write the failure down as a rule. Every later session, in any of the six tools, checks the rules before it runs a command or edits a file. One rule came from a command that sets work aside: run in a shared project, it swept up other sessions’ unsaved work along with its own. Between 18 September and 27 October 2026 we added 85 rules like that. By 27 October, 76 were active and 9 had been retired.",
      },
      { type: "h2", text: "Each tool claims its files" },
      {
        type: "p",
        text: "Before a session edits a file, it claims it. If a second session tries to edit the same file in the same copy of the project, the second one is blocked. The two swap one handoff message covering what’s done and what’s left, and the one with less done steps back.",
      },
      { type: "h2", text: "A second model reviews every change" },
      {
        type: "p",
        text: "Since 21 October 2026, no code change counts as done until Codex, OpenAI’s coding tool, has reviewed it. The reviewer gets only the change and a brief that asks for problems, so it stays on what changed.",
      },
      {
        type: "p",
        text: "We tested reviewers before choosing them. We took 5 real changes that passed their tests but held 17 bugs a later review caught. Claude Opus 5.5 at high effort found the most, 10 on its first run. Codex found 5, including one no other model caught. No reviewer found everything, so our reviews use more than one model.",
      },
      {
        type: "p",
        text: "The worst result was on security. Of 5 known bugs in database security rules, every model missed 4. Those rules still need a person to read them.",
      },
      { type: "h2", text: "We measure what a task costs" },
      {
        type: "p",
        text: "AI tools charge by how much text they read and write, and the same model costs more when you set it to think harder. In a benchmark on 17 September 2026, we ran five tasks from real work, twice each, on Claude Opus 5 at four effort settings. Costs are at API list prices.",
      },
      {
        type: "facts",
        items: [
          { k: "Low effort", v: "US$0.33 a task" },
          { k: "Highest effort", v: "US$0.90 a task" },
          { k: "Tasks with a right answer", v: "96 to 100% at low, 100% at the highest" },
          { k: "Writing, out of 10", v: "8.0 at low, 6.8 at the highest" },
        ],
      },
      {
        type: "p",
        text: "Low effort cost well under half as much and lost 4 points on one task, so our helper agents run at low effort by default, and we keep high effort for text people read and for reviews. The same run tested a common pattern, a cheap model doing the work and Opus checking it. It scored 100% and cost US$0.78 a task, more than twice Opus 5 at low effort on its own.",
      },
      {
        type: "p",
        text: "These are small tests on our own work: five tasks, two runs each, on a model we have since moved on from. Treat them as our numbers. They may not carry over to someone else’s work.",
      },
      { type: "h2", text: "What to ask anyone who builds with AI" },
      {
        type: "list",
        items: [
          "Who reviews the code the AI writes: a second model, a person, or both?",
          "Which AI services can see my code, and where is that written down?",
          "What stops two tools, or two people, from changing the same file at once?",
          "Which parts does a person read? Security rules should be on that list.",
          "What does a task cost to run, and how did you measure it?",
        ],
      },
      {
        type: "p",
        text: "Our answer to the second one is a policy file. It says which outside AI services may see each folder, and any folder it doesn’t list counts as confidential, which means Codex only.",
      },
      {
        type: "p",
        text: "Ask these before you sign. A builder who runs a careful setup can answer all five in a few minutes.",
      },
      { type: "link", href: "/work/cstack", label: "Read the cstack case study" },
    ],
  },
  {
    slug: "your-app-might-not-need-a-chat-screen",
    title: "Your app might not need its own chat screen",
    line: "Tempo lets people log workouts by telling Claude, the assistant they already use. How it works, and what is and isn’t live yet.",
    date: "2026-11-10",
    tone: "tone-blue",
    caseSlug: "tempo",
    cover: {
      src: "/products/tempo/dashboard.webp",
      alt: "Tempo’s dashboard: workouts this week, volume, and a frequency chart.",
    },
    body: [
      {
        type: "p",
        text: "If your app needs people to type things in, such as meals, workouts or hours, you might plan an AI chat screen inside it. There’s another way: let people log from the assistant they already have open. Tempo, our workout app, works like that.",
      },
      {
        type: "p",
        text: "In Tempo you tell Claude what you lifted, and Claude logs it. Claude can read your history back, too. The web app at tempo.clupai.com shows the same training history, so a set logged in chat shows up in the browser. Tempo has been live since August 2026.",
      },
      { type: "h2", text: "How the connection works" },
      {
        type: "p",
        text: "Tempo offers its features to Claude through MCP, the Model Context Protocol, a standard way for a chat model to call an app’s functions. You add Tempo to Claude as a custom connector and sign in with Google. Tempo’s settings page shows the address and the steps. After that, Claude can use 40 Tempo tools for reading and logging training.",
      },
      {
        type: "p",
        text: "Sign-in uses OAuth, the same kind of “sign in with” flow you’ve used on other sites, so nobody copies a secret key around. Our plan notes for nomnom, a calorie tracker built the same way, give one more reason: Claude’s mobile app has no field to paste a key into.",
      },
      {
        type: "image",
        src: "/products/tempo/session.webp",
        alt: "A logged Tempo workout, Upper B: three sets of Barbell Curl at 30 kg for 10, 9 and 8 reps, and a pad to log set 4.",
        caption: "A logged workout in Tempo’s web app, from a local demo account with made-up training.",
      },
      { type: "h2", text: "The model passes it on, the code does the maths" },
      {
        type: "p",
        text: "We have three apps built to be logged from a chat, and they share one rule: the model passes on what you said, and code works out the numbers. In Tempo, Claude sends the weight and reps of each set. The server works out volume and tonnage, and it decides whether a set is a personal record by replaying that exercise’s sets in date order.",
      },
      {
        type: "p",
        text: "nomnom goes further. Its logging tool has no calorie field, so the model has nowhere to put a number it worked out. A local copy of the USDA food database supplies the nutrition, and code does the sums.",
      },
      { type: "h2", text: "An instruction is not a rule" },
      {
        type: "p",
        text: "Each tool comes with a description that tells the model how to use it. That description is a prompt, and nothing on the server checks that the model followed it. In nomnom, the description asks the model to prefer your usual portion of a food over its own guess. If the model sends its own guess anyway, the server stores the guess.",
      },
      {
        type: "p",
        text: "So decide where each rule lives. Put the ones that matter in code, where the server enforces them. For the rest, give people a screen to catch mistakes. nomnom’s web app has a review list for entries it couldn’t weigh, and they count zero calories until someone fixes them.",
      },
      { type: "h2", text: "Chat assistants retry" },
      {
        type: "p",
        text: "Early in Tempo, a repeated call left two identical workouts dated 1 May. A chat client can send the same request twice. Tempo’s logging tools now take a key with each request, and a second call with the same key returns the first record and saves nothing new. The key is optional, so it only helps when the model sends one.",
      },
      { type: "h2", text: "One set of features, two ways in" },
      {
        type: "p",
        text: "Tempo’s web app logs workouts too, so you can use it without Claude. The browser and Claude call the same functions underneath. One test fails if either side reaches into the database on its own, and others check that Claude’s main read tools return what the web app’s API returns. The API has 353 automated tests.",
      },
      {
        type: "p",
        text: "Ask your builder about this if you go chat-first. A chat and an app built separately can drift apart, and then your customers get two different answers to one question.",
      },
      { type: "h2", text: "What is live and what isn’t" },
      {
        type: "list",
        items: [
          "Tempo is live at tempo.clupai.com. Planning a workout ahead works through Claude today. Its web screens are half built and not live.",
          "nomnom was deployed in August 2026. We haven’t yet given it the fortnight of real use on a phone that its plan calls for.",
          "Glow Up, a health game for a household, is in the works. Its sign-in screens are live and meal logging runs on a separate preview copy. No real Claude or ChatGPT chat has connected to it yet.",
        ],
      },
      {
        type: "p",
        text: "This fits apps where typing things in is the chore that makes people give up, and where your users already have an assistant open. If they don’t use Claude or ChatGPT, a plain form will serve them better. Tempo’s case study has the screens and the detail.",
      },
      { type: "link", href: "/work/tempo", label: "Read the Tempo case study" },
    ],
  },
  {
    slug: "how-we-check-our-work-page",
    title: "How we check every claim on our work page",
    line: "Dates on everything, our part stated, real screens on made-up data, and the numbers we cut because we couldn’t back them.",
    date: "2026-11-10",
    tone: "tone-red",
    cover: {
      src: "/work/kdg/new/hero.webp",
      alt: "King Double Glazing’s home page: Why choose the King double glazing system?, with a Generate my quote button and a 10-year warranty badge.",
    },
    body: [
      {
        type: "p",
        text: "When you choose someone to build your software, their past work is most of the evidence you get, and you can’t check most of it. So we wrote rules for our own work page and hold each case study to them. You can use the same rules to read anyone’s portfolio, ours included.",
      },
      { type: "h2", text: "Dates on everything" },
      {
        type: "p",
        text: "Each case study carries its dates and a status. Hoddle ran from March to April 2026 and is live, and its case says which build hoddle.org runs. GovChat, one of our own products, says its live demo is offline until we repair its search.",
      },
      {
        type: "p",
        text: "Without a date, a project could be from last month or from five years ago. The status tells you whether you can click it today.",
      },
      { type: "h2", text: "Our part, in plain words" },
      {
        type: "p",
        text: "Each case says what we did. Hoddle is labelled co-founder and CTO, because it’s our own venture, and a quote from a co-founder shouldn’t pass for a quote from a paying client. King Double Glazing says it was built for a client. Our own products say “Our own product”, and we don’t put user numbers on them.",
      },
      { type: "h2", text: "Real screens on made-up data" },
      {
        type: "p",
        text: "The pictures are the software. Where a project allows it, we run a copy of its real code on our own machine, fill it with made-up accounts and data, and take the screens from that. In King Double Glazing’s screenshots the window sizes are made up and the prices are blurred. Hoddle’s mentors are demo accounts.",
      },
      {
        type: "p",
        text: "The copy can’t reach the live database, and it has no keys to outside services. If a screen needs a live AI model and there’s no key, that screen stays off the page. We don’t fake the AI’s answer to fill the gap.",
      },
      {
        type: "p",
        text: "We also say when a screen or a feature isn’t the live version. Kairos’s video is labelled as an earlier build. Tempo’s case says its planning screens on the web aren’t done yet. When we rebuilt this site, we took off all 22 illustrations it used to carry, so a picture on a case study shows the product itself, or says it’s a diagram.",
      },
      { type: "h2", text: "Numbers we dropped" },
      {
        type: "p",
        text: "Some claims didn’t survive the check. Our old site said “24 projects shipped” and “est. 2024”, and described our work as “shipped platforms for startups”. We couldn’t back any of them, so we cut them.",
      },
      {
        type: "p",
        text: "Sam, our founder, runs the same routine on his own portfolio site, and it took out more. A count of 14,040 LinkedIn impressions for Hoddle came off because nothing backed it. A line saying Hoddle’s mentor invites expire after 14 days became 7 days, because that’s what the code says. Kairos lost “in daily use” and a speed claim nobody had measured.",
      },
      {
        type: "p",
        text: "A claim can come back once it has a source. Sam’s resume said a Model UN conference site he built was used by 500+ participants. It came off when nothing in the code backed it, and it went back once he had the school’s own count, labelled as theirs.",
      },
      { type: "h2", text: "Every sentence gets a verdict" },
      {
        type: "p",
        text: "The facts on our case studies come from pages that went through one check, line by line. Each claim gets one of four marks:",
      },
      {
        type: "list",
        items: [
          "true now",
          "true of an old build only",
          "false",
          "can’t be checked",
        ],
      },
      {
        type: "p",
        text: "A number needs the command or the document that produced it, and anything without evidence comes off. Then two review agents try to break the page, one on the claims and one on privacy, and models from other companies review the change.",
      },
      { type: "h2", text: "What this can’t prove" },
      {
        type: "p",
        text: "A screen from a copy on made-up data shows what the code does. It can’t show that anyone uses it. Testimonials, competition placings and participant counts don’t live in any code, so for those we take an outside word, such as the school’s count, and say whose word it is.",
      },
      {
        type: "p",
        text: "When you read a builder’s portfolio, look for four things: a date, a stated role, a screen you could click, and numbers with a source. Our work page is built to pass that test.",
      },
      { type: "link", href: "/work", label: "See our work" },
    ],
  },
];

/** Newest first. */
export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export function postBySlug(slug: string): Post | undefined
{
  return posts.find((p) => p.slug === slug);
}

/** Rough minutes to read at 220 words a minute, never under 1. */
export function readingMinutes(post: Post): number
{
  const words = post.body
    .map((b) => {
      if (b.type === "p" || b.type === "h2" || b.type === "quote") {
        return b.text;
      }
      if (b.type === "list") {
        return b.items.join(" ");
      }
      return "";
    })
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
