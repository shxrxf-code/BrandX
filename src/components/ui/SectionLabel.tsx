'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionLabelProps {
  number?: string
  label: string
  className?: string
  align?: 'left' | 'center' | 'right'
}

export default function SectionLabel({ number, label, className, align = 'left' }: SectionLabelProps) {
  const alignMap = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn('flex items-center gap-3', alignMap[align], className)}
    >
      {number && (
        <span className="font-mono text-eyebrow text-accent tabular-nums">{number}</span>
      )}
      <span className="h-px w-8 bg-accent/40" />
      <span className="text-eyebrow uppercase text-white/60 tracking-[0.2em] font-medium">{label}</span>
    </motion.div>
  )
}
