'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { services } from '@/data/services'
import { cn } from '@/lib/utils'

export default function ServicesGrid() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = activeId ? services.find((s) => s.id === activeId) : null

  return (
    <section className="relative py-24 md:py-32">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-px bg-white/[0.04] rounded-3xl overflow-hidden border border-white/[0.06]">
          {services.map((service, i) => (
            <button
              key={service.id}
              onClick={() => setActiveId(service.id)}
              onMouseEnter={() => setActiveId(service.id)}
              className={cn(
                'group relative text-left p-8 md:p-12 transition-colors duration-500',
                'bg-background-secondary hover:bg-background-tertiary',
                'flex flex-col min-h-[420px]'
              )}
              data-cursor-hover
            >
              {/* Number */}
              <div className="font-mono text-xs text-accent tracking-[0.2em] mb-6">
                {service.number} — Service
              </div>

              {/* Title */}
              <h3 className="font-display text-3xl md:text-5xl font-semibold text-white leading-[1.05] tracking-tight mb-4">
                {service.title}
              </h3>

              {/* Tagline */}
              <p className="text-lg text-white/60 leading-relaxed mb-6 max-w-md">
                {service.tagline}
              </p>

              {/* Bottom row */}
              <div className="mt-auto flex items-end justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {service.outcomes.map((o) => (
                    <span
                      key={o.label}
                      className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono uppercase tracking-wider text-white/60"
                    >
                      {o.value} {o.label}
                    </span>
                  ))}
                </div>
                <div className="w-12 h-12 rounded-full bg-accent/0 border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                  <ArrowUpRight
                    size={18}
                    className="text-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 100%, rgba(91,91,255,0.08) 0%, transparent 50%)',
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveId(null)}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong rounded-3xl border border-white/[0.08]"
            >
              <button
                onClick={() => setActiveId(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white z-10"
                aria-label="Close"
                data-cursor-hover
              >
                ✕
              </button>

              <div className="p-8 md:p-12">
                <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-4">
                  {active.number} — Service
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-semibold text-white tracking-tight leading-[1.05] mb-4">
                  {active.title}
                </h2>
                <p className="text-lg text-white/60 leading-relaxed mb-8">
                  {active.longDescription}
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-4">
                      Process
                    </div>
                    <div className="space-y-3">
                      {active.process.map((step) => (
                        <div key={step.step} className="flex gap-3">
                          <span className="font-mono text-xs text-white/30 tabular-nums pt-0.5">
                            {step.step}
                          </span>
                          <div>
                            <div className="text-sm font-medium text-white">{step.title}</div>
                            <div className="text-xs text-white/45 mt-0.5">{step.description}</div>
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
                        <li key={d} className="flex items-center gap-2 text-sm text-white/70">
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
                        {active.technologies.map((t) => (
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

                <div className="grid grid-cols-3 gap-3 mb-8">
                  {active.outcomes.map((o) => (
                    <div
                      key={o.label}
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center"
                    >
                      <div className="font-display text-3xl font-semibold text-white">{o.value}</div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 mt-1">
                        {o.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-xs text-white/40 font-mono uppercase tracking-wider">
                  <span>Timeline: {active.timeline}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
