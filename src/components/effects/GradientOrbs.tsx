'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface GradientOrbsProps {
  count?: number
  className?: string
}

export default function GradientOrbs({ count = 3, className = '' }: GradientOrbsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { damping: 30, stiffness: 100 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const orbConfigs = [
    { color: 'bg-accent-blue/30', size: 'w-[600px] h-[600px]', baseX: '20%', baseY: '10%' },
    { color: 'bg-accent-purple/25', size: 'w-[500px] h-[500px]', baseX: '70%', baseY: '60%' },
    { color: 'bg-accent-cyan/20', size: 'w-[400px] h-[400px]', baseX: '40%', baseY: '80%' },
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set((e.clientX - rect.left) / rect.width)
      mouseY.set((e.clientY - rect.top) / rect.height)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbConfigs.slice(0, count).map((orb, i) => {
        const xOffset = useTransform(springX, [0, 1], [-30, 30])
        const yOffset = useTransform(springY, [0, 1], [-30, 30])

        return (
          <motion.div
            key={i}
            className={`absolute ${orb.color} ${orb.size} rounded-full blur-[120px]`}
            style={{
              left: orb.baseX,
              top: orb.baseY,
              x: xOffset,
              y: yOffset,
            }}
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
        )
      })}
    </div>
  )
}
