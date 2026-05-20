'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/lib/hooks'

export default function Preloader() {
  const isMobile = useIsMobile()
  const [isComplete, setIsComplete] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const duration = isMobile ? 1800 : 2200
    const timer = setTimeout(() => {
      setIsComplete(true)
    }, duration)
    return () => clearTimeout(timer)
  }, [isMobile])

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        setIsAnimating(false)
        window.dispatchEvent(new CustomEvent('preloader-complete'))
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [isComplete])

  if (!isAnimating) return null

  return (
    <AnimatePresence>
      {!isAnimating || isComplete ? null : (
        <div className="fixed inset-0 z-[10000] overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-background"
            initial={{ opacity: 1 }}
            animate={isComplete ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <motion.span
              className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              BRANDEX
              <span className="ml-1 text-xs font-normal text-text-muted tracking-widest uppercase">
                Digital
              </span>
            </motion.span>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={isComplete ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
              initial={{ scale: 0, opacity: 0 }}
              animate={isComplete ? { scale: 3, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{
                scale: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
                opacity: { duration: 0.8, delay: 0.4 },
              }}
            >
              <div className="absolute inset-0 rounded-full bg-background" />
              <motion.div
                className="absolute inset-[2px] rounded-full bg-background"
                initial={{ scale: 0 }}
                animate={isComplete ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <motion.div
                  className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-accent-blue"
                  animate={!isComplete ? {
                    scale: [1, 1.5, 1],
                    boxShadow: [
                      '0 0 0px rgba(59, 130, 246, 0)',
                      '0 0 20px rgba(59, 130, 246, 0.5)',
                      '0 0 0px rgba(59, 130, 246, 0)',
                    ],
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={isComplete ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="w-[2px] h-0 bg-gradient-to-b from-transparent via-accent-blue/50 to-transparent"
              animate={isComplete ? { height: '100vh' } : { height: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={isComplete ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="h-[2px] w-0 bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent"
              animate={isComplete ? { width: '100vw' } : { width: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.2 }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
