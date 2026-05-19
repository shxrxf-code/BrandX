'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const reasons = [
  {
    number: '01',
    title: 'Strategic Thinking',
    description: 'Every project begins with deep research and strategic planning. We don\'t guess—we analyze, test, and validate.',
  },
  {
    number: '02',
    title: 'Award-Winning Design',
    description: 'Our design philosophy blends aesthetics with functionality, creating experiences that are both beautiful and effective.',
  },
  {
    number: '03',
    title: 'Technical Excellence',
    description: 'We build with the latest technologies, ensuring your digital products are fast, secure, and scalable.',
  },
  {
    number: '04',
    title: 'Results That Matter',
    description: 'Beautiful design means nothing without results. We measure success by the impact we create for your business.',
  },
]

export default function WhyBrandex() {
  return (
    <section className="section-padding relative">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <ScrollReveal direction="right">
            <div className="lg:sticky lg:top-32">
              <span className="text-xs font-mono tracking-[0.3em] text-accent-cyan uppercase mb-4 block">
                Why Brandex
              </span>
              <h2 className="font-display text-section font-bold text-gradient mb-6">
                Built Different. Built Better.
              </h2>
              <p className="text-text-secondary text-body-lg leading-relaxed mb-8">
                We&apos;re not just another agency. We&apos;re your strategic partner in
                digital transformation, committed to delivering excellence at every touchpoint.
              </p>
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-3 text-white font-medium group"
                whileHover={{ x: 8 }}
              >
                <span>Start Your Project</span>
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-2"
                />
              </motion.a>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {reasons.map((reason, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="left" distance={40}>
                <motion.div
                  className="glass-card rounded-3xl p-8 group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-6">
                    <span className="font-display text-5xl font-bold text-white/10 group-hover:text-accent-blue/20 transition-colors">
                      {reason.number}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white mb-3">
                        {reason.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
