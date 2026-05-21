'use client'

import { motion } from 'framer-motion'

interface NetworkConnectionsProps {
  isLoaded: boolean
  baseDelay: number
}

const connections = [
  { x1: '50%', y1: '12%', x2: '20%', y2: '38%' },
  { x1: '50%', y1: '12%', x2: '80%', y2: '38%' },
  { x1: '20%', y1: '38%', x2: '20%', y2: '72%' },
  { x1: '80%', y1: '38%', x2: '80%', y2: '72%' },
  { x1: '20%', y1: '72%', x2: '50%', y2: '98%' },
  { x1: '80%', y1: '72%', x2: '50%', y2: '98%' },
  { x1: '20%', y1: '38%', x2: '80%', y2: '38%' },
  { x1: '20%', y1: '72%', x2: '80%', y2: '72%' },
  { x1: '50%', y1: '12%', x2: '50%', y2: '98%' },
  { x1: '50%', y1: '12%', x2: '20%', y2: '72%' },
  { x1: '50%', y1: '12%', x2: '80%', y2: '72%' },
  { x1: '20%', y1: '38%', x2: '50%', y2: '98%' },
  { x1: '80%', y1: '38%', x2: '50%', y2: '98%' },
]

export default function NetworkConnections({ isLoaded, baseDelay }: NetworkConnectionsProps) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <defs>
        <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="lineGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.25" />
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
        { cx: '50%', cy: '12%', delay: 0 },
        { cx: '20%', cy: '38%', delay: 0.1 },
        { cx: '80%', cy: '38%', delay: 0.2 },
        { cx: '20%', cy: '72%', delay: 0.3 },
        { cx: '80%', cy: '72%', delay: 0.4 },
        { cx: '50%', cy: '98%', delay: 0.5 },
      ].map((node, i) => (
        <g key={`node-${i}`}>
          <motion.circle
            cx={node.cx}
            cy={node.cy}
            r="4"
            fill="#7C3AED"
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
            stroke="#7C3AED"
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
