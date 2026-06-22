// FanGram — strategy narrative (India-first), drafted from market research.
// Voice: founder-operator. Numbers are defensible estimates; swap with real ones.

export const STATS = [
  { n: '4M+', l: 'creators in India' },
  { n: '~12%', l: 'who actually monetise' },
  { n: '$1T', l: 'creator-influenced spend by 2030' },
  { n: '70/30', l: 'split — talent keeps the most' },
];

export const SEGMENTS = [
  {
    tag: 'Talent',
    lead: 'Every kind of talent.',
    body: 'Athletes, musicians, entertainers, digital creators, public figures, anyone with an audience and a story. We meet talent where monetisation is thinnest and fan love runs highest.',
    accent: 'var(--flow-green)',
  },
  {
    tag: 'Fans',
    lead: 'Superfans want in.',
    body: 'Not another follow. Real access, signed pieces, a stake in the journey. The top 5% of fans drive most of the spend, and they are desperate for a way to.',
    accent: 'var(--flow-amber)',
  },
  {
    tag: 'Brands',
    lead: 'Brands want the real thing.',
    body: 'Authentic, measurable reach into engaged communities, routed through the talent they already trust. Outcomes, not vanity impressions.',
    accent: 'var(--flow-coral)',
  },
];

export const PHASES = [
  {
    no: '01', name: 'Brand Challenges', tag: 'Brand-funded creator contests',
    body: 'We launch with the wedge that pays for itself: brands fund contests, hundreds of micro-creators compete to make content around a product. Brands fund our supply, creators arrive with intent, and we get the whole market without paying to acquire it.',
    accent: 'var(--flow-green)',
  },
  {
    no: '02', name: 'Creator Storefronts', tag: 'Merch, drops & fan commerce',
    body: 'The creators the contests surface graduate into stores: signed merch, drops, fan commerce. The lowest-friction proof a fan will pay, now aimed at talent we already know converts. Money where it already moves.',
    accent: 'var(--flow-amber)',
  },
  {
    no: '03', name: 'Fans & Events', tag: 'Access, memberships, appearances',
    body: 'Then the recurring layer: personalised access, memberships, events and brand partnerships routed through FanGram’s fan data. The platform becomes the business talent runs on, not a one-off shoutout that sank Cameo.',
    accent: 'var(--flow-coral)',
  },
]

// the contest mechanic — FanGram's customer-acquisition engine
export const CHALLENGE = [
  { k: 'A brand puts up the budget', v: 'Product plus a prize pool, for a fraction of one mainstream-creator retainer. Flexible, performance-led, not a fixed contract.' },
  { k: 'The long tail competes', v: 'Hundreds of micro and nano creators (10k–500k, the highest engagement on earth) make authentic content around the product to win.' },
  { k: 'The brand wins big', v: 'Volume reach, real trackable sales, and a library of owned UGC to repurpose in their own ads. More for less, and measurable.' },
  { k: 'Creators finally monetise', v: 'Cash, merch and exposure with a real leaderboard. Their first clear path to income, and no one walks away with nothing.' },
  { k: 'The flywheel ignites', v: 'Every creator lands on FanGram and their fans follow. Winners graduate into storefronts and the five rails. Brands fund the whole loop.' },
];

export const REVENUE = [
  { k: 'Commerce commission', v: 'A clean cut of every merch and fan-commerce sale.' },
  { k: 'Membership & access', v: 'Recurring fan subscriptions for ongoing access and perks.' },
  { k: 'Brand-deal take', v: 'A share of every brand partnership routed through the platform.' },
  { k: 'Creator tools', v: 'Premium tooling and analytics for talent who scale.' },
  { k: 'Promoted discovery', v: 'Paid placement connecting brands and fans to the right talent.' },
];

export const FLYWHEEL = [
  { k: 'Creators bring fans', v: 'Talent arrives with an audience no ad budget can buy.' },
  { k: 'Fans bring spend and signal', v: 'Their purchases and data reveal exactly what works.' },
  { k: 'Brands bring budgets', v: 'That signal pulls in brand money chasing real engagement.' },
  { k: 'Budgets and tools keep talent', v: 'More income and better tooling make leaving unthinkable. Repeat.' },
];

export const GTM = [
  { k: 'Supply-led wedge', v: 'Win a tight set of under-monetised but highly-engaged talent first, across every category. Fans follow talent, not platforms.' },
  { k: 'Prove repeat, not GMV', v: 'The first cohort is a live test. The metric that matters is repeat purchase, not vanity volume.' },
  { k: 'Spin the flywheel', v: 'Engaged fans attract brands; brand money and tools retain talent; talent brings more fans.' },
  { k: 'Then expand', v: 'India is the beachhead, not the ceiling. The proven engine travels to every thin-monetisation market.' },
];

export const ROADMAP = [
  {
    d: 'Days 0–30', h: 'Land the wedge',
    items: ['Sign 10–20 anchor talent across categories', 'Ship the merch + fan-commerce MVP', 'Instrument every interaction from day one'],
    exit: 'first drops live, data flowing',
  },
  {
    d: 'Days 31–60', h: 'Prove repeat',
    items: ['Run the first cohort as a live test', 'Read repeat purchase by talent, not vanity GMV', 'Kill what stalls, double down on what sells'],
    exit: 'a repeatable winning motion',
  },
  {
    d: 'Days 61–90', h: 'Spin the flywheel',
    items: ['Onboard the first brand partnerships', 'Pilot the engagement and access layer', 'Use the data to plan the next, larger cohort'],
    exit: 'flywheel turning, scale plan ready',
  },
];

export const COMPETE = [
  { name: 'Cameo', model: 'One-off videos', take: '25%', repeat: 'No', rails: 'One' },
  { name: 'Patreon', model: 'Membership', take: '~10%', repeat: 'Yes', rails: 'One' },
  { name: 'Fanfix', model: 'Subscriptions', take: '20%', repeat: 'Yes', rails: 'Few' },
  { name: 'FanGram', model: 'Full-stack engine', take: '30%, falls at scale', repeat: 'Built-in', rails: 'Five', us: true },
];

export const HARDQ = [
  { q: 'Isn’t this just Cameo?', a: 'Cameo sold a one-off novelty on a single rail. FanGram is built on repeat purchase across five. Same space, opposite model, opposite outcome.' },
  { q: 'Why a 30% take rate?', a: 'Because we run the whole business: fulfilment, brand deals, tooling, support. It falls as we scale, and talent still keeps the 70% that matters most.' },
  { q: 'Why India first?', a: 'Millions of under-monetised talent, almost no infrastructure, and the global players aren’t here. The widest gap with the least competition.' },
  { q: 'What if talent won’t switch?', a: 'We never ask them to. We add income they don’t have today, then quietly become the system they run on.' },
];

export const MOAT = [
  { k: 'Fan data', v: 'The relationship and purchase history no single tool owns today.' },
  { k: 'Multi-rail revenue', v: 'Five income streams that diversify and retain talent.' },
  { k: 'The operating system', v: 'Talent focuses on craft; FanGram runs the business around it. That is the lock-in.' },
];
