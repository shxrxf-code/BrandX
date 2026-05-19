'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  className = '',
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const controls = useAnimation()
  const [displayValue, setDisplayValue] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true
      controls.start({
        opacity: 1,
        transition: { duration: 0.5 },
      })

      const startTime = Date.now()
      const endTime = startTime + duration * 1000

      const updateCounter = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / (endTime - startTime), 1)
        const easedProgress = 1 - Math.pow(1 - progress, 3)
        setDisplayValue(Math.round(easedProgress * value))

        if (progress < 1) {
          requestAnimationFrame(updateCounter)
        }
      }

      requestAnimationFrame(updateCounter)
    }
  }, [isInView, controls, value, duration])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={controls}
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  )
}
