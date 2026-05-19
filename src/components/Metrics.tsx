'use client'

import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import ScrollReveal from '@/components/ui/ScrollReveal'

const metrics = [
  { value: 50, suffix: '+', label: 'Projects Completed', description: 'Across industries and continents' },
  { value: 100, suffix: '%', label: 'Client Satisfaction', description: 'Long-term partnerships built on trust' },
  { value: 10, suffix: 'M+', label: 'Users Reached', description: 'Through our digital experiences' },
  { value: 25, suffix: '+', label: 'Awards Won', description: 'Recognition for design excellence' },
]

export default function Metrics() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Full-width gradient band */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/10 via-accent-purple/10 to-accent-cyan/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <motion.span
              className="text-xs font-mono tracking-[0.3em] text-accent-blue uppercase mb-4 block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Impact
            </motion.span>
            <motion.h2
              className="font-display text-section font-bold text-gradient"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Numbers That Speak
            </motion.h2>
          </div>
        </ScrollReveal>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((metric, i) => (
            <ScrollReveal key={i} delay={i * 0.1} direction="up" distance={40}>
              <motion.div
                className="text-center group"
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Large counter with gradient */}
                <div className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gradient-blue mb-4 group-hover:text-glow-blue transition-all duration-500">
                  <AnimatedCounter
                    value={metric.value}
                    suffix={metric.suffix}
                    duration={2}
                  />
                </div>

                {/* Label */}
                <div className="font-display text-white font-semibold text-lg mb-2 group-hover:text-accent-blue transition-colors duration-300">
                  {metric.label}
                </div>

                {/* Description */}
                <div className="text-sm text-text-muted">
                  {metric.description}
                </div>

                {/* Decorative line */}
                <div className="mt-4 h-px w-12 mx-auto bg-accent-blue/30 group-hover:w-20 group-hover:bg-accent-blue transition-all duration-500" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
