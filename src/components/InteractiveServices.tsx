'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Plus, Minus } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { services } from '@/data/services'
import { useIsMobile } from '@/lib/hooks'
import { cn } from '@/lib/utils'

export default function InteractiveServices() {
  const [activeId, setActiveId] = useState(services[0].id)
  const isMobile = useIsMobile()
  const active = services.find((s) => s.id === activeId)!

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/[0.04]"
    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[200px] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
          <div className="lg:col-span-7">
            <SectionLabel number="04" label="Capabilities" className="mb-6" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-white"
            >
              Enterprise services,{' '}
              <span className="text-gradient-shine">studio intimacy</span>.
            </motion.h2>
          </div>
          <div className="lg:col-span-5 lg:pt-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/55 text-lg leading-relaxed"
            >
              Six tightly-defined capabilities. We don&apos;t do "general digital".
              Each service is a practice with frameworks, principles, and proof.
            </motion.p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Service list */}
          <div className="lg:col-span-5 space-y-2">
            {services.map((service) => {
              const isActive = service.id === activeId
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveId(service.id)}
                  onMouseEnter={() => !isMobile && setActiveId(service.id)}
                  className={cn(
                    'group w-full text-left p-5 md:p-6 rounded-2xl border transition-all duration-500',
                    isActive
                      ? 'glass-elevated border-accent/30 bg-accent/[0.04]'
                      : 'border-white/5 hover:border-white/15 hover:bg-white/[0.02]'
                  )}
                  data-cursor-hover
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <span
                        className={cn(
                          'font-mono text-xs tabular-nums transition-colors',
                          isActive ? 'text-accent' : 'text-white/30'
                        )}
                      >
                        {service.number}
                      </span>
                      <div className="min-w-0">
                        <div
                          className={cn(
                            'font-display text-lg md:text-xl font-medium transition-colors truncate',
                            isActive ? 'text-white' : 'text-white/65 group-hover:text-white/90'
                          )}
                        >
                          {service.title}
                        </div>
                        <div
                          className={cn(
                            'text-xs mt-0.5 transition-colors truncate',
                            isActive ? 'text-white/50' : 'text-white/30'
                          )}
                        >
                          {service.timeline}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className={cn(
                        'transition-all duration-500 flex-shrink-0',
                        isActive
                          ? 'text-accent translate-x-0 -translate-y-0 opacity-100'
                          : 'text-white/30 -translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0'
                      )}
                    />
                  </div>
                </button>
              )
            })}
          </div>

          {/* Service detail panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-8 md:p-10 rounded-3xl glass-elevated border border-white/[0.06] overflow-hidden"
              >
                {/* Background glow */}
                <div
                  className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-accent/15 blur-[100px] pointer-events-none"
                />

                <div className="relative z-10">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent">
                        {active.number} — Service
                      </span>
                    </div>
                    <h3 className="font-display text-2xl md:text-4xl font-semibold text-white leading-tight mb-3">
                      {active.tagline}
                    </h3>
                    <p className="text-white/55 leading-relaxed">
                      {active.longDescription}
                    </p>
                  </div>

                  {/* Outcomes */}
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {active.outcomes.map((o) => (
                      <div
                        key={o.label}
                        className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center"
                      >
                        <div className="font-display text-2xl md:text-3xl font-semibold text-white">
                          {o.value}
                        </div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 mt-1">
                          {o.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Process + deliverables in 2 cols */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-4">
                        Process
                      </div>
                      <div className="space-y-3">
                        {active.process.map((step, i) => (
                          <div key={step.step} className="flex gap-3">
                            <span className="font-mono text-xs text-white/30 tabular-nums pt-0.5">
                              {step.step}
                            </span>
                            <div>
                              <div className="text-sm font-medium text-white">{step.title}</div>
                              <div className="text-xs text-white/45 leading-relaxed mt-0.5">
                                {step.description}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-4">
                        Deliverables
                      </div>
                      <ul className="space-y-2">
                        {active.deliverables.map((d) => (
                          <li
                            key={d}
                            className="flex items-center gap-2 text-sm text-white/70"
                          >
                            <span className="w-1 h-1 rounded-full bg-accent" />
                            {d}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6">
                        <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-3">
                          Stack
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {active.technologies.slice(0, 5).map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono text-white/60 uppercase tracking-wider"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
