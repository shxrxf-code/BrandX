'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface CursorProps {
  enabled?: boolean
}

export default function Cursor({ enabled = true }: CursorProps) {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [cursorLabel, setCursorLabel] = useState('')
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (!enabled || isTouchDevice) return

    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleHoverableElements = () => {
      const hoverables = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .cursor-hover, [data-cursor-hover]'
      )

      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true)
          const label = el.getAttribute('data-cursor-label')
          if (label) setCursorLabel(label)
        })
        el.addEventListener('mouseleave', () => {
          setIsHovering(false)
          setCursorLabel('')
        })
      })
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', updateCursor)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)

    handleHoverableElements()

    const observer = new MutationObserver(handleHoverableElements)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
      observer.disconnect()
    }
  }, [cursorX, cursorY, enabled, isTouchDevice])

  if (!enabled || isTouchDevice) return null

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {isHovering && cursorLabel && (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium tracking-wider uppercase text-white">
            {cursorLabel}
          </span>
        )}
      </motion.div>
      <motion.div
        className="cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  )
}
