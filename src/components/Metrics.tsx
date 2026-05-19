'use client'

import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import ScrollReveal from '@/components/ui/ScrollReveal'

const metrics = [
  { value: 150, suffix: '+', label: 'Projects Completed', description: 'Across industries and continents' },
  { value: 98, suffix: '%', label: 'Client Retention', description: 'Long-term partnerships built on trust' },
  { value: 10, suffix: 'M+', label: 'Users Reached', description: 'Through our digital experiences' },
  { value: 25, suffix: '+', label: 'Awards Won', description: 'Recognition for design excellence' },
]

export default function Metrics() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/5 to-transparent" />

      <div className="section-container relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-mono tracking-[0.3em] text-accent-blue uppercase mb-4 block">
              Impact
            </span>
            <h2 className="font-display text-section font-bold text-gradient">
              Numbers That Speak
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((metric, i) => (
            <ScrollReveal key={i} delay={i * 0.1} direction="up" distance={40}>
              <motion.div
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gradient mb-3">
                  <AnimatedCounter
                    value={metric.value}
                    suffix={metric.suffix}
                    duration={2}
                  />
                </div>
                <div className="font-display text-white font-semibold text-lg mb-2">
                  {metric.label}
                </div>
                <div className="text-sm text-text-muted">
                  {metric.description}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
