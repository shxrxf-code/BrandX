'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  splitBy?: 'word' | 'char' | 'line'
  trigger?: 'inView' | 'scroll'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
}

export default function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.04,
  splitBy = 'word',
  trigger = 'inView',
  as: Component = 'div',
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  const units = splitBy === 'char' ? [...text] : splitBy === 'line' ? text.split('\n') : text.split(' ')

  return (
    <Component ref={ref as any} className={cn('overflow-hidden', className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="flex flex-wrap">
        {units.map((unit, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : {}}
              transition={{
                duration: 0.9,
                delay: delay + i * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {unit}
              {splitBy === 'word' && i < units.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </Component>
  )
}
