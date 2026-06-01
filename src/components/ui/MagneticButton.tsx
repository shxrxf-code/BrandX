'use client'

import { useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  onClick?: (e: React.MouseEvent) => void
  href?: string
}

export default function MagneticButton({
  children,
  className,
  variant = 'primary',
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
    setIsHovered(false)
  }, [])

  const baseStyles = cn(
    'relative inline-flex items-center justify-center rounded-full font-medium tracking-wide uppercase text-sm transition-all duration-400',
    variant === 'primary' && 'bg-text-primary text-white hover:bg-accent-blue hover:text-white hover:shadow-glow-blue hover:scale-105',
    variant === 'secondary' && 'bg-transparent border border-black/20 text-text-primary hover:border-black hover:bg-black/5 hover:scale-105',
    variant === 'ghost' && 'bg-transparent text-text-primary hover:text-accent-blue',
    'px-8 py-4',
    className
  )

  const content = (
    <span
      ref={ref}
      className="transition-transform duration-300 ease-out"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <span className={baseStyles}>{children}</span>
    </span>
  )

  if (href) {
    return (
      <a href={href} onClick={onClick}>
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick}>
      {content}
    </button>
  )
}
