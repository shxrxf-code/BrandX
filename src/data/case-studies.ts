export interface CaseStudy {
  slug: string
  client: string
  title: string
  category: string
  year: string
  cover: string
  hero: string
  result: string
  description: string
  challenge: string
  outcome: string
  metrics: { label: string; value: string }[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'solartech-energy',
    client: 'SolarTech',
    title: 'A clean energy brand for a global stage',
    category: 'Brand · Web',
    year: '2026',
    cover: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80',
    hero: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=2400&q=85',
    result: '+340% inbound leads',
    description: 'Complete rebrand and digital platform for a renewable energy scale-up expanding across three continents.',
    challenge: 'Fragmented identity, dated web platform, and a brand voice that failed to inspire investor confidence were holding back US and EU expansion.',
    outcome: 'A unified brand narrative, premium visual system, and modular web platform built to scale into 14 markets.',
    metrics: [
      { label: 'Inbound leads', value: '+340%' },
      { label: 'Organic traffic', value: '+180%' },
      { label: 'Pipeline', value: '$48M' },
      { label: 'Time to market', value: '90d' },
    ],
  },
  {
    slug: 'drifto-fashion',
    client: 'Drifto',
    title: 'Fashion-native commerce for the TikTok generation',
    category: 'E-commerce',
    year: '2025',
    cover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80',
    hero: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=2400&q=85',
    result: '+260% conversion',
    description: 'Headless commerce platform with editorial storytelling, drop mechanics, and a creator-led marketing engine.',
    challenge: 'Legacy Shopify stack was crushing conversion, mobile performance was below 40 Lighthouse, and the brand voice was lost.',
    outcome: 'Headless Next.js / Shopify Hydrogen platform with editorial CMS, creator-led product pages, and TikTok-optimized velocity.',
    metrics: [
      { label: 'Mobile performance', value: '97' },
      { label: 'Conversion', value: '+260%' },
      { label: 'ROAS', value: '3.0x' },
      { label: 'Sell-through', value: '100%' },
    ],
  },
  {
    slug: 'finflow',
    client: 'FinFlow',
    title: 'Enterprise design system for a B2B fintech',
    category: 'Design System',
    year: '2025',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80',
    hero: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=2400&q=85',
    result: '$2.4M ARR expansion',
    description: 'Unified four product teams around a single scalable design system powering the entire platform.',
    challenge: 'Five product squads, four design tools, and a fragmented UI was slowing velocity and eroding trust with enterprise customers.',
    outcome: 'Tokenized design system, documented component library, and an internal "Brandex Playbook" enabling independent, fast shipping.',
    metrics: [
      { label: 'Ship velocity', value: '+62%' },
      { label: 'ARR expansion', value: '$2.4M' },
      { label: 'NPS', value: '+35' },
      { label: 'Components', value: '180+' },
    ],
  },
  {
    slug: 'lumen-clinics',
    client: 'Lumen',
    title: 'A trust-first digital presence for premium healthcare',
    category: 'Brand · Web · SEO',
    year: '2025',
    cover: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80',
    hero: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=2400&q=85',
    result: '+410% bookings',
    description: 'Repositioned a premium clinic network as the most trusted name in concierge medicine across MENA.',
    challenge: 'Technically excellent but invisible online. Competitors dominated paid search and the brand read as "spa", not "medicine".',
    outcome: 'Brand rebuilt around clinical authority. Content engine built around specialist expertise. Lightning-fast, accessible site.',
    metrics: [
      { label: 'Bookings', value: '+410%' },
      { label: 'CPA', value: '−58%' },
      { label: 'Top-3 keywords', value: '84' },
      { label: 'Authority', value: 'Forbes' },
    ],
  },
]
