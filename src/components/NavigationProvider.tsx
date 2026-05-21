'use client'

import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/lib/hooks'

interface TransitionContextType {
  navigate: (href: string, e?: React.MouseEvent) => void
  isTransitioning: boolean
}

const TransitionContext = createContext<TransitionContextType>({
  navigate: () => {},
  isTransitioning: false,
})

export const useNavigation = () => useContext(TransitionContext)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionKey, setTransitionKey] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const navigate = useCallback((href: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    if (isTransitioning) return

    const targetId = href.startsWith('#') ? href.slice(1) : href
    const target = document.getElementById(targetId)
    if (!target) {
      window.location.href = href
      return
    }

    setIsTransitioning(true)
    setTransitionKey((k) => k + 1)

    const duration = isMobile ? 500 : 700

    timeoutRef.current = setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })

      setTimeout(() => {
        setIsTransitioning(false)
      }, 300)
    }, duration * 0.4)
  }, [isTransitioning, isMobile])

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning }}>
      {children}
      <TransitionOverlay key={transitionKey} isMobile={isMobile} />
    </TransitionContext.Provider>
  )
}

function TransitionOverlay({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="fixed inset-0 z-[9000] pointer-events-none">
      <AnimatePresence>
        {/* Sweep line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-blue to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ scaleX: 0, opacity: 0 }}
          transition={{ duration: isMobile ? 0.4 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        />

        {/* Radial glow sweep */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.08, 0] }}
          transition={{ duration: isMobile ? 0.5 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.3), transparent 70%)',
          }}
        />

        {/* Blur overlay */}
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
