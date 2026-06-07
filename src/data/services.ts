export interface Service {
  id: string
  number: string
  title: string
  tagline: string
  description: string
  longDescription: string
  benefits: string[]
  process: { step: string; title: string; description: string }[]
  deliverables: string[]
  timeline: string
  technologies: string[]
  outcomes: { label: string; value: string }[]
  caseStudyId?: string
}

export const services: Service[] = [
  {
    id: 'brand-strategy',
    number: '01',
    title: 'Brand Strategy & Identity',
    tagline: 'Build a brand the market cannot ignore.',
    description: 'Strategic positioning, identity systems, and verbal architecture that give your brand a defensible, premium presence.',
    longDescription: 'We help you find the language, the visual system, and the strategic territory that makes your brand unforgettable. From naming to identity, narrative to guidelines — every artifact is engineered to scale across teams, channels, and continents.',
    benefits: [
      'Defensible positioning against category incumbents',
      'Distinctive identity system that scales from a favicon to a stadium',
      'Verbal identity and messaging architecture',
      'Brand book and asset system for cross-functional teams',
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Competitive audit, internal interviews, perception research.' },
      { step: '02', title: 'Position', description: 'Strategic territory, narrative pillars, brand architecture.' },
      { step: '03', title: 'Design', description: 'Identity, typography, color, motion, voice, guidelines.' },
      { step: '04', title: 'Launch', description: 'Rollout strategy, internal enablement, public launch.' },
    ],
    deliverables: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines', 'Messaging Framework', 'Motion System', 'Asset Library'],
    timeline: '6–10 weeks',
    technologies: ['Figma', 'Adobe CC', 'Cinema 4D', 'Tokens Studio', 'Lottie'],
    outcomes: [
      { label: 'Brand Recall', value: '+74%' },
      { label: 'Premium Pricing', value: '2.1x' },
      { label: 'Talent Magnetism', value: '+58%' },
    ],
    caseStudyId: 'arc-studio',
  },
  {
    id: 'web-platforms',
    number: '02',
    title: 'Web Platforms & Experiences',
    tagline: 'Websites that perform like a product.',
    description: 'Next.js, headless CMS, and motion-rich experiences engineered for speed, conversion, and scale.',
    longDescription: 'We architect and engineer web platforms that load in under a second, convert like a category leader, and scale to millions of sessions. Our work spans marketing sites, product surfaces, design systems, and complex content platforms.',
    benefits: [
      'Sub-second LCP on 4G, mobile-first',
      '90+ Lighthouse scores out of the box',
      'Headless CMS architecture for marketing velocity',
      'A/B testing infrastructure baked in from day one',
    ],
    process: [
      { step: '01', title: 'Strategy', description: 'Audience modeling, conversion architecture, content plan.' },
      { step: '02', title: 'Design', description: 'Design system, page templates, motion language.' },
      { step: '03', title: 'Build', description: 'Next.js, headless CMS, integrations, edge deployment.' },
      { step: '04', title: 'Optimize', description: 'CRO, analytics, instrumentation, iteration.' },
    ],
    deliverables: ['Information Architecture', 'Design System', 'Next.js Build', 'Headless CMS', 'Analytics Stack', 'CRO Roadmap'],
    timeline: '8–14 weeks',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Sanity', 'Contentful', 'Vercel', 'GSAP', 'Lenis'],
    outcomes: [
      { label: 'Lighthouse', value: '95+' },
      { label: 'Conversion', value: '+220%' },
      { label: 'Bounce Rate', value: '−48%' },
    ],
    caseStudyId: 'solartech',
  },
  {
    id: 'ui-ux-product',
    number: '03',
    title: 'UI/UX & Product Design',
    tagline: 'Interfaces that move metrics.',
    description: 'Human-centered product design — research, IA, interaction, and visual design for web and native.',
    longDescription: 'We design products that customers love to use and teams love to build. Our practice combines behavioral research with rigorous visual craft to ship interfaces that move the metrics that matter.',
    benefits: [
      'Research-driven decisions, not opinions',
      'Tokenized design system from day one',
      'Accessibility-first, WCAG 2.2 AA',
      'Engineering-ready Figma libraries',
    ],
    process: [
      { step: '01', title: 'Research', description: 'User interviews, jobs-to-be-done, analytics audit.' },
      { step: '02', title: 'Architect', description: 'Information architecture, flows, prototypes.' },
      { step: '03', title: 'Design', description: 'Visual system, components, motion, handoff.' },
      { step: '04', title: 'Validate', description: 'Usability testing, iteration, launch.' },
    ],
    deliverables: ['Research Findings', 'Information Architecture', 'Design System', 'High-Fidelity Designs', 'Prototypes', 'Handoff Specs'],
    timeline: '6–12 weeks',
    technologies: ['Figma', 'Framer', 'Maze', 'Hotjar', 'Storybook'],
    outcomes: [
      { label: 'NPS', value: '+35' },
      { label: 'Task Success', value: '+62%' },
      { label: 'Support Tickets', value: '−41%' },
    ],
    caseStudyId: 'finflow',
  },
  {
    id: 'seo-growth',
    number: '04',
    title: 'SEO & Organic Growth',
    tagline: 'Own your category in search.',
    description: 'Technical SEO, content strategy, and digital PR that compounds into category-defining organic growth.',
    longDescription: 'We build SEO programs that compound over years, not weeks. From technical foundations to authority-building digital PR, we engineer organic channels that become your most defensible growth moat.',
    benefits: [
      'Technical SEO audits with prioritized remediation',
      'Topical authority and content cluster strategy',
      'Digital PR and link acquisition at scale',
      'Programmatic SEO for category domination',
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Technical audit, content audit, backlink profile, competitor map.' },
      { step: '02', title: 'Strategy', description: 'Keyword universe, topical map, content plan, link strategy.' },
      { step: '03', title: 'Execute', description: 'Content production, technical fixes, digital PR, optimization.' },
      { step: '04', title: 'Compound', description: 'Iteration, expansion, new markets, new surfaces (SGE, YouTube, etc).' },
    ],
    deliverables: ['Technical SEO', 'Content Strategy', 'Digital PR', 'Programmatic SEO', 'Schema & AEO', 'Monthly Reporting'],
    timeline: 'Ongoing (90-day sprints)',
    technologies: ['Ahrefs', 'Semrush', 'Looker Studio', 'Contentful', 'Schema.org'],
    outcomes: [
      { label: 'Organic Traffic', value: '+340%' },
      { label: 'Top-3 Keywords', value: '84' },
      { label: 'Domain Rating', value: '+24' },
    ],
    caseStudyId: 'solartech',
  },
  {
    id: 'performance-marketing',
    number: '05',
    title: 'Performance & Brand Marketing',
    tagline: 'Demand gen that respects the brand.',
    description: 'Paid media, lifecycle, and brand campaigns engineered for the entire funnel — not just last-click.',
    longDescription: 'We run media that hits the numbers without diluting the brand. Full-funnel programs across paid social, search, programmatic, lifecycle, and offline, instrumented end-to-end.',
    benefits: [
      'Full-funnel attribution, not just last-click',
      'Creative-engine model — ship 10x the variants',
      'Lifecycle, CRM, and retention built in',
      'Brand and performance measured as one system',
    ],
    process: [
      { step: '01', title: 'Model', description: 'Unit economics, attribution, audience architecture.' },
      { step: '02', title: 'Build', description: 'Channel mix, creative engine, measurement stack.' },
      { step: '03', title: 'Launch', description: 'Always-on testing, rapid creative iteration.' },
      { step: '04', title: 'Scale', description: 'Channel expansion, audience expansion, geo expansion.' },
    ],
    deliverables: ['Media Strategy', 'Creative Engine', 'Paid Search', 'Paid Social', 'Lifecycle', 'Attribution'],
    timeline: 'Ongoing',
    technologies: ['Google Ads', 'Meta', 'TikTok', 'LinkedIn', 'GA4', 'Segment', 'Klaviyo', 'Webflow'],
    outcomes: [
      { label: 'ROAS', value: '3.4x' },
      { label: 'CAC', value: '−42%' },
      { label: 'LTV/CAC', value: '4.2x' },
    ],
    caseStudyId: 'drifto',
  },
  {
    id: 'mobile-apps',
    number: '06',
    title: 'Mobile Apps & Platforms',
    tagline: 'Native-feeling products, shipped at startup speed.',
    description: 'iOS, Android, and React Native apps with a design system that feels like a category leader.',
    longDescription: 'We design and build mobile products that earn a place on the home screen. From consumer apps to enterprise platforms, our work pairs behavioral design with engineering excellence.',
    benefits: [
      'Cross-platform without the cross-platform feel',
      'Offline-first architecture for emerging markets',
      'Native performance with shared design system',
      'App Store optimization and growth built in',
    ],
    process: [
      { step: '01', title: 'Concept', description: 'Jobs to be done, opportunity sizing, MVP definition.' },
      { step: '02', title: 'Design', description: 'Native patterns, motion, micro-interactions, system.' },
      { step: '03', title: 'Build', description: 'React Native / Swift / Kotlin, backend, integrations.' },
      { step: '04', title: 'Launch', description: 'TestFlight, beta, ASO, growth loops.' },
    ],
    deliverables: ['Product Strategy', 'UX/UI Design', 'Native Build', 'Backend', 'Analytics', 'ASO'],
    timeline: '12–20 weeks',
    technologies: ['React Native', 'Swift', 'Kotlin', 'Expo', 'Firebase', 'Supabase'],
    outcomes: [
      { label: 'D30 Retention', value: '38%' },
      { label: 'Store Rating', value: '4.8★' },
      { label: 'Crash-free', value: '99.9%' },
    ],
  },
]
