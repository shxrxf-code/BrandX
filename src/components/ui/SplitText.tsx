'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type Props = {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  delay?: number
  start?: string
  staggerWords?: boolean
}

export default function SplitText({
  text,
  className,
  as = 'h2',
  delay = 0,
  start = 'top 85%',
  staggerWords = true,
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll('[data-split]')
      gsap.fromTo(
        targets,
        { yPercent: 110, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1.1,
          ease: 'expo.out',
          stagger: staggerWords ? 0.04 : 0,
          delay,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [text, delay, start, staggerWords])

  const Tag = as as React.ElementType
  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-baseline"
          style={{ paddingBottom: '0.1em' }}
        >
          <span data-split className="inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}
