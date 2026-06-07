export interface CaseStudy {
  slug: string
  client: string
  title: string
  category: string
  year: string
  cover: string
  result: string
  description: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'solartech-energy',
    client: 'SolarTech Energy',
    title: 'Clean energy brand for a global stage',
    category: 'Brand · Web',
    year: '2026',
    cover: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80',
    result: '+340% inbound leads',
    description: 'A complete rebrand and digital platform for a renewable energy scale-up expanding across three continents.',
  },
  {
    slug: 'drifto-fashion',
    client: 'Drifto',
    title: 'A fashion-native commerce experience',
    category: 'E-commerce',
    year: '2025',
    cover: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80',
    result: '+260% conversion',
    description: 'Headless commerce platform with editorial storytelling, drop mechanics, and a creator-led marketing engine.',
  },
  {
    slug: 'finflow',
    client: 'FinFlow',
    title: 'Enterprise design system for fintech',
    category: 'Design System',
    year: '2025',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80',
    result: '$2.4M ARR expansion',
    description: 'Unified four product teams around a single scalable design system powering the entire platform.',
  },
]
