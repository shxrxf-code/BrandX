'use client'

import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  onClick?: () => void
  href?: string
  strength?: number
}

export default function MagneticButton({
  children,
  className,
  variant = 'primary',
  onClick,
  href,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return
      const { clientX, clientY } = e
      const { left, top, width, height } = ref.current.getBoundingClientRect()
      const x = (clientX - left - width / 2) * strength
      const y = (clientY - top - height / 2) * strength
      ref.current.style.transform = `translate(${x}px, ${y}px)`
    },
    [strength]
  )

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
    setIsHovered(false)
  }, [])

  const baseStyles = cn(
    'relative inline-flex items-center justify-center rounded-full font-medium tracking-wide uppercase text-sm transition-colors duration-400',
    variant === 'primary' && 'bg-white text-background hover:bg-accent-blue hover:text-white hover:shadow-glow-blue',
    variant === 'secondary' && 'bg-transparent border border-white/20 text-white hover:border-white hover:bg-white/5',
    variant === 'ghost' && 'bg-transparent text-white hover:text-accent-blue',
    'px-8 py-4',
    className
  )

  const content = (
    <div
      ref={ref}
      className="transition-transform duration-300 ease-out"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <span className={baseStyles}>{children}</span>
    </div>
  )

  if (href) {
    return (
      <a href={href} onClick={onClick}>
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} className="cursor-none">
      {content}
    </button>
  )
}
