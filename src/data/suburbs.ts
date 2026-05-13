export interface SuburbData {
  name: string;
  slug: string;
  description: string;
  businesses: string;
  hero: string;
  lede: string;
  why: string;
  localSignal: string;
  faq: { q: string; a: string }[];
}

export const SUBURBS: SuburbData[] = [
  {
    name: "Brunswick",
    slug: "brunswick",
    description:
      "Brunswick is Melbourne's inner-north creative and hospitality hub — home to independent studios, music venues, cafes, bars, and small agencies packed along Sydney Road and Lygon Street North. We build websites for Brunswick businesses that want to stand out without looking like every other dark-palette agency site.",
    businesses: "cafes, music studios, creative agencies, independent retailers, bars, hospitality venues, tattoo studios, small manufacturers",
    hero: "Brunswick websites that don't look like every other Brunswick website.",
    lede: "Sydney Road doesn't lack good businesses — it lacks good websites. Most of what we see from Brunswick operators is a Squarespace template last updated in 2021, a Google Business Profile with three reviews, and a booking link buried three taps deep on mobile. The creative scene here is genuinely distinctive. The digital presence usually isn't. We fix that: fast, conversion-focused sites built for the kind of customer who walks past your window, pulls out their phone, and decides in thirty seconds whether to come in.",
    why: "Brunswick businesses operate in one of Melbourne's most crowded hospitality and creative markets. You're competing with the shop next door, the restaurant two doors up, and a new place that opened last month. A mediocre website isn't just a missed opportunity — it's an active liability when a potential customer compares you to the café that invested properly. Local search matters here too: 'coffee Brunswick', 'record store Brunswick', 'tattoo studio Brunswick North' — these are real searches with real intent, and the businesses showing up for them aren't always the best ones. They're the ones with a decent site and a claimed Business Profile.",
    localSignal: "Sydney Road — the spine of Brunswick business life, from the cheap-eats cluster near Barkly Street up through the antique strip and into the music venue corridor near Dawson Street.",
    faq: [
      {
        q: "My business is very visual — can a website capture that?",
        a: "It's the whole point. We've worked with cafes, studios, and creative businesses where the aesthetic is the offer. We design for image-heavy layouts that still load fast — no 8-second galleries, no lazy web fonts that make your brand look wrong.",
      },
      {
        q: "I already have an Instagram following. Do I even need a website?",
        a: "Instagram shows you to people who already found you. A website is how you get found by people who don't know you yet — via Google, via suburb searches, via someone asking 'where's a good natural wine bar near Coburg?'. They're not on your follower list. They're looking for you on Google and going to whoever shows up.",
      },
      {
        q: "Is this overkill for a small café or studio?",
        a: "That depends on how many seats or clients you want to fill. We've seen Brunswick cafes go from invisible on Google to consistently fully-booked within three months of launching a properly set-up site. The ones who think it's overkill are usually the ones subsidising the ones who didn't.",
      },
    ],
  },
  {
    name: "Carlton",
    slug: "carlton",
    description:
      "Carlton sits between the CBD and the University of Melbourne — a mix of Lygon Street's iconic restaurant strip, legal and medical practices, and a growing number of knowledge-economy businesses. We build websites for Carlton businesses that want to convert the foot traffic and the search traffic their location should be earning.",
    businesses: "restaurants, cafes, law firms, medical practices, accounting firms, tutoring services, bookshops, art galleries, property services",
    hero: "Carlton businesses have the location. The website should match.",
    lede: "Lygon Street is one of the most walked strips in Melbourne and one of the most poorly represented online. You'll find restaurants with beautiful dining rooms and websites that haven't changed since their fit-out. Law firms in Carlton Gardens with no Google presence at all. Medical practices that make booking an appointment feel like filing a tax return. The foot traffic is there. The search volume is there — 'Italian restaurant Carlton', 'family lawyer Carlton', 'GP near Melbourne Uni' — but a lot of it goes to whoever bothered to build something that works. That's the gap we close.",
    why: "Carlton's mix of institutions, professionals, and hospitality creates an unusual local market: customers range from uni students looking for cheap pasta to law firm clients who will pay $800/hour and still Google their solicitor before their first meeting. A well-built website serves both. It signals credibility to the professional, and surfaces you to the student searching 'cheap lunch Carlton' at 11:45am. Lygon Street's reputation means people come to Carlton expecting a certain standard — your website needs to be part of that.",
    localSignal: "Lygon Street — the anchor strip running from the CBD north through Carlton, where most of the restaurant, café, and retail business is concentrated.",
    faq: [
      {
        q: "We're a law firm — does this actually help us get clients online?",
        a: "Yes. Professional services in Melbourne are heavily searched locally, and most law firms have weak websites. If your site is fast, credible, and ranks for the suburb + practice area combination your clients search, you'll get enquiries you currently aren't. We've built for professional services and know what conservative clients need to see before they pick up the phone.",
      },
      {
        q: "Is it worth running ads alongside the website?",
        a: "For some Carlton businesses — especially restaurants and medical practices — the combination of organic SEO and a modest Google Ads budget accelerates results. We don't manage ads ourselves, but we can scope the site to be a good landing page for them and refer you to someone who does.",
      },
      {
        q: "What about restaurant booking systems?",
        a: "We can integrate with ResDiary, OpenTable, or a simpler Cal.com/Calendly setup depending on your volume. We're not a booking platform — we build the site that makes people want to book, and wire up whatever system you're already using.",
      },
    ],
  },
  {
    name: "Richmond",
    slug: "richmond",
    description:
      "Richmond is where Bridge Road retail, Swan Street food, and a cluster of creative and tech businesses converge — one of Melbourne's most commercially diverse inner suburbs. We build websites for Richmond businesses that need to compete locally and sell nationally.",
    businesses: "fashion boutiques, sporting goods, restaurants and bars, tech startups, creative studios, furniture, health and wellness, B2B services",
    hero: "Richmond businesses deserve a site that works as hard as they do.",
    lede: "Bridge Road used to be Melbourne's discount fashion strip. It's more complicated now — independent boutiques, furniture showrooms, health studios, and the odd tech company sharing a postcode with MCG traffic on AFL weekends. Swan Street runs a different crowd: the brunch and dinner trade, the late-night bar scene, the people who live in the apartments that replaced the factories. These aren't the same customer. But they share one habit: they Google before they walk in. Richmond's commercial density means your neighbours are also your competition, and the businesses that show up on that first page of search are getting the calls.",
    why: "Richmond's transformation from discount retail to a mixed inner-urban hub means its businesses span a wider range than almost any other Melbourne suburb — from bricks-and-mortar boutiques competing with online fashion to tech companies that need a B2B site that converts on desktop. What they share is a high-value local customer base that does their research. A Richmond fitness studio competing against three others on the same street, a restaurant near the MCG that needs to capture the match-day crowd, a Bridge Road boutique trying to also sell online — these are different problems with a similar solution: a site built around how customers actually make decisions.",
    localSignal: "Bridge Road and Swan Street — the two commercial spines of Richmond, each with a distinctly different crowd and different web needs.",
    faq: [
      {
        q: "We're a retailer — can you add ecommerce to the site?",
        a: "Yes. For most Richmond retailers, we'd recommend a purpose-built Shopify store or a Next.js site with a Stripe-powered catalogue, depending on inventory size. We scope the ecommerce requirement before we quote — what you need for 30 SKUs is very different from 3,000.",
      },
      {
        q: "We get a lot of walk-in trade near the MCG on game days. Can the site help with that?",
        a: "Directly, yes — local search for 'restaurant Richmond', 'bar near MCG' peaks before events. A properly structured site with good local schema and a fast mobile load time is what gets you into that pack. We've set this up for hospitality clients and it moves the needle.",
      },
      {
        q: "We're a tech company in Richmond — do we need a local SEO focus?",
        a: "Not necessarily. Tech companies in Richmond are usually targeting a national or global audience, and for them we'd focus on product positioning, conversion architecture, and content strategy rather than suburb-level local SEO. The suburb SEO pages (like this one) are for businesses that need customers from a defined geographic area — if that's not you, we'd scope accordingly.",
      },
    ],
  },
  {
    name: "Fitzroy",
    slug: "fitzroy",
    description:
      "Fitzroy is Melbourne's original creative quarter — Brunswick Street bars and restaurants, independent galleries, design studios, and some of the city's best-known independent retail. We build websites for Fitzroy businesses that have a strong aesthetic identity and need a web presence to match.",
    businesses: "bars, restaurants, galleries, design studios, fashion boutiques, architects, tattoo studios, independent retailers, creative agencies",
    hero: "Fitzroy has good taste. Your website should too.",
    lede: "Brunswick Street has a particular kind of business owner — someone who's made very deliberate choices about their space, their brand, their product, and then accepted whatever website their web-designer cousin built in 2019 because it felt rude to say no. The result is a Fitzroy of two speeds: the physical experience, which is usually excellent, and the digital presence, which usually undersells it. We work with creative businesses and hospitality operators who know exactly what they're about but haven't had that translated into something that ranks, converts, and doesn't embarrass the aesthetic. That's the work.",
    why: "Fitzroy's creative businesses attract customers who are more design-literate than average — which means your website gets judged faster and more harshly than most. A badly built site doesn't just miss conversions; in Fitzroy it actively signals that something's off. On the other side of that coin: get it right and you're speaking the language of a customer willing to pay for quality, who'll share what they like, and who will come back. Fitzroy businesses also draw interstate and international visitors — people searching 'best bar Fitzroy' or 'independent record store Melbourne' from somewhere else entirely. A strong site captures that search and holds the visit.",
    localSignal: "Brunswick Street — the main artery of Fitzroy hospitality and independent retail, running from Johnston Street north toward Alexandra Parade.",
    faq: [
      {
        q: "Our brand has a very specific look. Can you match it?",
        a: "That's the brief we prefer. We design and build in Figma before a line of code is written, and the design is driven by your existing brand identity — typography, colour system, photography style, and all. If your brand guidelines are a mood board, we can work with that. If they're a 40-page PDF, even better.",
      },
      {
        q: "We're a bar or restaurant — do we need to be on Broadsheet and Good Food as well?",
        a: "Yes, and a good website makes those listings more effective. Broadsheet drives awareness. Google drives the moment someone decides where to go tonight. Both matter. We don't get you onto Broadsheet — but we make sure the site they link to converts that traffic properly.",
      },
      {
        q: "What about a gallery or art space — can a website actually sell art?",
        a: "It can, and it does. We've built gallery sites that sell work between shows, attract artist inquiries, and rank for collectors searching by style or medium. It requires good photography, an honest product presentation, and a purchase flow that doesn't feel clinical. All of that is buildable.",
      },
    ],
  },
  {
    name: "Collingwood",
    slug: "collingwood",
    description:
      "Collingwood is Melbourne's design-industry heartland — converted warehouses on Smith Street, independent food businesses, creative offices, and some of the city's most interesting small manufacturers still operating alongside the studios that replaced them. We build websites for Collingwood businesses that operate at a professional level and need a site that reflects it.",
    businesses: "design studios, creative agencies, architecture firms, furniture makers, Smith Street retail, cafes, bars, fashion, small manufacturers, production companies",
    hero: "Collingwood runs a tight industry. Your website should pull its weight.",
    lede: "Collingwood is where Melbourne's creative and design industry actually works — not in the CBD, not in Fitzroy, but in the converted factories and mid-century warehouses off Smith Street where the studios, the agencies, the architects, and the makers are. It's also where the standards are high and the peer group is watching. A Collingwood design studio with a weak website isn't just missing clients — it's sending a signal to every other creative in the building that something's off. We build for businesses in this suburb who understand craft and need the web presence to match: fast, considered, technically clean.",
    why: "Collingwood businesses have a specific challenge: most of their customers and clients know what good looks like. Whether you're a creative studio pitching for a brand project, a furniture maker selling to architects and interior designers, or a café whose customers are the designers in the buildings above — the bar for what 'good' means is set by a very discerning local audience. That cuts both ways. It means a well-built site earns real trust and referral in a community that talks to itself. But it also means a poorly built one gets noticed, fast.",
    localSignal: "Smith Street — the commercial and social spine of Collingwood, where the food businesses, boutiques, and studio entrances mix in a stretch that gets denser and more interesting every year.",
    faq: [
      {
        q: "We're a creative agency — isn't our website a portfolio, not a sales tool?",
        a: "It's both, and treating it as only a portfolio is how agencies lose pitches to studios with worse work but clearer positioning. We've built agency and studio sites that present work beautifully and make a case for hiring you — so the first email you get is a brief, not a 'can you tell me more about what you do?'",
      },
      {
        q: "We make physical products — how do you handle that online?",
        a: "Depends on the product and the sales channel. Furniture and homeware studios in Collingwood often sell through a mix of trade, direct, and showroom — and the website serves a different function for each. We scope the primary use case before designing, so we're not building a Shopify store for someone who sells exclusively to architects.",
      },
      {
        q: "What's the timeline if we need to launch before a major event or trade show?",
        a: "A focused site — five to eight pages, clear scope, content ready on your side — we can build in three to four weeks. Tell us the date you're working toward at the first call and we'll tell you honestly if it's achievable.",
      },
    ],
  },
  {
    name: "Northcote",
    slug: "northcote",
    description:
      "Northcote is a growing inner-north suburb — High Street retail, health and wellness businesses, local ecommerce, family services, and a food scene that's quietly become one of Melbourne's best. We build websites for Northcote businesses that want more customers from their local area and beyond.",
    businesses: "health and wellness studios, local ecommerce, cafes and restaurants, family services, independent retail, allied health, childcare, High Street hospitality",
    hero: "Northcote is growing. Your web presence should be growing with it.",
    lede: "High Street, Northcote has changed considerably in the past decade — there are more good restaurants, more yoga studios, more specialty food businesses, and more people from Thornbury to Fairfield who treat it as their local high street rather than an afterthought. The businesses that have come with that growth are often excellent. The digital infrastructure supporting them is a mixed story — some great, some invisible. What we see repeatedly is good local operators who are well-known on the street and essentially unknown online, missing searches from exactly the kind of customer they want. The fix isn't complicated. The websites we build for Northcote businesses are fast, locally optimised, and built around a clear next step.",
    why: "Northcote's residential character means its businesses are heavily dependent on the local catchment — people within a few suburbs who search for services nearby, make recurring purchases from places they trust, and recommend businesses within their community. Local SEO is particularly high-value here: ranking well for 'physio Northcote', 'yoga Thornbury', 'kids birthday party Northcote' doesn't require enormous authority — it requires a well-structured site with the right local signals. For ecommerce operators in Northcote, there's also a national audience that can be reached without a physical footprint, and a good site is the only way to get in front of them.",
    localSignal: "High Street — the main commercial strip running through Northcote from Westgarth toward Thornbury, with the densest concentration of the suburb's retail, food, and services.",
    faq: [
      {
        q: "We're a health or wellness studio — what do patients and clients actually search for?",
        a: "Usually a service type plus a suburb or nearby suburb: 'physio Northcote', 'remedial massage Thornbury', 'naturopath near Fairfield'. These searches have strong local intent — the person knows what they want and where they want to go. A well-built local SEO setup captures that. We handle the technical side; you bring the expertise.",
      },
      {
        q: "We sell products online but we're based in Northcote — does that affect anything?",
        a: "Not negatively. For ecommerce, the local address isn't a limitation — it's a trust signal for Australian customers who prefer to buy from local businesses. We'd set up the site to speak to both local pickup/delivery and national shipping, and structure the SEO around product terms rather than geography.",
      },
      {
        q: "We're a family-oriented business. Is the design style going to be too cold or minimal?",
        a: "The design adapts to the audience. What we don't do is add colour and stock photos to compensate for a weak layout. Warmth comes from genuine photography, clear copy, and a site that feels effortless to use — not from a pastel palette. We've built for childcare providers, family services, and community-facing businesses in exactly this suburb.",
      },
    ],
  },
  {
    name: "Coburg",
    slug: "coburg",
    description:
      "Coburg is a genuine suburban hub — Sydney Road's multicultural food and retail businesses, local trades, SMBs, and a growing number of small operators who've always relied on word of mouth and are ready to invest in something more. We build websites for Coburg businesses that want to compete for customers in their area and beyond.",
    businesses: "trades and services, multicultural restaurants and grocers, mechanics, real estate, allied health, accounting, local retail, family businesses",
    hero: "Coburg runs on word of mouth. A website makes it travel further.",
    lede: "Sydney Road through Coburg is one of Melbourne's most genuinely local commercial strips — family businesses that have been there for thirty years, newer operators who chose the suburb for the rent and stayed for the community, trades and services that have built a customer base entirely through referral. It's a part of Melbourne that has historically underinvested in digital presence, partly because it didn't need to, and partly because the pitch hasn't landed from people who understand the suburb. We're not here to sell you something you don't need. But if you're a Coburg business that wants to grow beyond your existing network — to reach people searching in Bell Street or Moreland Road before they find your competitors — a proper website is the clearest path.",
    why: "Coburg's businesses face a different competitive landscape than inner-city suburbs. The customer base is broader and more diverse, price sensitivity is real, and the search behaviour reflects that — people searching for 'cheap mechanic Coburg', 'halal restaurant near me', 'plumber Coburg' are ready to act, and they're going to whoever shows up. Many Coburg businesses rank poorly not because they're outcompeted on quality but because their digital presence is weak or absent. That's a solvable problem, and it's often solvable with less investment than business owners expect.",
    localSignal: "Sydney Road — running continuously from Brunswick through Coburg into Moreland, carrying the suburb's multicultural food strip, trades, and mixed retail along its length.",
    faq: [
      {
        q: "We've run on referrals for years — why change what's working?",
        a: "You don't have to, but referrals have a ceiling. They can't reach the person who just moved to Coburg from Sydney, who has no network here yet and is searching for a mechanic or a dentist. A good website doesn't replace referrals — it catches everyone the referral network can't.",
      },
      {
        q: "Our customers speak English as a second language. Can the site accommodate that?",
        a: "Yes. We can build multilingual sites, or sites where the content and tone are clearly accessible to a non-native English audience. We can also advise on whether translated pages would help you rank for searches in other languages — it depends on how your customers actually search, which varies by community.",
      },
      {
        q: "We're a trades business — do we need more than a basic site?",
        a: "Most trades businesses need four things from a website: a clear service list, a local area served, social proof (photos of the work, not stock images), and a contact method that works on mobile. That's not complicated to build, but it's common to see it done badly. Done well, it gets you into the Local Pack for suburb-level searches and filters out the time-wasters before they call.",
      },
    ],
  },
];

export const SUBURB_SLUGS = SUBURBS.map((s) => s.slug);

export function getSuburb(slug: string): SuburbData | undefined {
  return SUBURBS.find((s) => s.slug === slug);
}
