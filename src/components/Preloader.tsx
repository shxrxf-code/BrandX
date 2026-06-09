'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = ['Strategy', 'Design', 'Engineering']

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<'logo' | 'words' | 'welcome' | 'done'>('logo')
  const [currentWord, setCurrentWord] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timeline = async () => {
      await new Promise(r => setTimeout(r, 1200))
      setStage('words')

      for (let i = 0; i < words.length; i++) {
        setCurrentWord(i)
        setProgress(((i + 1) / words.length) * 70)
        await new Promise(r => setTimeout(r, 1000))
      }

      setStage('welcome')
      setProgress(90)
      await new Promise(r => setTimeout(r, 1200))

      setProgress(100)
      setStage('done')
      await new Promise(r => setTimeout(r, 600))
      onComplete()
    }

    timeline()
  }, [onComplete])

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="relative flex flex-col items-center gap-8">
            {stage === 'logo' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1"
              >
                <span className="text-3xl font-display font-bold tracking-tight text-foreground">Brandex</span>
                <motion.span
                  className="text-3xl font-display font-bold text-accent"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >.</motion.span>
              </motion.div>
            )}

            {stage === 'words' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-6">
                <div className="h-12 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentWord}
                      initial={{ y: 40, opacity: 0, filter: 'blur(10px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ y: -40, opacity: 0, filter: 'blur(10px)' }}
                      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                      className="text-2xl font-display font-light tracking-[0.3em] uppercase text-accent-light block"
                    >
                      {words[currentWord]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="w-48 h-[1px] bg-border relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-accent"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((currentWord + 1) / words.length) * 100}%` }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  />
                </div>
              </motion.div>
            )}

            {stage === 'welcome' && (
              <motion.div
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className="text-center"
              >
                <motion.span className="text-xl font-display font-light tracking-[0.4em] uppercase text-foreground/80 block mb-3">
                  Welcome to
                </motion.span>
                <span className="text-3xl font-display font-bold tracking-tight text-foreground">
                  Brandex<span className="text-accent">.</span>
                </span>
              </motion.div>
            )}
          </div>

          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-border rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full bg-accent rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
