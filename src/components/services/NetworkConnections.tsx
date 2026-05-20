'use client'

import { motion } from 'framer-motion'

interface NetworkConnectionsProps {
  isLoaded: boolean
  baseDelay: number
}

const connections = [
  { x1: '50%', y1: '10%', x2: '15%', y2: '36%' },
  { x1: '50%', y1: '10%', x2: '85%', y2: '36%' },
  { x1: '15%', y1: '36%', x2: '15%', y2: '70%' },
  { x1: '85%', y1: '36%', x2: '85%', y2: '70%' },
  { x1: '15%', y1: '70%', x2: '50%', y2: '98%' },
  { x1: '85%', y1: '70%', x2: '50%', y2: '98%' },
  { x1: '15%', y1: '36%', x2: '85%', y2: '36%' },
  { x1: '15%', y1: '70%', x2: '85%', y2: '70%' },
  { x1: '50%', y1: '10%', x2: '50%', y2: '98%' },
  { x1: '50%', y1: '10%', x2: '15%', y2: '70%' },
  { x1: '50%', y1: '10%', x2: '85%', y2: '70%' },
  { x1: '15%', y1: '36%', x2: '50%', y2: '98%' },
  { x1: '85%', y1: '36%', x2: '50%', y2: '98%' },
]

export default function NetworkConnections({ isLoaded, baseDelay }: NetworkConnectionsProps) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <defs>
        <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="lineGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      {connections.map((conn, i) => (
        <motion.line
          key={i}
          x1={conn.x1}
          y1={conn.y1}
          x2={conn.x2}
          y2={conn.y2}
          stroke={`url(#lineGrad${(i % 3) + 1})`}
          strokeWidth="1"
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isLoaded ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: baseDelay + 0.3 + i * 0.08, duration: 1, ease: 'easeInOut' }}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="20"
            dur={`${3 + i * 0.2}s`}
            repeatCount="indefinite"
          />
        </motion.line>
      ))}

      {[
        { cx: '50%', cy: '10%', delay: 0 },
        { cx: '15%', cy: '36%', delay: 0.1 },
        { cx: '85%', cy: '36%', delay: 0.2 },
        { cx: '15%', cy: '70%', delay: 0.3 },
        { cx: '85%', cy: '70%', delay: 0.4 },
        { cx: '50%', cy: '98%', delay: 0.5 },
      ].map((node, i) => (
        <g key={`node-${i}`}>
          <motion.circle
            cx={node.cx}
            cy={node.cy}
            r="4"
            fill="#3B82F6"
            initial={{ scale: 0, opacity: 0 }}
            animate={isLoaded ? { scale: 1, opacity: 0.5 } : {}}
            transition={{ delay: baseDelay + 0.5 + node.delay, duration: 0.5 }}
          >
            <animate
              attributeName="opacity"
              values="0.3;0.7;0.3"
              dur={`${2 + i * 0.3}s`}
              repeatCount="indefinite"
            />
          </motion.circle>
          <motion.circle
            cx={node.cx}
            cy={node.cy}
            r="8"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            animate={isLoaded ? { scale: 1, opacity: 0.3 } : {}}
            transition={{ delay: baseDelay + 0.6 + node.delay, duration: 0.5 }}
          >
            <animate
              attributeName="r"
              values="6;12;6"
              dur={`${2.5 + i * 0.2}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.2;0.5;0.2"
              dur={`${2.5 + i * 0.2}s`}
              repeatCount="indefinite"
            />
          </motion.circle>
        </g>
      ))}
    </svg>
  )
}
