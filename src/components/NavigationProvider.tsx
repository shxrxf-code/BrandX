'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/lib/hooks'

interface TransitionContextType {
  triggerTransition: () => void
  isTransitioning: boolean
}

const TransitionContext = createContext<TransitionContextType>({
  triggerTransition: () => {},
  isTransitioning: false,
})

export const useNavigation = () => useContext(TransitionContext)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionKey, setTransitionKey] = useState(0)

  const triggerTransition = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTransitionKey((k) => k + 1)
    setTimeout(() => setIsTransitioning(false), 800)
  }, [isTransitioning])

  // Intercept nav link clicks for transition effect
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="#"]')
      if (link && !link.closest('#mobile-menu')) {
        triggerTransition()
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [triggerTransition])

  return (
    <TransitionContext.Provider value={{ triggerTransition, isTransitioning }}>
      {children}
      <TransitionOverlay key={transitionKey} isMobile={isMobile} />
    </TransitionContext.Provider>
  )
}

function TransitionOverlay({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="fixed inset-0 z-[9000] pointer-events-none">
      <AnimatePresence>
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-blue to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ scaleX: 0, opacity: 0 }}
          transition={{ duration: isMobile ? 0.4 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        />

        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.08, 0] }}
          transition={{ duration: isMobile ? 0.5 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3), transparent 70%)',
          }}
        />

        <motion.div
          className="absolute inset-0 bg-background/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: isMobile ? 0.5 : 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>
    </div>
  )
}
