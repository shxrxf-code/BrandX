export interface Service {
  id: string
  title: string
  description: string
  deliverables: string[]
}

export const services: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom web applications, headless CMS architectures, and scalable frontends built with modern frameworks like Next.js and React.',
    deliverables: ['Custom Development', 'Headless CMS', 'API Integration', 'Performance Optimization'],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Research-driven design systems, interactive prototypes, and intuitive user flows crafted for maximum conversion.',
    deliverables: ['User Research', 'Wireframing', 'Visual Design', 'Prototyping'],
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    description: 'Strategic brand systems including visual identity, typography, and comprehensive guidelines that communicate unique value.',
    deliverables: ['Brand Strategy', 'Visual Identity', 'Logo & Wordmark', 'Brand Guidelines'],
  },
  {
    id: 'seo',
    title: 'SEO',
    description: 'Technical SEO audits, content strategy, and performance engineering for sustainable organic growth.',
    deliverables: ['Technical Audit', 'Keyword Strategy', 'Content Production', 'Authority Building'],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Paid media and lifecycle programs that turn traffic into revenue with measurable attribution.',
    deliverables: ['Paid Search & Social', 'Lifecycle & CRM', 'Analytics & Attribution', 'Creative Production'],
  },
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    description: 'Custom AI agents, LLM-powered features, and intelligent automation that transform business operations.',
    deliverables: ['AI Strategy', 'Custom Agents', 'LLM Integration', 'Process Automation'],
  },
]
