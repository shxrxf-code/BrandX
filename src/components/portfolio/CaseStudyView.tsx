'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import type { CaseStudy } from '@/data/case-studies'
import { caseStudies } from '@/data/case-studies'

export default function CaseStudyView({ study }: { study: CaseStudy }) {
  const idx = caseStudies.findIndex((c) => c.id === study.id)
  const next = caseStudies[(idx + 1) % caseStudies.length]
  const prev = caseStudies[(idx - 1 + caseStudies.length) % caseStudies.length]

  return (
    <article>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full opacity-40"
            style={{
              background: 'radial-gradient(ellipse at top, rgba(91,91,255,0.3) 0%, transparent 60%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        <div className="section-container relative z-10">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-white/50 hover:text-accent transition-colors mb-12 text-sm"
            data-cursor-hover
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="uppercase tracking-wider font-medium">All Projects</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1.5 rounded-full glass-elevated border border-white/10 text-xs font-mono uppercase tracking-wider text-white">
              {study.industry}
            </span>
            <span className="px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-mono uppercase tracking-wider text-accent">
              {study.year}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-white/40">
              {study.duration}
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-7xl lg:text-8xl font-semibold text-white tracking-[-0.04em] leading-[0.95] max-w-5xl mb-6">
            {study.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/55 max-w-3xl leading-relaxed">
            {study.description}
          </p>
        </div>
      </section>

      {/* Hero image */}
      <section className="relative pb-16 md:pb-24">
        <div className="section-container">
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/[0.06]">
            <Image
              src={study.hero}
              alt={study.title}
              fill
              className="object-cover"
              sizes="100vw"
              quality={90}
              priority
            />
          </div>
        </div>
      </section>

      {/* Quick facts + services */}
      <section className="py-16 border-y border-white/[0.06]">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-2">
                Client
              </div>
              <div className="font-display text-lg text-white">{study.client}</div>
            </div>
            <div>
              <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-2">
                Category
              </div>
              <div className="font-display text-lg text-white">{study.category}</div>
            </div>
            <div>
              <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-2">
                Duration
              </div>
              <div className="font-display text-lg text-white">{study.duration}</div>
            </div>
            <div>
              <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-2">
                Services
              </div>
              <div className="font-display text-lg text-white">{study.services.join(', ')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact metrics */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {study.impact.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-8 rounded-3xl glass-elevated border border-white/[0.06]"
              >
                <div className="font-display text-4xl md:text-5xl font-semibold text-white tabular-nums mb-2">
                  {m.value}
                </div>
                <div className="text-xs text-white/40 font-mono uppercase tracking-wider">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story sections */}
      <section className="py-16 md:py-24 space-y-24">
        <div className="section-container">
          <StoryBlock label="The Challenge" body={study.challenge} />
        </div>
        <div className="section-container">
          <StoryBlock label="The Strategy" body={study.strategy} />
        </div>
        <div className="section-container">
          <StoryBlock label="The Execution" body={study.execution} />
        </div>
      </section>

      {/* Results list */}
      <section className="py-16 md:py-24 border-t border-white/[0.06]">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-4">
                The Results
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-white tracking-tight leading-[1.05]">
                Outcomes we&apos;re proud of.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="space-y-4">
                {study.results.map((r, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex items-start gap-4 p-6 rounded-2xl glass-elevated border border-white/[0.06]"
                  >
                    <span className="text-accent text-2xl leading-none">→</span>
                    <span className="text-lg text-white/85 leading-relaxed">{r}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-6 text-center">
            Stack & Tools
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {study.tech.map((t) => (
              <span
                key={t}
                className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm text-white/70 font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Next/Prev */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href={`/portfolio/${prev.slug}`}
              className="group p-6 md:p-8 rounded-3xl glass-elevated border border-white/[0.06] hover:border-accent/30 transition-colors"
              data-cursor-hover
            >
              <div className="text-eyebrow uppercase tracking-[0.2em] text-white/40 mb-3 flex items-center gap-2">
                <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
                Previous
              </div>
              <div className="font-display text-xl md:text-2xl text-white group-hover:text-accent transition-colors">
                {prev.client}
              </div>
            </Link>
            <Link
              href={`/portfolio/${next.slug}`}
              className="group p-6 md:p-8 rounded-3xl glass-elevated border border-white/[0.06] hover:border-accent/30 transition-colors text-right"
              data-cursor-hover
            >
              <div className="text-eyebrow uppercase tracking-[0.2em] text-white/40 mb-3 flex items-center gap-2 justify-end">
                Next
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="font-display text-xl md:text-2xl text-white group-hover:text-accent transition-colors">
                {next.client}
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-40">
        <div className="section-container text-center">
          <h2 className="font-display text-4xl md:text-6xl font-semibold text-white tracking-[-0.03em] max-w-3xl mx-auto mb-8 leading-[1.05]">
            Want outcomes like these?
            <br />
            <span className="text-gradient-shine">Let&apos;s build them.</span>
          </h2>
          <MagneticButton variant="primary" size="lg" href="/contact" showArrow>
            Start Your Project
          </MagneticButton>
        </div>
      </section>
    </article>
  )
}

function StoryBlock({ label, body }: { label: string; body: string }) {
  return (
    <div className="grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-4">
        <div className="text-eyebrow uppercase tracking-[0.2em] text-accent mb-4 sticky top-32">
          {label}
        </div>
      </div>
      <div className="lg:col-span-8">
        <p className="text-xl md:text-2xl text-white/75 leading-relaxed font-light">
          {body}
        </p>
      </div>
    </div>
  )
}
