'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { colorConfig } from '@/data/services'
import type { ServiceColor } from '@/data/services'

interface Props {
  isActive: boolean
  color: ServiceColor
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speed: number
  delay: number
  drift: number
}

export default function AmbientParticles({ isActive, color }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const cfg = colorConfig[color]

  const particles = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 2.5,
      speed: 15 + Math.random() * 30,
      delay: Math.random() * 10,
      drift: -20 + Math.random() * 40,
    })),
  [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: cfg.accentColor,
            boxShadow: `0 0 ${p.size * 3}px ${cfg.accentColor}40`,
          }}
          initial={{ opacity: 0 }}
          animate={isActive ? {
            opacity: [0, 0.4, 0],
            y: [0, -30 - Math.random() * 40],
            x: [0, p.drift],
          } : { opacity: 0 }}
          transition={{
            duration: p.speed,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Light streaks */}
      {isActive && (
        <>
          <motion.div
            className="absolute h-px w-32"
            style={{
              top: '20%',
              left: '-10%',
              background: `linear-gradient(90deg, transparent, ${cfg.accentColor}40, transparent)`,
            }}
            animate={{ left: ['-10%', '110%'], opacity: [0, 0.5, 0] }}
            transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute h-px w-24"
            style={{
              top: '60%',
              left: '-10%',
              background: `linear-gradient(90deg, transparent, ${cfg.secondaryColor}30, transparent)`,
            }}
            animate={{ left: ['-10%', '110%'], opacity: [0, 0.3, 0] }}
            transition={{ duration: 5, delay: 2.5, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute h-px w-20"
            style={{
              top: '80%',
              left: '-10%',
              background: `linear-gradient(90deg, transparent, ${cfg.accentColor}20, transparent)`,
            }}
            animate={{ left: ['-10%', '110%'], opacity: [0, 0.2, 0] }}
            transition={{ duration: 6, delay: 0.5, repeat: Infinity, ease: 'linear' }}
          />
        </>
      )}
    </div>
  )
}
