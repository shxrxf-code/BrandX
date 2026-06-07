'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import { insights } from '@/data/insights'
import { cn } from '@/lib/utils'

const categories = ['All', 'Design', 'Brand', 'Engineering', 'Growth', 'E-commerce']

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState('All')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const filtered = activeCategory === 'All'
    ? insights
    : insights.filter((i) => i.category === activeCategory)

  const featured = filtered[0]
  const rest = filtered.slice(1, 5)

  return (
    <section
      id="insights"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden border-t border-white/[0.04]"
    >
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <SectionLabel number="08" label="Field Notes" className="mb-6" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-white max-w-2xl"
            >
              Thinking,{' '}
              <span className="text-gradient-shine">shared openly</span>.
            </motion.h2>
          </div>
          <Link
            href="#"
            className="group inline-flex items-center gap-2 text-white/70 hover:text-accent transition-colors"
            data-cursor-hover
          >
            <span className="text-sm font-medium uppercase tracking-wider">
              All insights
            </span>
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                activeCategory === cat
                  ? 'bg-accent text-white shadow-[0_0_20px_rgba(91,91,255,0.4)]'
                  : 'bg-white/[0.04] text-white/60 border border-white/[0.06] hover:border-white/15 hover:text-white'
              )}
              data-cursor-hover
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured + grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {featured && (
            <Link
              href="#"
              className="lg:col-span-7 group block"
              data-cursor-hover
            >
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden bg-background-tertiary border border-white/[0.06] hover:border-accent/30 transition-colors duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={featured.cover}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  <div className="absolute top-6 left-6">
                    <span className="px-3 py-1 rounded-full glass-elevated border border-white/10 text-xs font-mono uppercase tracking-wider text-white">
                      {featured.category}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-3 text-xs text-white/40 font-mono uppercase tracking-wider mb-4">
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span>{featured.readTime}</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-white leading-tight mb-3 group-hover:text-accent transition-colors duration-500">
                    {featured.title}
                  </h3>
                  <p className="text-white/55 leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-semibold text-accent">
                        {featured.author.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{featured.author.name}</div>
                        <div className="text-xs text-white/40">{featured.author.role}</div>
                      </div>
                    </div>
                    <ArrowUpRight size={20} className="text-white/40 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                  </div>
                </div>
              </motion.article>
            </Link>
          )}

          <div className="lg:col-span-5 space-y-3">
            {rest.map((insight, i) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
              >
                <Link
                  href="#"
                  className="group flex gap-4 p-4 rounded-2xl border border-white/[0.05] hover:border-accent/30 hover:bg-white/[0.02] transition-all duration-500"
                  data-cursor-hover
                >
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-background-tertiary">
                    <Image
                      src={insight.cover}
                      alt={insight.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="80px"
                      quality={75}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1.5">
                      <span className="text-accent">{insight.category}</span>
                      <span>·</span>
                      <span>{insight.readTime}</span>
                    </div>
                    <h4 className="font-display text-base font-medium text-white leading-snug group-hover:text-accent transition-colors duration-500 line-clamp-2">
                      {insight.title}
                    </h4>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-white/30 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500 flex-shrink-0 mt-1"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
