'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useIsMobile } from '@/lib/hooks'
import { featuredCaseStudies } from '@/data/case-studies'
import SectionLabel from '@/components/ui/SectionLabel'
import MagneticButton from '@/components/ui/MagneticButton'
import { cn } from '@/lib/utils'

export default function FeaturedCaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle accent backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/[0.04] rounded-full blur-[200px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <SectionLabel number="02" label="Featured Work" className="mb-6" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-white max-w-2xl"
            >
              Selected work,{' '}
              <span className="text-gradient-shine">measurable impact</span>.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MagneticButton variant="outline" href="/portfolio" showArrow>
              View All Projects
            </MagneticButton>
          </motion.div>
        </div>

        {/* Showcase */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main image panel */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] md:aspect-[16/11] rounded-3xl overflow-hidden bg-background-tertiary border border-white/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredCaseStudies[activeIndex].id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={featuredCaseStudies[activeIndex].cover}
                    alt={featuredCaseStudies[activeIndex].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    quality={85}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Floating results overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="flex flex-wrap gap-2 mb-6"
                    >
                      {featuredCaseStudies[activeIndex].impact.slice(0, 2).map((m) => (
                        <div
                          key={m.label}
                          className="px-4 py-2 rounded-full glass-elevated border border-white/10"
                        >
                          <span className="font-display text-base font-semibold text-white">
                            {m.value}
                          </span>
                          <span className="text-white/50 text-xs ml-2">{m.label}</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Top-right tag */}
              <div className="absolute top-6 right-6 z-10">
                <div className="px-3 py-1.5 rounded-full glass-elevated border border-white/10 text-xs font-mono uppercase tracking-wider text-white/70">
                  {featuredCaseStudies[activeIndex].year}
                </div>
              </div>
            </div>
          </div>

          {/* Side: title + project list */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Active project info */}
            <div className="mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredCaseStudies[activeIndex].id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent">
                      {featuredCaseStudies[activeIndex].category}
                    </span>
                    <span className="h-px flex-1 bg-white/10" />
                    <span className="text-xs font-mono uppercase tracking-wider text-white/40">
                      {featuredCaseStudies[activeIndex].industry}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-3 leading-tight">
                    {featuredCaseStudies[activeIndex].title}
                  </h3>
                  <p className="text-white/55 mb-5 leading-relaxed">
                    {featuredCaseStudies[activeIndex].description}
                  </p>
                  <Link
                    href={`/portfolio/${featuredCaseStudies[activeIndex].slug}`}
                    className="group inline-flex items-center gap-2 text-white hover:text-accent transition-colors"
                    data-cursor-hover
                  >
                    <span className="text-sm font-medium uppercase tracking-wider">Read case study</span>
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Project list selector */}
            <div className="mt-auto space-y-2">
              {featuredCaseStudies.map((study, i) => {
                const isActive = i === activeIndex
                return (
                  <button
                    key={study.id}
                    onClick={() => setActiveIndex(i)}
                    onMouseEnter={() => !isMobile && setActiveIndex(i)}
                    className={cn(
                      'group w-full text-left p-4 rounded-2xl border transition-all duration-500',
                      isActive
                        ? 'glass-elevated border-accent/30 bg-accent/[0.04]'
                        : 'border-white/5 hover:border-white/15 hover:bg-white/[0.02]'
                    )}
                    data-cursor-hover
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          'font-mono text-xs tabular-nums w-6 transition-colors',
                          isActive ? 'text-accent' : 'text-white/30'
                        )}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div
                          className={cn(
                            'font-display text-base font-medium transition-colors',
                            isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'
                          )}
                        >
                          {study.client}
                        </div>
                        <div className="text-xs text-white/40 truncate mt-0.5">
                          {study.category}
                        </div>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className={cn(
                          'transition-all duration-500',
                          isActive ? 'text-accent translate-x-0 -translate-y-0 opacity-100' : 'text-white/30 -translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0'
                        )}
                      />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
