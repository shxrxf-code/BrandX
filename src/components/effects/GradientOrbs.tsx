'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/lib/hooks'

interface GradientOrbsProps {
  count?: number
  className?: string
}

function GradientOrbs({ count = 3, className = '' }: GradientOrbsProps) {
  const isMobile = useIsMobile()

  if (isMobile || count === 0) return null

  const orbConfigs = [
    { color: 'bg-accent-blue/20', size: 'w-[500px] h-[500px]', baseX: '20%', baseY: '10%' },
    { color: 'bg-accent-purple/15', size: 'w-[400px] h-[400px]', baseX: '70%', baseY: '60%' },
    { color: 'bg-accent-cyan/15', size: 'w-[350px] h-[350px]', baseX: '40%', baseY: '80%' },
  ]

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbConfigs.slice(0, count).map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute ${orb.color} ${orb.size} rounded-full blur-[120px]`}
          style={{ left: orb.baseX, top: orb.baseY }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default memo(GradientOrbs)
