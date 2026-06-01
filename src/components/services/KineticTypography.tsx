'use client'

import { motion } from 'framer-motion'

interface Props {
  text: string
  isActive: boolean
  className?: string
  staggerDelay?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div'
}

export default function KineticTypography({
  text,
  isActive,
  className = '',
  staggerDelay = 0.04,
  as: Component = 'h2',
}: Props) {
  const words = text.split(' ')

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  }

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -30,
      filter: 'blur(12px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <Component className={className}>
      <motion.span
        className="inline-flex flex-wrap"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className="inline-block mr-[0.2em] last:mr-0"
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  )
}
