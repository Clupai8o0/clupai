// The Build Risk Check: questions, scoring and advice.
// Shared by the client form, the result page and the capture API, so a score is
// always worked out from the answer code and never trusted from the browser.

export type Answer = { label: string; key: string };
export type Question = { id: string; title: string; hint?: string; answers: Answer[] };

export const questions: Question[] = [
  {
    id: "what",
    title: "What are you building?",
    answers: [
      { key: "platform", label: "A platform or marketplace" },
      { key: "customer-app", label: "An app for customers" },
      { key: "business-tool", label: "A tool for my business" },
      { key: "not-sure", label: "Not sure yet" },
    ],
  },
  {
    id: "stage",
    title: "Where’s it at?",
    answers: [
      { key: "idea", label: "Just an idea" },
      { key: "notes", label: "Notes or designs" },
      { key: "started", label: "Someone started it" },
      { key: "stuck", label: "Built, but stuck" },
    ],
  },
  {
    id: "builder",
    title: "Who’s building it?",
    answers: [
      { key: "nobody", label: "Nobody yet" },
      { key: "freelancer", label: "A freelancer" },
      { key: "agency", label: "An agency" },
      { key: "cofounder", label: "A co-founder" },
      { key: "ai-tools", label: "Me, with AI tools" },
    ],
  },
  {
    id: "quote",
    title: "Has anyone given you a fixed price and date in writing?",
    answers: [
      { key: "both", label: "Yes, both" },
      { key: "rough", label: "A rough quote" },
      { key: "none", label: "No" },
    ],
  },
  {
    id: "delay",
    title: "What happens if it’s three months late?",
    answers: [
      { key: "deal", label: "I lose a deal, an investor or a launch" },
      { key: "money", label: "I lose money and momentum" },
      { key: "nothing", label: "Not much" },
    ],
  },
  {
    id: "demand",
    title: "Who’s waiting for it?",
    answers: [
      { key: "paying", label: "Paying customers" },
      { key: "waitlist", label: "A waitlist" },
      { key: "said", label: "People who said they’d use it" },
      { key: "no-one", label: "No one yet" },
    ],
  },
  {
    id: "decider",
    title: "Who decides on this?",
    answers: [
      { key: "me", label: "Just me" },
      { key: "cofounder", label: "Me and a co-founder" },
      { key: "board", label: "A board or investors" },
    ],
  },
  {
    id: "budget",
    title: "What have you set aside for the first version?",
    answers: [
      { key: "under-10", label: "Under A$10k" },
      { key: "10-25", label: "A$10k to A$25k" },
      { key: "25-50", label: "A$25k to A$50k" },
      { key: "50-plus", label: "A$50k or more" },
      { key: "not-sure", label: "Not sure" },
    ],
  },
];

export type AnswerKey = Record<string, string>;

/** Answers travel as one digit per question, e.g. "12031021". */
export function encodeAnswers(indexes: number[]): string {
  return indexes.join("");
}

export function decodeAnswers(code: string | null | undefined): number[] | null {
  if (typeof code !== "string" || code.length !== questions.length || !/^\d+$/.test(code)) {
    return null;
  }
  const indexes = code.split("").map(Number);
  for (let i = 0; i < questions.length; i++) {
    if (indexes[i]! >= questions[i]!.answers.length) {
      return null;
    }
  }
  return indexes;
}

function keysOf(indexes: number[]): AnswerKey {
  const out: AnswerKey = {};
  questions.forEach((q, i) => {
    out[q.id] = q.answers[indexes[i]!]!.key;
  });
  return out;
}

export type Area = "scope" | "builder" | "cost" | "delay" | "demand";

const POINTS: Record<Area, { question: string; points: Record<string, number> }> = {
  scope: { question: "stage", points: { idea: 6, notes: 14, started: 10, stuck: 8 } },
  builder: { question: "builder", points: { nobody: 10, freelancer: 10, agency: 14, cofounder: 16, "ai-tools": 6 } },
  cost: { question: "quote", points: { both: 20, rough: 10, none: 4 } },
  delay: { question: "delay", points: { deal: 6, money: 10, nothing: 20 } },
  demand: { question: "demand", points: { paying: 20, waitlist: 14, said: 8, "no-one": 4 } },
};

// Each area's points are weights and the safest answers don't reach 20 in every area, so the total
// is scaled: the safest set of answers scores 100, as "out of 100" promises.
const MAX_POINTS = Object.values(POINTS).reduce((sum, rule) => sum + Math.max(...Object.values(rule.points)), 0);

// Order breaks ties, so the same answers always show the same three risks.
const AREA_ORDER: Area[] = ["cost", "scope", "builder", "delay", "demand"];

type Advice = { title: string; means: string; thisWeek: string };

const ADVICE: Record<Area, Record<string, Advice>> = {
  scope: {
    idea: {
      title: "Nobody has written down what’s being built",
      means: "An idea can’t be priced. Whoever quotes you now is guessing, and the guess gets corrected on your bill.",
      thisWeek: "Write one page: who it’s for, the one job it does, and three things it won’t do yet.",
    },
    notes: {
      title: "Your notes aren’t a scope yet",
      means: "Designs show what it looks like. They don’t settle what happens when something goes wrong, and that’s where budgets go.",
      thisWeek: "List every screen and write one line on what a person does there. The gaps will show themselves.",
    },
    started: {
      title: "You’re inheriting someone else’s decisions",
      means: "Half-built software can take longer to finish than to replace, and you can’t tell which from the outside.",
      thisWeek: "Get access to the code and accounts in your own name, then ask a second developer to spend an hour reading it.",
    },
    stuck: {
      title: "Nobody knows what’s left",
      means: "If it’s built but not live, the missing piece is usually bigger than it looks from the screens.",
      thisWeek: "Write down exactly what stops you launching tomorrow. Anything you can’t name is the real risk.",
    },
  },
  builder: {
    nobody: {
      title: "There’s no one to hold to a date yet",
      means: "Most of the risk is decided by who you pick and how you pay them. That choice is still open, which is good.",
      thisWeek: "Ask anyone you’re talking to who owns the code, and what happens to your money if they miss the date.",
    },
    freelancer: {
      title: "Your project depends on one person’s calendar",
      means: "If they get sick, busy or bored, the date moves and you have no one else who knows the code.",
      thisWeek: "Make sure the code sits in a GitHub account you own, and ask who takes over if they disappear.",
    },
    agency: {
      title: "You may not know who’s really building it",
      means: "The person who sold it is rarely the person who builds it, and handovers are where dates slip.",
      thisWeek: "Ask to meet the developer who’ll write the code, and ask for access to the code today.",
    },
    cofounder: {
      title: "Your co-founder’s time has no contract",
      means: "Founder code usually gets done after everything else. When the business gets busy, the build stops first.",
      thisWeek: "Agree hours a week and a date, in writing, then check last month against them.",
    },
    "ai-tools": {
      title: "AI gets you to a demo faster than to a launch",
      means: "Logins, payments, private data and everything that breaks with real users are where AI-built projects usually stall.",
      thisWeek: "Pay a developer to read it for an hour and tell you what would break with 100 real users.",
    },
  },
  cost: {
    both: {
      title: "Check what your fixed price really covers",
      means: "A price and date in writing puts you ahead of most founders. The risk left is what happens when they miss.",
      thisWeek: "Find the clause that says what you pay if the date passes. If there isn’t one, ask for it.",
    },
    rough: {
      title: "A rough quote isn’t a promise",
      means: "It’s the number that gets you to sign. The real one arrives after you’ve paid and can’t easily leave.",
      thisWeek: "Ask them to turn the rough quote into a fixed price and date, and see how they react.",
    },
    none: {
      title: "You don’t know what this costs or when it ends",
      means: "With no price and no date, the work can run as long as the money does.",
      thisWeek: "Get one fixed price and one date in writing from anyone, even if you don’t take it. Then you have a number to test.",
    },
  },
  delay: {
    deal: {
      title: "A slip costs you more than money here",
      means: "With a deal, an investor or a launch on the line, the date matters more than the feature list.",
      thisWeek: "Work out the last date that still saves the deal, and count back. That’s your real deadline.",
    },
    money: {
      title: "Delay is eating your runway",
      means: "Every extra month costs you the build fee and the income it was meant to bring in.",
      thisWeek: "Put a dollar figure on one month of delay. Use it when you compare quotes.",
    },
    nothing: {
      title: "Nothing is forcing a finish",
      means: "Projects with no deadline tend to grow. It’s a small risk today and a big one in a year.",
      thisWeek: "Pick a date for a first version anyway, and tell someone who’ll ask you about it.",
    },
  },
  demand: {
    paying: {
      title: "Paying customers are waiting on you",
      means: "That’s the best position to be in. It also means a slip costs you trust you’ve already earned.",
      thisWeek: "Tell them a date, and ask two of them what they’d cut to get it sooner.",
    },
    waitlist: {
      title: "A waitlist goes cold",
      means: "Sign-ups aren’t buyers yet, and each month of silence loses some of them.",
      thisWeek: "Email the list and offer ten people an early spot for a deposit. See how many take it.",
    },
    said: {
      title: "Saying yes costs people nothing",
      means: "People are polite. Until someone has paid or given up time, you don’t yet know they want it.",
      thisWeek: "Ask five of them for a small deposit, or a 30-minute call. Count who says yes.",
    },
    "no-one": {
      title: "You’d be building before anyone has asked for it",
      means: "That’s a real risk at this price. The first version should be the smallest thing that finds out.",
      thisWeek: "Talk to ten people with the problem and ask what they use today. Don’t mention your idea until the end.",
    },
  },
};

export type Risk = Advice & { area: Area; points: number };

export type Result = {
  score: number;
  risks: Risk[];
  /** Under A$10k gets the score and risks, a polite no, and no booking. */
  canBook: boolean;
  qualified: boolean;
  businessTool: boolean;
  answers: { question: string; answer: string }[];
  keys: AnswerKey;
};

export function scoreAnswers(indexes: number[]): Result {
  const keys = keysOf(indexes);
  const areas = AREA_ORDER.map((area) => {
    const rule = POINTS[area];
    return { area, points: rule.points[keys[rule.question]!] ?? 0, key: keys[rule.question]! };
  });
  const score = Math.round((areas.reduce((sum, a) => sum + a.points, 0) / MAX_POINTS) * 100);
  const risks = [...areas]
    .filter((a) => a.points < 20)
    .sort((a, b) => a.points - b.points)
    .slice(0, 3)
    .map((a) => ({ area: a.area, points: a.points, ...ADVICE[a.area][a.key]! }));

  // A very safe set of answers can leave fewer than three risks. Fill from the highest scorers.
  if (risks.length < 3) {
    for (const a of areas) {
      if (risks.length >= 3) {
        break;
      }
      if (!risks.some((r) => r.area === a.area)) {
        risks.push({ area: a.area, points: a.points, ...ADVICE[a.area][a.key]! });
      }
    }
  }

  const canBook = keys.budget !== "under-10";
  return {
    score,
    risks,
    canBook,
    qualified: canBook,
    businessTool: keys.what === "business-tool",
    answers: questions.map((q, i) => ({ question: q.title, answer: q.answers[indexes[i]!]!.label })),
    keys,
  };
}

/** Maps Risk Check answers onto the labels the booking form sends to Cal.com. */
export function bookingFieldsFor(result: Result): { projectType: string; budget: string } {
  return {
    projectType: result.answers[0]?.answer ?? "",
    budget: result.answers[7]?.answer ?? "",
  };
}
