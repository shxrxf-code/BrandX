'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  duration?: number
  start?: string
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4'
}

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  duration = 1,
  start = 'top 85%',
  as = 'div',
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [delay, y, duration, start])

  const Tag = as as React.ElementType
  return (
    <Tag ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </Tag>
  )
}
