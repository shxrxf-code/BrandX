'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { caseStudies } from '@/data/case-studies'
import { cn } from '@/lib/utils'

const filters = ['All', 'Brand', 'Web', 'Growth', 'Product', 'E-commerce']

const projectTypeMap: Record<string, string> = {
  'solartech': 'Growth',
  'drifto': 'E-commerce',
  'finflow': 'Product',
  'lumen-clinics': 'Web',
  'meridian-realty': 'Web',
  'arc-studio': 'Brand',
}

export default function PortfolioGrid() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All'
    ? caseStudies
    : caseStudies.filter((c) => projectTypeMap[c.id] === active)

  return (
    <section className="relative py-24 md:py-32">
      <div className="section-container">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-16">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  active === f
                    ? 'bg-accent text-white shadow-[0_0_20px_rgba(91,91,255,0.4)]'
                    : 'bg-white/[0.04] text-white/60 border border-white/[0.06] hover:border-white/15 hover:text-white'
                )}
                data-cursor-hover
              >
                {f}
              </button>
            ))}
          </div>
          <div className="text-xs font-mono text-white/40 uppercase tracking-wider">
            {String(filtered.length).padStart(2, '0')} Projects
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {filtered.map((study, i) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <Link
                  href={`/portfolio/${study.slug}`}
                  className="block"
                  data-cursor-hover
                >
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-background-tertiary border border-white/[0.06] mb-6">
                    <Image
                      src={study.cover}
                      alt={study.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={85}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    {/* Year badge */}
                    <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full glass-elevated border border-white/10 text-xs font-mono uppercase tracking-wider text-white">
                      {study.year}
                    </div>

                    {/* Floating arrow */}
                    <div className="absolute top-5 right-5 w-10 h-10 rounded-full glass-elevated border border-white/10 flex items-center justify-center text-white group-hover:bg-accent group-hover:border-accent group-hover:scale-110 transition-all duration-500">
                      <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>

                    {/* Impact pill */}
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                      <div>
                        <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-1.5">
                          {study.industry}
                        </div>
                        <div className="font-display text-2xl font-semibold text-white">
                          {study.client}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 justify-end max-w-[60%]">
                        {study.impact.slice(0, 2).map((m) => (
                          <span
                            key={m.label}
                            className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white"
                          >
                            {m.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-medium text-white leading-snug group-hover:text-accent transition-colors duration-500 mb-2 max-w-md">
                        {study.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-white/40 font-mono uppercase tracking-wider">
                        <span>{study.category}</span>
                        <span>·</span>
                        <span>{study.duration}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
