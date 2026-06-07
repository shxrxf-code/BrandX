export interface Service {
  id: string
  title: string
  description: string
  deliverables: string[]
}

export const services: Service[] = [
  {
    id: 'web-design',
    title: 'Website Design',
    description: 'Premium websites engineered for speed, clarity, and conversion. From marketing sites to product platforms.',
    deliverables: ['Strategy & Sitemap', 'UI/UX Design', 'Webflow or Custom Build', 'Performance & SEO'],
  },
  {
    id: 'branding',
    title: 'Branding',
    description: 'Identity systems built to scale. We design brands that look the same in a deck, on a billboard, and on a phone.',
    deliverables: ['Brand Strategy', 'Visual Identity', 'Logo & Wordmark', 'Brand Guidelines'],
  },
  {
    id: 'seo',
    title: 'SEO',
    description: 'Technical and content SEO that compounds. We build the foundation that puts you in front of the right buyers.',
    deliverables: ['Technical Audit', 'Keyword Strategy', 'Content Production', 'Authority Building'],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Paid media and lifecycle programs that turn traffic into revenue. We measure what matters.',
    deliverables: ['Paid Search & Social', 'Lifecycle & CRM', 'Analytics & Attribution', 'Creative Production'],
  },
]
