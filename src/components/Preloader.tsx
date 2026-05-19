'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const loadingTexts = ['INITIALIZING', 'LOADING ASSETS', 'PREPARING EXPERIENCE', 'ALMOST THERE']

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentText((prev) => {
        const currentIndex = loadingTexts.indexOf(prev)
        return loadingTexts[(currentIndex + 1) % loadingTexts.length]
      })
    }, 600)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(textInterval)
          setIsComplete(true)
          setTimeout(() => onComplete?.(), 400)
          return 100
        }
        const increment = prev < 30 ? Math.random() * 8 : prev < 70 ? Math.random() * 5 : Math.random() * 3
        return Math.min(prev + increment, 100)
      })
    }, 50)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center"
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="relative w-full max-w-md px-8">
            <motion.div
              className="flex items-baseline justify-between mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-xs font-mono tracking-[0.3em] text-text-muted uppercase">
                {currentText}
              </span>
              <span className="text-xs font-mono tracking-[0.2em] text-text-secondary">
                {Math.round(progress)}%
              </span>
            </motion.div>

            <div className="h-[1px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <motion.div
              className="mt-8 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="font-display text-2xl font-bold tracking-tight text-gradient">
                BRANDEX
              </span>
              <span className="ml-2 text-xs text-text-muted tracking-widest uppercase">
                Digital
              </span>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-12 left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full bg-white"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
