'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])

  return isMobile
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(media.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [])

  return reduced
}

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
      })
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return position
}

export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const currentY = window.scrollY
        if (currentY !== lastScrollY.current) {
          setDirection(currentY > lastScrollY.current ? 'down' : 'up')
          lastScrollY.current = currentY
        }
        ticking.current = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return direction
}

export function useScrollVelocity(threshold = 50) {
  const [velocity, setVelocity] = useState(0)
  const lastScrollY = useRef(0)
  const lastTime = useRef(Date.now())
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true

      requestAnimationFrame(() => {
        const now = Date.now()
        const currentY = window.scrollY
        const deltaY = Math.abs(currentY - lastScrollY.current)
        const deltaTime = now - lastTime.current

        if (deltaTime > 0) {
          const v = deltaY / deltaTime
          setVelocity((prev) => prev * 0.8 + v * 0.2)
        }

        lastScrollY.current = currentY
        lastTime.current = now
        ticking.current = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return velocity
}

export function use3DTilt(maxRotation = 8, springConfig = { stiffness: 180, damping: 18, mass: 0.8 }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxRotation, -maxRotation]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxRotation, maxRotation]), springConfig)
  const scale = useSpring(1, { ...springConfig, stiffness: 300 })
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  const intensity = useSpring(0, { stiffness: 200, damping: 15 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(normalizedX)
    mouseY.set(normalizedY)
    glareX.set(((e.clientX - rect.left) / rect.width) * 100)
    glareY.set(((e.clientY - rect.top) / rect.height) * 100)
  }, [mouseX, mouseY, glareX, glareY])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    scale.set(1.025)
    intensity.set(1)
  }, [scale, intensity])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
    glareX.set(50)
    glareY.set(50)
    scale.set(1)
    intensity.set(0)
  }, [mouseX, mouseY, glareX, glareY, scale, intensity])

  return {
    ref,
    isHovered,
    rotateX,
    rotateY,
    scale,
    glareX,
    glareY,
    intensity,
    handlers: { onMouseMove: handleMouseMove, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave },
  }
}

export function useElementHover() {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleEnter = useCallback(() => setIsHovered(true), [])
  const handleLeave = useCallback(() => setIsHovered(false), [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.addEventListener('mouseenter', handleEnter)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mouseenter', handleEnter)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [handleEnter, handleLeave])

  return { ref, isHovered }
}
