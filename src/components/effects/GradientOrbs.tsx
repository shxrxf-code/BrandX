'use client'

import { motion } from 'framer-motion'

interface GradientOrbsProps {
  count?: number
  className?: string
}

export default function GradientOrbs({ count = 3, className = '' }: GradientOrbsProps) {
  const orbConfigs = [
    { color: 'bg-accent-blue/30', size: 'w-[600px] h-[600px]', baseX: '20%', baseY: '10%' },
    { color: 'bg-accent-purple/25', size: 'w-[500px] h-[500px]', baseX: '70%', baseY: '60%' },
    { color: 'bg-accent-cyan/20', size: 'w-[400px] h-[400px]', baseX: '40%', baseY: '80%' },
  ]

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbConfigs.slice(0, count).map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute ${orb.color} ${orb.size} rounded-full blur-[120px]`}
          style={{ left: orb.baseX, top: orb.baseY }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
