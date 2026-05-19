'use client'

import { useEffect, useState } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
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
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    if (!isMobile) {
      rafId = requestAnimationFrame(raf)
    } else {
      lenis.on('scroll', () => {
        lenis.raf(performance.now())
      })
    }

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [isMobile])

  return <>{children}</>
}
