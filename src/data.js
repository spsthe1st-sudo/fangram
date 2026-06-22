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
    no: '01', name: 'Fan Commerce', tag: 'Signed merch & drops',
    body: 'We launch where money already moves: signed merchandise and fan commerce. Tangible, repeatable, the lowest-friction way to prove a fan will pay. The wedge, not a novelty.',
    accent: 'var(--flow-green)',
  },
  {
    no: '02', name: 'Fan Engagement', tag: 'Personalised access & experiences',
    body: 'Then the relationship layer: personalised messages, interactions, virtual experiences. Built for recurring revenue and real connection, dodging the one-off shoutout trap that sank Cameo.',
    accent: 'var(--flow-amber)',
  },
  {
    no: '03', name: 'Events & Brands', tag: 'Appearances & partnerships',
    body: 'Finally the high-value layer: events, appearances, brand partnerships routed through FanGram’s fan data. Brand deals flow to talent, and the platform becomes the business they run on.',
    accent: 'var(--flow-coral)',
  },
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

export const MOAT = [
  { k: 'Fan data', v: 'The relationship and purchase history no single tool owns today.' },
  { k: 'Multi-rail revenue', v: 'Five income streams that diversify and retain talent.' },
  { k: 'The operating system', v: 'Talent focuses on craft; FanGram runs the business around it. That is the lock-in.' },
];
