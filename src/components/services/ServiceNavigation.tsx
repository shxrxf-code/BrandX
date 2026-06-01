'use client'

import { motion } from 'framer-motion'
import type { Service } from '@/data/services'
import { colorConfig } from '@/data/services'

interface Props {
  services: Service[]
  activeIndex: number
  isMobile: boolean
}

export default function ServiceNavigation({ services, activeIndex, isMobile }: Props) {
  if (isMobile) return null

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3">
      <motion.div
        className="text-[10px] font-mono tracking-[0.2em] text-text-muted mb-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {String(activeIndex + 1).padStart(2, '0')}
      </motion.div>
      {services.map((service, i) => {
        const cfg = colorConfig[service.color]
        return (
          <motion.button
            key={service.id}
            className="relative flex items-center justify-center group"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => {
              const el = document.getElementById(`service-${service.id}`)
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <motion.div
              className="rounded-full"
              style={{
                width: i === activeIndex ? 10 : 6,
                height: i === activeIndex ? 10 : 6,
                background: i === activeIndex ? cfg.accentColor : 'rgba(255,255,255,0.15)',
                boxShadow: i === activeIndex ? `0 0 12px ${cfg.accentColor}80` : 'none',
              }}
              animate={{
                scale: i === activeIndex ? 1 : 0.7,
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <span className="absolute right-full mr-3 text-[10px] font-mono tracking-wider text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {service.title}
            </span>
          </motion.button>
        )
      })}
      <motion.div
        className="text-[10px] font-mono tracking-[0.2em] text-text-muted mt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {String(services.length).padStart(2, '0')}
      </motion.div>
    </nav>
  )
}
