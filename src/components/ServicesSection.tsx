'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const iconAnimations: Record<string, Record<string, number[]>> = {
  'web-development': { x: [0, -2, 2, 0] },
  'ui-ux-design': { rotate: [0, 6, -6, 0], scale: [1, 1.08, 1] },
  'brand-identity': { y: [0, -4, 0] },
  seo: { y: [0, -5, 0] },
  'digital-marketing': { y: [0, -3, 0], scaleY: [1, 1.1, 1] },
  'ai-solutions': { scale: [1, 1.12, 1] },
}

const services = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom web applications, headless CMS architectures, and scalable frontends built with modern frameworks like Next.js and React.',
    deliverables: ['Custom Development', 'Headless CMS', 'API Integration', 'Performance Optimization'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Research-driven design systems, interactive prototypes, and intuitive user flows crafted for maximum conversion.',
    deliverables: ['User Research', 'Wireframing', 'Visual Design', 'Prototyping'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    description: 'Strategic brand systems including visual identity, typography, and comprehensive guidelines that communicate unique value.',
    deliverables: ['Brand Strategy', 'Visual Identity', 'Logo & Wordmark', 'Brand Guidelines'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 'seo',
    title: 'SEO',
    description: 'Technical SEO audits, content strategy, and performance engineering for sustainable organic growth.',
    deliverables: ['Technical Audit', 'Keyword Strategy', 'Content Production', 'Authority Building'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="20" x2="20" y2="20" />
        <polyline points="4 12 8 8 12 12 20 4" />
        <polyline points="16 4 20 4 20 8" />
      </svg>
    ),
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Paid media and lifecycle programs that turn traffic into revenue with measurable attribution.',
    deliverables: ['Paid Search & Social', 'Lifecycle & CRM', 'Analytics & Attribution', 'Creative Production'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    description: 'Custom AI agents, LLM-powered features, and intelligent automation that transform business operations.',
    deliverables: ['AI Strategy', 'Custom Agents', 'LLM Integration', 'Process Automation'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 014 4c0 2-2 3-2 5v1h-4v-1c0-2-2-3-2-5a4 4 0 014-4z" />
        <path d="M12 17v3" />
        <path d="M8 21h8" />
      </svg>
    ),
  },
]

const featureVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.06, duration: 0.25, ease: 'easeOut' },
  }),
}

function ServiceCard({
  service,
}: {
  service: (typeof services)[0]
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      <motion.div
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative cursor-default rounded-2xl overflow-hidden glass-card"
      >
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-[400ms] ease-out pointer-events-none"
          style={{
            opacity: hovered ? 1 : 0,
            background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(217,70,239,0.04))',
          }}
        />

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between mb-3">
            <motion.div
              animate={hovered ? iconAnimations[service.id] : {}}
              transition={{ type: 'spring', stiffness: 250, damping: 14 }}
              className={`
                w-10 h-10 rounded-xl flex items-center justify-center
                ${hovered ? 'bg-accent/20 text-accent' : 'bg-white/5 text-muted'}
              `}
            >
              {service.icon}
            </motion.div>
          </div>

          <h3 className="text-base sm:text-lg font-display font-bold tracking-tight text-foreground mb-1.5">
            {service.title}
          </h3>

          <p className="text-sm text-muted leading-relaxed mb-3 line-clamp-2">
            {service.description}
          </p>

          <div className="flex items-center gap-1 text-sm font-medium">
            <motion.span
              animate={{ color: hovered ? '#8B5CF6' : '#94A3B8' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              Learn More
            </motion.span>
            <motion.svg
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              animate={{ x: hovered ? 12 : 0, color: hovered ? '#8B5CF6' : '#94A3B8' }}
              transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: hovered ? 'auto' : 0,
            opacity: hovered ? 1 : 0,
          }}
          transition={{
            height: { duration: 0.35, ease: 'easeOut' },
            opacity: { duration: 0.3, ease: 'easeOut', delay: hovered ? 0.1 : 0 },
          }}
          className="overflow-hidden"
        >
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
            <div className="border-t border-white/10 pt-4">
              <span className="text-[10px] text-accent font-semibold tracking-[0.15em] uppercase mb-3 block">
                What We Deliver
              </span>
              <div className="space-y-2">
                {service.deliverables.map((d, i) => (
                  <motion.div
                    key={d}
                    custom={i}
                    variants={featureVariants}
                    initial="hidden"
                    animate={hovered ? 'visible' : 'hidden'}
                    className="flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span className="text-sm text-muted">{d}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function ServicesSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-background scroll-mt-24" id="services">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px] animate-aurora-slow" />
      </div>
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
        <div className="mb-12 md:mb-16">
          <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-3">
            Services
          </span>
          <h2 className="text-heading-2 font-bold tracking-tight mb-3">
            What We Build.
          </h2>
          <p className="text-muted text-sm max-w-2xl">
            We help businesses grow through design, development, branding, marketing, and AI-powered solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
