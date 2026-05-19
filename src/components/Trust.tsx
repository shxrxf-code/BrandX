'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'

const stats = [
  { value: '150', suffix: '+', label: 'Projects Delivered', icon: '◆' },
  { value: '10', suffix: 'M+', label: 'Audience Reach', icon: '◈' },
  { value: '50', suffix: '+', label: 'Global Clients', icon: '◇' },
  { value: '8', suffix: '+', label: 'Years Experience', icon: '○' },
]

export default function Trust() {
  return (
    <section className="relative py-20 border-t border-white/5">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <ScrollReveal
              key={i}
              delay={i * 0.1}
              direction="up"
              distance={40}
            >
              <motion.div
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="text-xs text-accent-blue mb-2 font-mono tracking-wider">
                  {stat.icon}
                </div>
                <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-accent-blue">{stat.suffix}</span>
                </div>
                <div className="text-sm text-text-muted tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
