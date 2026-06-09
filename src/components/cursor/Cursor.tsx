'use client'

import { useEffect, useRef, useState } from 'react'
import { useCursor } from '@/components/providers/CursorProvider'

export default function Cursor() {
  const { text, variant, isHovering } = useCursor()
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  const target = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const dotPos = useRef({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isFine = window.matchMedia('(pointer: fine)').matches
    if (!isFine) return

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      if (!visible) setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    let raf = 0
    const tick = () => {
      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.12
      dotPos.current.x += (target.current.x - dotPos.current.x) * 0.28
      dotPos.current.y += (target.current.y - dotPos.current.y) * 0.28

      const rx = ringPos.current.x
      const ry = ringPos.current.y
      const dx = dotPos.current.x
      const dy = dotPos.current.y

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      }
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf)
    }
  }, [visible])

  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null
  }

  const showText = !!text && isHovering
  const isExpand = variant === 'expand' || showText
  const ringSize = isExpand ? 80 : 24
  const dotSize = showText ? 0 : 6

  const getRingBorderColor = () => {
    if (showText) return 'rgba(91, 91, 255, 0.8)'
    if (variant === 'view' || variant === 'explore') return 'rgba(91, 91, 255, 0.6)'
    return 'rgba(255, 255, 255, 0.3)'
  }

  return (
    <>
      <div
        ref={bgRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full"
        style={{
          width: ringSize + 20,
          height: ringSize + 20,
          marginLeft: -(ringSize + 20) / 2,
          marginTop: -(ringSize + 20) / 2,
          background: showText ? 'rgba(91, 91, 255, 0.08)' : 'transparent',
          border: `1px solid ${showText ? 'rgba(91, 91, 255, 0.15)' : 'transparent'}`,
          opacity: visible && isExpand ? 1 : 0,
          transition: 'width 0.6s cubic-bezier(0.32, 0.72, 0, 1), height 0.6s cubic-bezier(0.32, 0.72, 0, 1), margin 0.6s cubic-bezier(0.32, 0.72, 0, 1), background 0.4s ease, border 0.4s ease, opacity 0.3s ease',
        }}
      />

      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference"
        style={{
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          background: '#ffffff',
          opacity: visible && !showText ? 1 : 0,
          transition: 'width 0.3s cubic-bezier(0.32, 0.72, 0, 1), height 0.3s cubic-bezier(0.32, 0.72, 0, 1), margin 0.3s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.2s ease',
        }}
      />

      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full flex items-center justify-center"
        style={{
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          border: `1.5px solid ${getRingBorderColor()}`,
          background: showText ? 'rgba(91, 91, 255, 0.15)' : 'transparent',
          opacity: visible ? 1 : 0,
          transition: 'width 0.6s cubic-bezier(0.32, 0.72, 0, 1), height 0.6s cubic-bezier(0.32, 0.72, 0, 1), margin 0.6s cubic-bezier(0.32, 0.72, 0, 1), background 0.4s ease, border 0.4s ease, opacity 0.3s ease',
          backdropFilter: showText ? 'blur(4px)' : 'none',
        }}
      />

      <div
        ref={labelRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center"
        style={{
          width: 80,
          height: 80,
          marginLeft: -40,
          marginTop: -40,
          opacity: showText && visible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white leading-none">
          {text}
        </span>
      </div>
    </>
  )
}
