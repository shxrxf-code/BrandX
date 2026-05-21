'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useIsMobile } from '@/lib/hooks'

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered', icon: '◆', color: 'blue' },
  { value: 10, suffix: 'M+', label: 'Audience Reach', icon: '◈', color: 'purple' },
  { value: 50, suffix: '+', label: 'Global Clients', icon: '◇', color: 'cyan' },
  { value: 8, suffix: '+', label: 'Years Experience', icon: '○', color: 'blue' },
]

const colorMap: Record<string, string> = {
  blue: '#3B82F6',
  purple: '#A855F7',
  cyan: '#22D3EE',
}

function AnimatedStat({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const isMobile = useIsMobile()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const start = performance.now()

    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * stat.value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, stat.value])

  return (
    <ScrollReveal delay={index * 0.08} direction="up" distance={30}>
      <div ref={ref}>
        <motion.div
          className="relative text-center group cursor-default p-6 rounded-2xl transition-colors duration-300"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            background: isInView ? `radial-gradient(circle at center, ${colorMap[stat.color]}08 0%, transparent 70%)` : 'transparent',
          }}
        >
          {/* Glow on hover */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              boxShadow: `0 0 40px ${colorMap[stat.color]}10, inset 0 0 0 1px ${colorMap[stat.color]}20`,
            }}
          />

          {/* Icon */}
          <motion.div
            className="text-lg mb-3 font-mono"
            style={{ color: colorMap[stat.color] }}
            animate={isInView ? { scale: [0, 1.2, 1], opacity: [0, 1] } : {}}
            transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
          >
            {stat.icon}
          </motion.div>

          {/* Value */}
          <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
            <span style={{ color: colorMap[stat.color] }}>
              {count}
            </span>
            <span style={{ color: colorMap[stat.color] }}>{stat.suffix}</span>
          </div>

          {/* Label */}
          <div className="text-sm text-text-muted tracking-wide">
            {stat.label}
          </div>
        </motion.div>
      </div>
    </ScrollReveal>
  )
}

export default function Trust() {
  return (
    <section className="relative py-20 border-t border-white/5">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <AnimatedStat key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
