'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

const projects = [
  {
    slug: 'solartech-energy',
    title: 'SolarTech Energy',
    industry: 'Clean Energy',
    challenge: 'Fragmented brand identity across 14 markets with a dated web platform that failed to inspire investor confidence.',
    solution: 'Unified brand narrative with a premium visual system and modular web platform built for global scale.',
    result: '+340%',
    resultLabel: 'Inbound Leads',
    gradient: 'from-blue-500/20 via-blue-400/10 to-transparent',
  },
  {
    slug: 'drifto',
    title: 'Drifto',
    industry: 'E-Commerce',
    challenge: 'Legacy Shopify stack crushing conversion with mobile Lighthouse scores below 40 and a lost brand voice.',
    solution: 'Headless Next.js platform with editorial CMS, creator-led product pages, and TikTok-optimized velocity.',
    result: '+260%',
    resultLabel: 'Conversion Rate',
    gradient: 'from-blue-600/20 via-blue-500/10 to-transparent',
  },
  {
    slug: 'finflow',
    title: 'FinFlow',
    industry: 'Fintech',
    challenge: 'Five product squads using four design tools created a fragmented UI that slowed velocity and eroded trust.',
    solution: 'Tokenized design system, documented component library, and an internal playbook for independent shipping.',
    result: '$2.4M',
    resultLabel: 'ARR Expansion',
    gradient: 'from-blue-500/15 via-blue-400/8 to-transparent',
  },
  {
    slug: 'lumen',
    title: 'Lumen Clinics',
    industry: 'Healthcare',
    challenge: 'Technically excellent but invisible online. Competitors dominated search and the brand read as spa, not medicine.',
    solution: 'Brand rebuilt around clinical authority with a content engine driven by specialist expertise.',
    result: '+410%',
    resultLabel: 'Bookings',
    gradient: 'from-blue-400/20 via-blue-600/10 to-transparent',
  },
]

export default function CaseStudiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <section ref={sectionRef} className="relative bg-background py-24 md:py-32 overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-10 mb-16">
        <span className="scene-eyebrow">Featured Projects</span>
        <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
          Real projects,
          <br />
          <span className="text-accent">real results.</span>
        </h2>
      </div>

      <motion.div style={{ x }} className="flex gap-6 md:gap-8 px-6 md:px-10">
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="group flex-shrink-0 w-[85vw] md:w-[480px] lg:w-[560px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              viewport={{ once: true, margin: '-100px' }}
              className="relative rounded-2xl overflow-hidden border border-border bg-subtle"
            >
              <div
                className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-700"
                style={{ background: `radial-gradient(ellipse at center, ${p.gradient})` }}
              />
              <div className="absolute inset-0 dot-grid opacity-20" />

              <div className="relative z-10 p-8 md:p-10 lg:p-12 min-h-[380px] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-accent tracking-[0.2em] uppercase font-medium">
                    {p.industry}
                  </span>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight mt-3 mb-4">
                    {p.title}
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="text-[10px] text-muted-dark tracking-[0.15em] uppercase font-mono block mb-1">Challenge</span>
                      <p className="text-xs md:text-sm text-muted leading-relaxed">{p.challenge}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-dark tracking-[0.15em] uppercase font-mono block mb-1">Solution</span>
                      <p className="text-xs md:text-sm text-muted leading-relaxed">{p.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-end justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-3xl md:text-5xl font-display font-bold text-accent">{p.result}</span>
                    <p className="text-[10px] text-muted tracking-[0.15em] uppercase mt-1">{p.resultLabel}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent transition-all duration-500">
                    <span className="text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </section>
  )
}
