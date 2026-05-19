'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768

    const lenis = new Lenis({
      duration: isMobile ? 1 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: isMobile ? 0.8 : 1,
      touchMultiplier: isMobile ? 1.5 : 2,
      lerp: isMobile ? 0.12 : 0.08,
      infinite: false,
      syncTouch: isMobile,
      syncTouchLerp: 0.075,
      touchInertiaMultiplier: 35,
    })

    lenisRef.current = lenis

    lenis.on('scroll', (e: { scroll: number; limit: number }) => {
      window.scrollTo(0, e.scroll)
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
