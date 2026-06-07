'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  onClick?: (e: React.MouseEvent) => void
  href?: string
  external?: boolean
  showArrow?: boolean
  magneticStrength?: number
  ariaLabel?: string
}

export default function MagneticButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  external,
  showArrow = false,
  magneticStrength = 0.35,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 200, damping: 18, mass: 0.5 }
  const sx = useSpring(x, springConfig)
  const sy = useSpring(y, springConfig)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const offsetX = e.clientX - rect.left - rect.width / 2
      const offsetY = e.clientY - rect.top - rect.height / 2
      x.set(offsetX * magneticStrength)
      y.set(offsetY * magneticStrength)
    },
    [magneticStrength, x, y]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }, [x, y])

  const sizeMap = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-9 py-4 text-sm',
  }

  const variantStyles = {
    primary: cn(
      'bg-white text-black',
      'hover:bg-accent hover:text-white',
      'shadow-[0_0_0_1px_rgba(255,255,255,0.1)]',
      'hover:shadow-[0_0_50px_rgba(91,91,255,0.5)]'
    ),
    secondary: cn(
      'bg-accent text-white',
      'hover:bg-accent-bright',
      'shadow-[0_0_30px_rgba(91,91,255,0.3)]',
      'hover:shadow-[0_0_50px_rgba(91,91,255,0.6)]'
    ),
    outline: cn(
      'bg-transparent text-white border border-white/15',
      'hover:border-accent hover:bg-accent/10',
      'hover:shadow-[0_0_30px_rgba(91,91,255,0.25)]'
    ),
    ghost: cn('bg-transparent text-white/80 hover:text-white'),
  }

  const baseStyles = cn(
    'group relative inline-flex items-center justify-center gap-2',
    'rounded-full font-medium uppercase tracking-[0.08em]',
    'transition-all duration-500 ease-out-expo',
    'will-change-transform',
    sizeMap[size],
    variantStyles[variant],
    className
  )

  const inner = (
    <motion.span
      ref={ref as any}
      className={baseStyles}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {showArrow && (
          <ArrowUpRight
            size={16}
            className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        )}
      </span>
    </motion.span>
  )

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="inline-block"
      >
        {inner}
      </a>
    )
  }

  return inner
}
