'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.floor(Math.random() * 10) + 1
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-background"
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-display font-bold mb-8 text-white"
            >
              AGENCY
            </motion.div>
            
            <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            
            <div className="mt-4 font-mono text-sm text-white/50 tracking-widest">
              {Math.min(progress, 100)}%
            </div>

            <div className="absolute -z-10 blur-3xl opacity-20 bg-accent-blue w-64 h-64 rounded-full" />
          </div>
          
          <div className="noise" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
