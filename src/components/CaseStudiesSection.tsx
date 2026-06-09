'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

const projects = [
  {
    slug: 'solartech-energy',
    title: 'SolarTech Energy',
    category: 'Web Experience',
    metric: '240%',
    metricLabel: 'Engagement Increase',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
  },
  {
    slug: 'drifto',
    title: 'Drifto',
    category: 'E-Commerce',
    metric: '180%',
    metricLabel: 'Revenue Growth',
    gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
  },
  {
    slug: 'finflow',
    title: 'FinFlow',
    category: 'Fintech Platform',
    metric: '92',
    metricLabel: 'NPS Score',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
  },
  {
    slug: 'lumen',
    title: 'Lumen Clinics',
    category: 'Healthcare',
    metric: '156%',
    metricLabel: 'Conversion Rate',
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
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
      <div className="max-w-content mx-auto px-6 md:px-10 mb-16 md:mb-20">
        <span className="scene-eyebrow">Case Studies</span>
        <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
          Results that
          <br />
          <span className="text-accent">speak volumes.</span>
        </h2>
      </div>

      <motion.div style={{ x }} className="flex gap-6 md:gap-8 px-6 md:px-10">
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group flex-shrink-0 w-[85vw] md:w-[500px] lg:w-[600px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              viewport={{ once: true, margin: '-100px' }}
              className="relative rounded-2xl overflow-hidden border border-border bg-subtle aspect-[4/3] md:aspect-[16/10]"
            >
              <div
                className="absolute inset-0 opacity-50 group-hover:opacity-80 transition-opacity duration-700"
                style={{ background: `radial-gradient(ellipse at center, ${project.gradient})` }}
              />

              <div className="absolute inset-0 dot-grid opacity-30" />

              <div className="relative z-10 p-8 md:p-10 lg:p-12 flex flex-col justify-between h-full">
                <div>
                  <span className="text-xs text-accent tracking-[0.2em] uppercase font-medium">
                    {project.category}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-display font-bold tracking-tight mt-3">
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-4xl md:text-6xl font-display font-bold text-accent">
                      {project.metric}
                    </span>
                    <p className="text-xs text-muted tracking-[0.15em] uppercase mt-1">
                      {project.metricLabel}
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-full border border-border-light flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent transition-all duration-500">
                    <span className="text-lg transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500">
                      →
                    </span>
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
