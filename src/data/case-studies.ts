export interface CaseStudy {
  id: string
  slug: string
  client: string
  title: string
  category: string
  industry: string
  year: string
  cover: string
  hero: string
  description: string
  challenge: string
  strategy: string
  execution: string
  results: string[]
  impact: { label: string; value: string }[]
  tech: string[]
  services: string[]
  duration: string
  featured: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'solartech',
    slug: 'solartech-energy',
    client: 'SolarTech Energy',
    title: 'Reimagining a clean energy brand for a global stage',
    category: 'Brand · Web · Growth',
    industry: 'Clean Energy',
    year: '2026',
    cover: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=85',
    hero: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=2000&q=85',
    description: 'A complete rebrand and digital platform for a renewable energy scale-up expanding across three continents.',
    challenge: 'SolarTech had product-market fit in two markets, but a fragmented identity, dated web platform, and a brand voice that failed to inspire investor confidence were holding back their US and EU expansion.',
    strategy: 'We built a unified brand narrative around "energy for the next century", redesigned the visual identity to feel premium and trustworthy, and architected a modular web platform built to scale into 14 markets.',
    execution: 'Identity system, motion language, design system, full website rebuild, SEO foundation, and a 6-month GTM campaign to support the Series B announcement.',
    results: [
      '+340% inbound qualified leads in 90 days',
      '3.2x pipeline growth within six months',
      'Closed $48M Series B with new brand assets',
      '+180% organic search traffic in 4 months',
    ],
    impact: [
      { label: 'Conversion Lift', value: '+340%' },
      { label: 'Organic Traffic', value: '+180%' },
      { label: 'Pipeline Value', value: '$48M' },
      { label: 'Time to Market', value: '90 days' },
    ],
    tech: ['Next.js', 'Tailwind', 'Framer Motion', 'Sanity CMS', 'HubSpot', 'Vercel'],
    services: ['Brand Identity', 'Web Platform', 'SEO', 'Content Strategy'],
    duration: '14 weeks',
    featured: true,
  },
  {
    id: 'drifto',
    slug: 'drifto-fashion',
    client: 'Drifto',
    title: 'A fashion-native commerce experience for the TikTok generation',
    category: 'E-commerce · Brand',
    industry: 'Fashion & Lifestyle',
    year: '2025',
    cover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=85',
    hero: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=2000&q=85',
    description: 'Built a headless commerce platform with editorial storytelling, drop mechanics, and a creator-led marketing engine.',
    challenge: 'Drifto\'s legacy Shopify stack was crushing conversion, mobile performance was below 40 Lighthouse, and there was no room to express the brand\'s editorial voice.',
    strategy: 'We re-platformed to a headless Next.js / Shopify Hydrogen stack, designed an editorial CMS, and built creator-led product pages optimized for TikTok-driven traffic spikes.',
    execution: 'Storefront rebuild, content modeling, design system, drop scheduling, KOL program, paid social engine.',
    results: [
      'Lighthouse mobile score: 42 → 97',
      '+260% conversion rate in 8 weeks',
      '3x return on ad spend in 60 days',
      'Sold out 4 consecutive product drops',
    ],
    impact: [
      { label: 'Mobile Performance', value: '97' },
      { label: 'Conversion', value: '+260%' },
      { label: 'ROAS', value: '3.0x' },
      { label: 'Sell-through', value: '100%' },
    ],
    tech: ['Next.js', 'Shopify Hydrogen', 'Tailwind', 'GSAP', 'Klaviyo', 'Sanity'],
    services: ['E-commerce', 'Web Development', 'Performance', 'Paid Social'],
    duration: '10 weeks',
    featured: true,
  },
  {
    id: 'finflow',
    slug: 'finflow',
    client: 'FinFlow',
    title: 'Enterprise-grade design system for a B2B fintech',
    category: 'Design System · Product',
    industry: 'B2B Fintech',
    year: '2025',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85',
    hero: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=2000&q=85',
    description: 'Unified the design and engineering teams around a single, scalable design system powering four products.',
    challenge: 'Five product squads, four design tools, and a fragmented UI was slowing velocity and eroding trust with enterprise customers.',
    strategy: 'We delivered a tokenized design system, a documented component library, and an internal "Brandex Playbook" so engineering and design could ship independently and at speed.',
    execution: 'Audit, tokens, Figma library, React component library, Storybook, rollout workshops.',
    results: [
      '4 product teams on one source of truth',
      '62% reduction in time to ship new flows',
      '$2.4M ARR expansion from unified UX',
      'NPS improved from 32 → 67',
    ],
    impact: [
      { label: 'Ship Velocity', value: '+62%' },
      { label: 'ARR Expansion', value: '$2.4M' },
      { label: 'NPS', value: '+35' },
      { label: 'Components', value: '180+' },
    ],
    tech: ['Figma', 'Storybook', 'React', 'TypeScript', 'Tokens Studio'],
    services: ['Design System', 'Product Design', 'Engineering Enablement'],
    duration: '12 weeks',
    featured: true,
  },
  {
    id: 'lumen-clinics',
    slug: 'lumen-clinics',
    client: 'Lumen Clinics',
    title: 'A trust-first digital presence for premium healthcare',
    category: 'Brand · Web · SEO',
    industry: 'Healthcare',
    year: '2025',
    cover: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=85',
    hero: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=2000&q=85',
    description: 'Repositioned a premium clinic network as the most trusted name in concierge medicine across MENA.',
    challenge: 'Lumen was technically excellent but invisible online. Their competitors dominated paid search, and their brand language read as "spa", not "medicine".',
    strategy: 'We rebuilt the brand to lead with clinical authority, designed a content engine around specialist expertise, and built a lightning-fast, accessible site.',
    execution: 'Brand strategy, identity, web, programmatic SEO, content production, paid media.',
    results: [
      'Top 3 ranking for 84 priority keywords',
      '+410% organic appointment bookings',
      'Cost per acquisition down 58%',
      'Featured in Forbes Health & Gulf Business',
    ],
    impact: [
      { label: 'Bookings', value: '+410%' },
      { label: 'CPA Reduction', value: '−58%' },
      { label: 'Top-3 Keywords', value: '84' },
      { label: 'Authority', value: 'Forbes' },
    ],
    tech: ['Next.js', 'Contentful', 'Tailwind', 'Schema.org', 'GA4'],
    services: ['Brand', 'Web', 'SEO', 'Paid Media'],
    duration: '16 weeks',
    featured: false,
  },
  {
    id: 'meridian-realty',
    slug: 'meridian-realty',
    client: 'Meridian Realty',
    title: 'A property platform that sells before the broker calls',
    category: 'Web · Brand',
    industry: 'Real Estate',
    year: '2025',
    cover: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=85',
    hero: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&q=85',
    description: 'Built a $200M+ property portfolio experience with cinematic property tours and an investor-grade lead engine.',
    challenge: 'Meridian\'s inventory was best-in-class, but the digital experience was a generic IDX feed that left buyers cold and investors unimpressed.',
    strategy: 'We designed a cinematic property story-first experience, built an investor portal, and integrated a CRM that lets agents close in minutes.',
    execution: 'Web platform, property storytelling system, CRM integration, broker enablement.',
    results: [
      '$210M in properties transacted via the platform',
      '+520% qualified investor leads',
      'Time on property page: 1:12 → 6:48',
      'Featured in Architectural Digest',
    ],
    impact: [
      { label: 'GMV', value: '$210M' },
      { label: 'Investor Leads', value: '+520%' },
      { label: 'Time on Page', value: '6:48' },
      { label: 'Coverage', value: 'AD' },
    ],
    tech: ['Next.js', 'Mapbox', 'Tailwind', 'HubSpot', 'Cloudinary'],
    services: ['Web Platform', 'Brand', 'CRM Integration'],
    duration: '18 weeks',
    featured: false,
  },
  {
    id: 'arc-studio',
    slug: 'arc-studio',
    client: 'Arc Studio',
    title: 'A creative agency rebrand that wins awards',
    category: 'Brand · Identity',
    industry: 'Creative',
    year: '2024',
    cover: 'https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1600&q=85',
    hero: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=2000&q=85',
    description: 'Repositioned a 12-year-old design agency as a future-forward creative partner with a brand that wins Awwwards.',
    challenge: 'Arc had world-class craft but a brand that looked like 2014. They were losing pitches to younger studios with sharper identity.',
    strategy: 'We tore down the visual language and rebuilt it from first principles — typography, motion, voice — so the brand matched the work.',
    execution: 'Strategy, identity, motion system, site, guidelines, launch campaign.',
    results: [
      'Awwarded SOTD within 2 weeks of launch',
      '6 new enterprise clients in 90 days',
      'Average project value up 2.4x',
      'Featured in Type01 & Brand New',
    ],
    impact: [
      { label: 'Awwwards SOTD', value: '×1' },
      { label: 'Enterprise Wins', value: '6' },
      { label: 'Project Value', value: '2.4x' },
      { label: 'Press', value: 'Type01' },
    ],
    tech: ['Figma', 'WebGL', 'Next.js', 'GSAP', 'Lenis'],
    services: ['Brand Identity', 'Web', 'Motion'],
    duration: '8 weeks',
    featured: false,
  },
]

export const featuredCaseStudies = caseStudies.filter((c) => c.featured)
