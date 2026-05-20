'use client'

import { motion } from 'framer-motion'
import { useIsMobile } from '@/lib/hooks'

interface NetworkBackgroundProps {
  isLoaded: boolean
  baseDelay: number
}

export default function NetworkBackground({ isLoaded, baseDelay }: NetworkBackgroundProps) {
  const isMobile = useIsMobile()

  const nodes = isMobile
    ? [
        { x: '20%', y: '15%', size: 2, delay: 0 },
        { x: '80%', y: '25%', size: 1.5, delay: 0.2 },
        { x: '30%', y: '45%', size: 2.5, delay: 0.4 },
        { x: '70%', y: '55%', size: 1.5, delay: 0.6 },
        { x: '50%', y: '75%', size: 2, delay: 0.8 },
        { x: '15%', y: '85%', size: 1, delay: 1 },
        { x: '85%', y: '90%', size: 2, delay: 1.2 },
      ]
    : [
        { x: '10%', y: '10%', size: 3, delay: 0 },
        { x: '90%', y: '15%', size: 2, delay: 0.1 },
        { x: '25%', y: '25%', size: 2.5, delay: 0.2 },
        { x: '75%', y: '20%', size: 1.5, delay: 0.3 },
        { x: '5%', y: '50%', size: 2, delay: 0.4 },
        { x: '95%', y: '45%', size: 2.5, delay: 0.5 },
        { x: '20%', y: '70%', size: 1.5, delay: 0.6 },
        { x: '80%', y: '75%', size: 3, delay: 0.7 },
        { x: '40%', y: '85%', size: 2, delay: 0.8 },
        { x: '60%', y: '90%', size: 1.5, delay: 0.9 },
        { x: '50%', y: '5%', size: 2, delay: 1 },
        { x: '35%', y: '50%', size: 1, delay: 1.1 },
        { x: '65%', y: '40%', size: 2.5, delay: 1.2 },
        { x: '15%', y: '35%', size: 1.5, delay: 1.3 },
        { x: '85%', y: '60%', size: 2, delay: 1.4 },
      ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-accent-blue/30"
          style={{
            left: node.x,
            top: node.y,
            width: node.size,
            height: node.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: baseDelay + node.delay, duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-accent-blue/20"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      ))}

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full bg-accent-blue/5 blur-[100px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: baseDelay, duration: 1.5 }}
      />

      <motion.div
        className="absolute top-1/3 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-accent-purple/5 blur-[80px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: baseDelay + 0.3, duration: 1.5 }}
      />
    </div>
  )
}
