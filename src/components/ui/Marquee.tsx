'use client'

import { cn } from '@/lib/utils'

interface MarqueeProps {
  items: string[]
  speed?: number
  className?: string
  itemClassName?: string
  reverse?: boolean
  pauseOnHover?: boolean
  separator?: React.ReactNode
}

export default function Marquee({
  items,
  speed = 40,
  className,
  itemClassName,
  reverse = false,
  pauseOnHover = true,
  separator = '◆',
}: MarqueeProps) {
  const duration = items.length * speed / 10

  return (
    <div
      className={cn('marquee-container relative w-full overflow-hidden', className)}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
      }}
    >
      <div
        className={cn(
          'marquee-content whitespace-nowrap',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
        style={{
          animationDuration: `${duration}s`,
          animationName: 'marquee',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className={cn(
              'inline-flex items-center gap-8 px-6',
              itemClassName
            )}
          >
            <span>{item}</span>
            <span className="text-accent/50">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
