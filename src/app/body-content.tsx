'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigation } from '@/components/NavigationProvider'

export default function BodyContent({ children }: { children: React.ReactNode }) {
  const { isTransitioning } = useNavigation()

  return (
    <motion.main
      id="main-content"
      className="relative z-10"
      animate={isTransitioning ? { scale: 0.995, filter: 'blur(2px)' } : { scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.main>
  )
}
