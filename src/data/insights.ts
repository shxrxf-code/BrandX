export interface Insight {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  cover: string
  author: { name: string; role: string; avatar: string }
  featured?: boolean
}

export const insights: Insight[] = [
  {
    id: 'design-systems-2026',
    slug: 'design-systems-2026',
    title: 'Design systems in 2026: from component library to business OS',
    excerpt: 'Why the most valuable design systems are no longer about components — they are operating systems for product velocity.',
    category: 'Design Systems',
    readTime: '9 min read',
    date: 'May 2026',
    cover: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1600&q=85',
    author: { name: 'Aarav Mehta', role: 'Principal Designer', avatar: 'AM' },
    featured: true,
  },
  {
    id: 'cinematic-ecommerce',
    slug: 'cinematic-ecommerce',
    title: 'Cinematic commerce: the next era of premium e-commerce',
    excerpt: 'How brands like Drifto and SKIMS are turning product pages into editorial, and what that means for conversion.',
    category: 'E-commerce',
    readTime: '7 min read',
    date: 'May 2026',
    cover: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=85',
    author: { name: 'Priya Sharma', role: 'Strategy Director', avatar: 'PS' },
  },
  {
    id: 'ai-search-seo',
    slug: 'ai-search-seo',
    title: 'SEO for AI search: the playbook for ChatGPT, Perplexity & SGE',
    excerpt: 'The rules of search have changed. Here is the technical and content playbook for winning in the AI answer era.',
    category: 'Growth',
    readTime: '12 min read',
    date: 'Apr 2026',
    cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=85',
    author: { name: 'Karthik Iyer', role: 'Head of Growth', avatar: 'KI' },
  },
  {
    id: 'brand-premium-pricing',
    slug: 'brand-premium-pricing',
    title: 'Why a great brand is the cheapest growth lever you have',
    excerpt: 'We analyzed 80 rebrands over five years. The data on premium pricing, talent magnetism, and payback is unambiguous.',
    category: 'Brand',
    readTime: '8 min read',
    date: 'Apr 2026',
    cover: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=85',
    author: { name: 'Aarav Mehta', role: 'Principal Designer', avatar: 'AM' },
  },
  {
    id: 'performance-budgets',
    slug: 'performance-budgets',
    title: 'The 100ms rule: performance budgets for premium brands',
    excerpt: 'A 100ms delay in load time costs 7% in conversion. Here is how to set and enforce a performance budget.',
    category: 'Engineering',
    readTime: '6 min read',
    date: 'Mar 2026',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85',
    author: { name: 'Devansh Rao', role: 'Engineering Lead', avatar: 'DR' },
  },
  {
    id: 'awwwards-patterns',
    slug: 'awwwards-patterns',
    title: 'Five Awwwards patterns we are obsessed with in 2026',
    excerpt: 'A field guide to the motion, type, and interaction patterns that are defining this year\'s best agency work.',
    category: 'Design',
    readTime: '10 min read',
    date: 'Mar 2026',
    cover: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1600&q=85',
    author: { name: 'Aarav Mehta', role: 'Principal Designer', avatar: 'AM' },
  },
]

export const featuredInsights = insights.filter((i) => i.featured)
