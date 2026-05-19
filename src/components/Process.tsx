'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Deep dive into your brand, audience, and objectives to uncover insights that shape strategy.',
    details: ['Brand Audit', 'Market Research', 'User Interviews', 'Competitive Analysis'],
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Translate insights into a clear roadmap that aligns business goals with user needs.',
    details: ['Positioning', 'Content Strategy', 'Technical Architecture', 'KPI Framework'],
  },
  {
    number: '03',
    title: 'Design',
    description: 'Craft visually stunning and functionally intuitive experiences that captivate and convert.',
    details: ['Wireframing', 'Visual Design', 'Prototyping', 'Design Systems'],
  },
  {
    number: '04',
    title: 'Develop',
    description: 'Build with precision using modern technologies, ensuring performance and scalability.',
    details: ['Frontend Development', 'Backend Integration', 'CMS Setup', 'QA Testing'],
  },
  {
    number: '05',
    title: 'Launch',
    description: 'Deploy with confidence, monitoring every metric to ensure a flawless go-live experience.',
    details: ['Staging Review', 'Performance Optimization', 'Analytics Setup', 'Go-Live'],
  },
  {
    number: '06',
    title: 'Growth',
    description: 'Continuously optimize and iterate based on data, user feedback, and emerging trends.',
    details: ['A/B Testing', 'CRO', 'Content Updates', 'Scale Strategy'],
  },
]

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="process" className="section-padding relative" ref={containerRef}>
      <div className="section-container">
        <ScrollReveal>
          <div className="max-w-3xl mb-20">
            <span className="text-xs font-mono tracking-[0.3em] text-accent-cyan uppercase mb-4 block">
              Our Process
            </span>
            <h2 className="font-display text-section font-bold text-gradient mb-6">
              How We Build Excellence
            </h2>
            <p className="text-text-secondary text-body-lg leading-relaxed">
              A proven methodology refined over hundreds of successful projects.
              Every step is designed to deliver maximum impact.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="hidden lg:block absolute left-[50%] top-0 bottom-0 w-px bg-white/5" />
          <motion.div
            className="hidden lg:block absolute left-[50%] top-0 w-px bg-gradient-to-b from-accent-blue via-accent-purple to-accent-cyan"
            style={{ height: progressWidth }}
          />

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={0.1} direction="up" distance={40}>
                <div
                  className={`relative flex flex-col lg:flex-row gap-8 lg:gap-16 ${
                    i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1">
                    <div className={`lg:text-${i % 2 === 0 ? 'right' : 'left'}`}>
                      <span className="font-display text-6xl md:text-8xl font-bold text-white/[0.03] block mb-4">
                        {step.number}
                      </span>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed mb-6">
                        {step.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {step.details.map((detail, j) => (
                          <span
                            key={j}
                            className="text-xs text-text-muted bg-white/5 px-3 py-1.5 rounded-full border border-white/5"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-accent-blue shadow-glow-blue" />
                  </div>

                  <div className="flex-1" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
