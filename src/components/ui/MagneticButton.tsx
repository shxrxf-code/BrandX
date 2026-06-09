'use client'

import { useRef, useCallback, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  className?: string
  strength?: number
  as?: 'button' | 'a' | 'div'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function MagneticButton({
  children,
  className,
  strength = 0.35,
  as = 'button',
  href,
  onClick,
  type = 'button',
  disabled = false,
}: Props) {
  const ref = useRef<HTMLElement>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    },
    [strength]
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
  }, [])

  const baseClass = cn(
    'inline-flex items-center justify-center gap-2 transition-transform duration-500 ease-out will-change-transform',
    className
  )

  const props = {
    ref: ref as React.Ref<HTMLElement>,
    className: baseClass,
    onMouseMove,
    onMouseLeave,
    onClick,
    style: { transform: 'translate(0,0)' },
  }

  if (as === 'a' && href) {
    return (
      <a href={href} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  if (as === 'button') {
    return (
      <button type={type} disabled={disabled} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    )
  }

  return (
    <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>
      {children}
    </div>
  )
}
