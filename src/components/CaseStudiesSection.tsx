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
        <span className="scene-eyebrow">Case Studies</span>
        <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
          Deep dives into
          <br />
          <span className="text-accent">transformational work.</span>
        </h2>
      </div>

      <motion.div style={{ x }} className="flex gap-8 md:gap-10 px-6 md:px-10">
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className="group flex-shrink-0 w-[90vw] md:w-[520px] lg:w-[600px] xl:w-[680px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
              viewport={{ once: true, margin: '-150px' }}
              className="relative rounded-3xl overflow-hidden border border-border bg-subtle transition-all duration-700 hover:border-accent/30 hover:shadow-[0_40px_80px_-20px_rgba(59,130,246,0.12)]"
            >
              <div className="relative aspect-[16/10] md:aspect-[4/3] overflow-hidden">
                <div
                  className="absolute inset-0 opacity-50 group-hover:opacity-80 transition-opacity duration-700"
                  style={{ background: `radial-gradient(ellipse at center, ${p.gradient})` }}
                />
                <div className="absolute inset-0 dot-grid opacity-15" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute inset-0 flex items-end p-8 md:p-10 lg:p-12">
                  <div className="w-full">
                    <span className="text-[10px] text-accent tracking-[0.2em] uppercase font-medium mb-3 block">
                      {p.industry}
                    </span>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground mb-6">
                      {p.title}
                    </h3>
                  </div>
                </div>

                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <div className="w-12 h-12 rounded-xl bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent transition-all duration-500">
                    <span className="text-2xl group-hover:translate-x-1 transition-transform duration-500">→</span>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-10 lg:p-12 space-y-8 border-t border-border">
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  <div>
                    <span className="text-[10px] text-muted-dark tracking-[0.15em] uppercase font-mono block mb-2">Challenge</span>
                    <p className="text-base md:text-lg text-muted leading-relaxed">{p.challenge}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-dark tracking-[0.15em] uppercase font-mono block mb-2">Solution</span>
                    <p className="text-base md:text-lg text-muted leading-relaxed">{p.solution}</p>
                  </div>
                </div>

                <div className="flex items-end justify-between pt-6 border-t border-border">
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-accent tracking-tight">
                      {p.result}
                    </span>
                    <div className="pl-4 border-l border-border/50">
                      <p className="text-[10px] text-muted tracking-[0.15em] uppercase mb-1">{p.resultLabel}</p>
                      <p className="text-sm text-muted-dark font-medium">Measured outcome</p>
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-xl border border-border-light flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent transition-all duration-500">
                    <span className="text-xl group-hover:translate-x-1 transition-transform duration-500">→</span>
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
