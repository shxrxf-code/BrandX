'use client'

import { useState } from 'react'

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

function ServiceCard({
  service,
}: {
  service: (typeof services)[0]
}) {
  const [expanded, setExpanded] = useState(false)
  const isFeatured = service.id === 'ai-solutions'

  const handleClick = () => setExpanded(!expanded)

  return (
    <div
      onClick={handleClick}
      className={`
        relative cursor-pointer rounded-2xl border overflow-hidden
        ${expanded
          ? 'border-accent/30 bg-gradient-to-br from-accent/[0.03] via-white to-purple-600/[0.02]'
          : 'border-border bg-white'
        }
      `}
    >
      {isFeatured && !expanded && (
        <div
          style={{ top: 16, right: 16 }}
          className="absolute px-2.5 py-0.5 bg-gradient-to-r from-accent to-purple-600 rounded-full text-[10px] font-semibold text-white tracking-wider uppercase"
        >
          Popular
        </div>
      )}

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between mb-3">
          <div
            className={`
              w-10 h-10 rounded-xl flex items-center justify-center
              ${expanded
                ? 'bg-accent text-white'
                : 'bg-accent/5 text-accent'
              }
            `}
          >
            {service.icon}
          </div>
          {expanded && (
            <button
              onClick={(e) => { e.stopPropagation(); setExpanded(false) }}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-black/5 -mr-1 -mt-1"
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
          <div className="flex items-center gap-1 text-sm font-medium">
            <span>Learn More</span>
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>

      {expanded && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 border-t border-border/50 overflow-hidden">
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
      )}
    </div>
  )
}

export default function ServicesSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-background" id="services">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="mb-12 md:mb-16">
          <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-3">
            Services
          </span>
          <h2 className="text-heading-2 font-bold tracking-tight mb-3">
            What We Build.
          </h2>
          <p className="text-muted text-sm max-w-xl">
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
