'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/lib/hooks'

interface PreloaderProps {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const isMobile = useIsMobile()
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setIsComplete(true)
        setTimeout(() => onComplete?.(), 100)
      }, 300)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setIsComplete(true)
      setTimeout(() => onComplete?.(), 400)
    }, 1200)
    return () => clearTimeout(timer)
  }, [isMobile, onComplete])

  if (isMobile) {
    return (
      <AnimatePresence>
        {!isComplete && (
          <motion.div
            className="fixed inset-0 z-[10000] bg-background flex items-center justify-center"
            exit={{ y: '-100%', transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
          >
            <span className="font-display text-2xl font-bold tracking-tight text-white">
              BRANDEX
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center"
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="relative w-full max-w-md px-8">
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-xs font-mono tracking-[0.3em] text-text-muted uppercase">
                LOADING
              </span>
              <span className="text-xs font-mono tracking-[0.2em] text-text-secondary">
                100%
              </span>
            </div>
            <div className="h-[1px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>
            <motion.div
              className="mt-8 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="font-display text-2xl font-bold tracking-tight text-gradient">
                BRANDEX
              </span>
              <span className="ml-2 text-xs text-text-muted tracking-widest uppercase">
                Digital
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
