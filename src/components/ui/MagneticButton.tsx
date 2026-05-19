'use client'

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
}: MagneticButtonProps) {
  const baseStyles = cn(
    'relative inline-flex items-center justify-center rounded-full font-medium tracking-wide uppercase text-sm transition-colors duration-400',
    variant === 'primary' && 'bg-white text-background hover:bg-accent-blue hover:text-white hover:shadow-glow-blue',
    variant === 'secondary' && 'bg-transparent border border-white/20 text-white hover:border-white hover:bg-white/5',
    variant === 'ghost' && 'bg-transparent text-white hover:text-accent-blue',
    'px-8 py-4',
    className
  )

  const content = <span className={baseStyles}>{children}</span>

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
