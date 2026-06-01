export type ServiceVisualization = 'wireframe' | 'ui-assemble' | 'logo-morph' | 'neural-network' | 'graph-growth' | 'campaign-metrics'
export type ServiceColor = 'blue' | 'purple' | 'cyan'

export interface Service {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  benefits: string[]
  color: ServiceColor
  visualization: ServiceVisualization
  cta: string
  gradient: string
  glowColor: string
  accentColor: string
  secondaryColor: string
}

export const colorConfig: Record<ServiceColor, { gradient: string; glowColor: string; accentColor: string; secondaryColor: string }> = {
  blue: {
    gradient: 'from-accent-blue via-accent-purple to-accent-cyan',
    glowColor: 'rgba(124,58,237,0.3)',
    accentColor: '#7C3AED',
    secondaryColor: '#06B6D4',
  },
  purple: {
    gradient: 'from-accent-purple via-accent-cyan to-accent-blue',
    glowColor: 'rgba(6,182,212,0.3)',
    accentColor: '#06B6D4',
    secondaryColor: '#22D3EE',
  },
  cyan: {
    gradient: 'from-accent-cyan via-accent-blue to-accent-purple',
    glowColor: 'rgba(34,211,238,0.3)',
    accentColor: '#22D3EE',
    secondaryColor: '#7C3AED',
  },
}

export const services: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    subtitle: 'Engineering Digital Excellence',
    description: 'High-performance web applications engineered with cutting-edge technology. Every line of code is crafted for speed, scalability, and seamless user experiences.',
    longDescription: 'From lightning-fast landing pages to complex web platforms, we build digital experiences that set new standards for performance and aesthetics. Our engineering team combines architectural precision with creative flair to deliver web applications that load instantly, scale effortlessly, and captivate users.',
    benefits: [
      'Next.js & React architecture for sub-second page loads',
      'Server-side rendering with automatic performance optimization',
      'Responsive design that works flawlessly across every device',
      'Enterprise-grade security and accessibility compliance',
    ],
    color: 'blue',
    visualization: 'wireframe',
    cta: 'Start Your Project',
    ...colorConfig.blue,
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    subtitle: 'Crafting Intuitive Interfaces',
    description: 'Human-centered design that transforms complex interactions into effortless experiences. Every pixel serves a purpose.',
    longDescription: 'We design interfaces that users fall in love with. Our process combines deep user research with visual craftsmanship to create digital products that are not just beautiful, but intuitively usable. Every interaction is considered, every animation purposeful, every layout intentional.',
    benefits: [
      'User research and behavioral analysis for data-driven decisions',
      'Comprehensive design systems for brand consistency',
      'Interactive prototypes with micro-interaction design',
      'Accessibility-first approach meeting WCAG 2.1 AA standards',
    ],
    color: 'purple',
    visualization: 'ui-assemble',
    cta: 'Design With Us',
    ...colorConfig.purple,
  },
  {
    id: 'branding',
    title: 'Brand Identity',
    subtitle: 'Designing Iconic Identities',
    description: 'Distinctive brand identities that command attention and build lasting emotional connections with your audience.',
    longDescription: 'Your brand is more than a logo — it is the emotional fingerprint of your business. We craft comprehensive brand identities that communicate your values, differentiate you from competitors, and create instant recognition across every touchpoint.',
    benefits: [
      'Strategic brand positioning and narrative development',
      'Complete visual identity systems with guidelines',
      'Logo design with multiple variations and lockups',
      'Brand asset creation for digital and print applications',
    ],
    color: 'cyan',
    visualization: 'logo-morph',
    cta: 'Build Your Brand',
    ...colorConfig.cyan,
  },
  {
    id: 'ai-automation',
    title: 'AI Automation',
    subtitle: 'Intelligence That Amplifies',
    description: 'Intelligent automation solutions that streamline operations, reduce costs, and unlock new possibilities for your business.',
    longDescription: 'Harness the power of artificial intelligence to transform your business processes. From intelligent chatbots to automated workflows, we build AI solutions that learn, adapt, and deliver measurable results. Your team focuses on what matters while automation handles the rest.',
    benefits: [
      'Custom AI chatbots trained on your business data',
      'Workflow automation reducing manual tasks by up to 80%',
      'Predictive analytics for data-driven decision making',
      'Seamless integration with existing tools and platforms',
    ],
    color: 'blue',
    visualization: 'neural-network',
    cta: 'Automate Today',
    ...colorConfig.blue,
  },
  {
    id: 'seo',
    title: 'SEO & Growth',
    subtitle: 'Dominating Search Rankings',
    description: 'Data-driven SEO strategies that propel your brand to the top of search results and drive sustainable organic growth.',
    longDescription: 'Visibility is currency in the digital economy. Our SEO approach combines technical excellence with strategic content optimization to improve rankings, drive qualified traffic, and generate measurable ROI. We don\'t just improve metrics — we grow businesses.',
    benefits: [
      'Technical SEO audits with actionable remediation plans',
      'Content strategy aligned with search intent and trends',
      'Link building through premium digital PR campaigns',
      'Real-time ranking tracking with monthly performance reports',
    ],
    color: 'purple',
    visualization: 'graph-growth',
    cta: 'Rank Higher',
    ...colorConfig.purple,
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    subtitle: 'Amplifying Your Reach',
    description: 'Strategic campaigns engineered to maximize ROI across every digital channel. Data-informed creativity that converts.',
    longDescription: 'We build marketing engines that deliver consistent, measurable results. By combining creative excellence with rigorous analytics, our campaigns don\'t just capture attention — they drive action. From paid media to email marketing, every channel is optimized for maximum impact.',
    benefits: [
      'Multi-channel campaign strategy and execution',
      'Advanced audience targeting and segmentation',
      'Creative production optimized for each platform',
      'Real-time performance optimization with A/B testing',
    ],
    color: 'cyan',
    visualization: 'campaign-metrics',
    cta: 'Grow Faster',
    ...colorConfig.cyan,
  },
]
