'use client'

interface MarqueeProps {
  items: string[]
  speed?: number
  direction?: 'left' | 'right'
  className?: string
  itemClassName?: string
}

export default function Marquee({
  items,
  speed = 30,
  direction = 'left',
  className = '',
  itemClassName = '',
}: MarqueeProps) {
  const duplicatedItems = [...items, ...items]

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="marquee-content inline-flex"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {duplicatedItems.map((item, i) => (
          <span
            key={i}
            className={`inline-flex items-center mx-8 ${itemClassName}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
