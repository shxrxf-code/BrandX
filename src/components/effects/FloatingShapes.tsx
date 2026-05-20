'use client'

import { motion } from 'framer-motion'
import { useIsMobile } from '@/lib/hooks'

interface FloatingShapesProps {
  className?: string
}

export default function FloatingShapes({ className = '' }: FloatingShapesProps) {
  const isMobile = useIsMobile()

  if (isMobile) return null

  const shapes = [
    {
      type: 'circle',
      x: '10%',
      y: '20%',
      size: 'w-2 h-2',
      color: 'bg-accent-blue/40',
      duration: 6,
      delay: 0,
    },
    {
      type: 'square',
      x: '85%',
      y: '15%',
      size: 'w-3 h-3',
      color: 'bg-accent-purple/30',
      duration: 8,
      delay: 1,
    },
    {
      type: 'circle',
      x: '15%',
      y: '75%',
      size: 'w-1.5 h-1.5',
      color: 'bg-accent-cyan/40',
      duration: 5,
      delay: 2,
    },
    {
      type: 'ring',
      x: '80%',
      y: '70%',
      size: 'w-4 h-4',
      color: 'border-accent-blue/20',
      duration: 7,
      delay: 0.5,
    },
    {
      type: 'diamond',
      x: '50%',
      y: '12%',
      size: 'w-2 h-2',
      color: 'bg-accent-purple/25',
      duration: 9,
      delay: 1.5,
    },
    {
      type: 'circle',
      x: '90%',
      y: '45%',
      size: 'w-1 h-1',
      color: 'bg-white/20',
      duration: 4,
      delay: 3,
    },
    {
      type: 'ring',
      x: '8%',
      y: '50%',
      size: 'w-3 h-3',
      color: 'border-accent-purple/15',
      duration: 6.5,
      delay: 2.5,
    },
  ]

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.size}`}
          style={{ left: shape.x, top: shape.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 + shape.delay, duration: 0.8 }}
        >
          <motion.div
            className={
              shape.type === 'ring'
                ? `rounded-full border ${shape.color}`
                : shape.type === 'diamond'
                  ? `${shape.color} rotate-45`
                  : `rounded-full ${shape.color}`
            }
            animate={{
              y: [0, -20, 0],
              rotate: shape.type === 'diamond' ? [45, 90, 45] : shape.type === 'square' ? [0, 90, 0] : 0,
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: shape.delay,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
