'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

const iconHover = {
  'web-development': { rotate: 10 },
  'ui-ux-design': { scale: 1.2 },
  'brand-identity': { scale: [1, 1.12, 1] },
  seo: { y: -3 },
  'digital-marketing': { rotate: 15 },
  'ai-solutions': { scale: 1.15 },
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

function ServiceCard({
  service,
}: {
  service: (typeof services)[0]
}) {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isFeatured = service.id === 'ai-solutions'

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 200, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 18 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = (e.clientX - centerX) / (rect.width / 2) * 8
    const dy = (e.clientY - centerY) / (rect.height / 2) * 8
    mouseX.set(dx)
    mouseY.set(dy)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      variants={cardVariants}
      className="group relative"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative"
        style={{ perspective: 1000 }}
      >
        <motion.div
          style={{ x: springX, y: springY }}
          layout
          onClick={() => setExpanded(!expanded)}
          className={`
            relative cursor-pointer rounded-2xl border transition-colors duration-300 overflow-hidden
            ${expanded
              ? 'border-accent/30 bg-gradient-to-br from-accent/[0.03] via-white to-purple-600/[0.02] shadow-lg shadow-accent/5'
              : 'border-border bg-white'
            }
          `}
          whileHover={expanded ? {} : {
            y: -10,
            scale: 1.02,
            boxShadow: '0 20px 50px -12px rgba(37, 99, 235, 0.15), 0 8px 24px -6px rgba(0, 0, 0, 0.06)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          onHoverStart={(e) => {
            if (expanded) return
            const el = e.currentTarget as HTMLElement
            el.animate([
              { rotate: '0deg', offset: 0 },
              { rotate: '2deg', offset: 0.25 },
              { rotate: '-2deg', offset: 0.5 },
              { rotate: '1deg', offset: 0.75 },
              { rotate: '0deg', offset: 1 },
            ], { duration: 400, easing: 'ease-out', fill: 'forwards' })
          }}
        >
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          </div>

          {isFeatured && hovered && !expanded && (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-gradient-to-r from-accent to-purple-600 rounded-full text-[10px] font-semibold text-white tracking-wider uppercase"
            >
              Popular
            </motion.div>
          )}
          {isFeatured && !hovered && !expanded && (
            <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-gradient-to-r from-accent to-purple-600 rounded-full text-[10px] font-semibold text-white tracking-wider uppercase">
              Popular
            </div>
          )}

          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between mb-3">
              <motion.div
                whileHover={iconHover[service.id as keyof typeof iconHover]}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className={`
                  w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                  ${expanded
                    ? 'bg-accent text-white shadow-md shadow-accent/20'
                    : 'bg-accent/5 text-accent group-hover:bg-accent/10'
                  }
                `}
              >
                {service.icon}
              </motion.div>
              {expanded && (
                <button
                  onClick={(e) => { e.stopPropagation(); setExpanded(false) }}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-black/5 transition-all duration-200 -mr-1 -mt-1"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-display font-bold tracking-tight text-foreground mb-1.5">
              {service.title}
            </h3>

            <p className={`text-sm text-muted leading-relaxed mb-3 ${!expanded ? 'line-clamp-2' : ''}`}>
              {service.description}
            </p>

            {!expanded && (
              <motion.div
                className="flex items-center gap-1 text-sm font-medium"
                initial={false}
                whileHover={{ color: '#2563EB' }}
                transition={{ duration: 0.2 }}
              >
                <span>Learn More</span>
                <motion.svg
                  width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  whileHover={{ x: 8 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </motion.svg>
              </motion.div>
            )}
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 border-t border-border/50">
                  <div className="pt-4">
                    <span className="text-[10px] text-accent font-semibold tracking-[0.15em] uppercase mb-3 block">
                      Key Deliverables
                    </span>
                    <div className="space-y-2 mb-5">
                      {service.deliverables.map((d) => (
                        <div key={d} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          <span className="text-sm text-foreground">{d}</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-dark transition-colors duration-200"
                    >
                      Start Project
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-background" id="services">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-3">
            Services
          </span>
          <h2 className="text-heading-2 font-bold tracking-tight mb-3">
            What We Build.
          </h2>
          <p className="text-muted text-sm max-w-xl">
            We help businesses grow through design, development, branding, marketing, and AI-powered solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
