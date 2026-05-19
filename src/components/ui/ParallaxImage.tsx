'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  strength?: number
  rounded?: boolean
}

export default function ParallaxImage({
  src,
  alt,
  className = '',
  strength = 0.15,
  rounded = true,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1])

  return (
    <div ref={ref} className={`overflow-hidden ${rounded ? 'rounded-3xl' : ''} ${className}`}>
      <motion.div style={{ y, scale }} className="will-change-transform">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
    </div>
  )
}
