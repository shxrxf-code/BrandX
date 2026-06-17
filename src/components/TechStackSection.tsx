'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TechNode {
  id: string
  label: string
  category: string
  connections: string[]
  description: string
  x: number
  y: number
}

const nodes: TechNode[] = [
  { id: 'nextjs', label: 'Next.js', category: 'Frontend', connections: ['react', 'typescript', 'tailwind', 'vercel'], description: 'React framework for production-grade web applications', x: 600, y: 120 },
  { id: 'react', label: 'React', category: 'Frontend', connections: ['nextjs', 'typescript', 'react-native'], description: 'Component-based UI library for interactive interfaces', x: 420, y: 230 },
  { id: 'typescript', label: 'TypeScript', category: 'Frontend', connections: ['nextjs', 'react', 'node'], description: 'Type-safe JavaScript for scalable codebases', x: 780, y: 230 },
  { id: 'tailwind', label: 'Tailwind', category: 'Frontend', connections: ['nextjs', 'react'], description: 'Utility-first CSS framework for rapid design', x: 600, y: 330 },

  { id: 'flutter', label: 'Flutter', category: 'Mobile', connections: ['react-native'], description: 'Cross-platform UI toolkit from Google', x: 1150, y: 150 },
  { id: 'react-native', label: 'React Native', category: 'Mobile', connections: ['react', 'flutter', 'typescript'], description: 'Cross-platform mobile apps with React', x: 1150, y: 280 },

  { id: 'node', label: 'Node.js', category: 'Backend', connections: ['typescript', 'python', 'postgres', 'redis'], description: 'JavaScript runtime for scalable backend services', x: 400, y: 510 },
  { id: 'python', label: 'Python', category: 'Backend', connections: ['node', 'postgres', 'openai'], description: 'Versatile language for AI, data, and automation', x: 600, y: 560 },
  { id: 'postgres', label: 'PostgreSQL', category: 'Backend', connections: ['node', 'python', 'redis'], description: 'Relational database with ACID compliance', x: 200, y: 570 },
  { id: 'redis', label: 'Redis', category: 'Backend', connections: ['node', 'postgres'], description: 'In-memory store for high-performance caching', x: 400, y: 650 },

  { id: 'openai', label: 'OpenAI', category: 'AI & Cloud', connections: ['python', 'aws'], description: 'LLM API for AI-powered features and automation', x: 860, y: 490 },
  { id: 'aws', label: 'AWS', category: 'AI & Cloud', connections: ['openai', 'docker', 'postgres'], description: 'Cloud infrastructure for scalable deployments', x: 980, y: 580 },
  { id: 'vercel', label: 'Vercel', category: 'AI & Cloud', connections: ['nextjs', 'aws'], description: 'Serverless deployment platform for frontend teams', x: 760, y: 610 },
  { id: 'docker', label: 'Docker', category: 'AI & Cloud', connections: ['aws', 'node'], description: 'Containerization for consistent deployment', x: 1100, y: 640 },
]

const categoryColors: Record<string, string> = {
  'Frontend': '#8B5CF6',
  'Mobile': '#D946EF',
  'Backend': '#10B981',
  'AI & Cloud': '#F59E0B',
}

const categoryLabels: Record<string, string> = {
  'Frontend': 'Frontend',
  'Mobile': 'Mobile',
  'Backend': 'Backend',
  'AI & Cloud': 'AI & Cloud',
}

const SVG_W = 1400
const SVG_H = 760

function buildEdges(nodes: TechNode[]) {
  const edges: Array<[string, string]> = []
  const seen = new Set<string>()
  for (const n of nodes) {
    for (const c of n.connections) {
      const key = [n.id, c].sort().join('--')
      if (!seen.has(key)) {
        seen.add(key)
        edges.push([n.id, c])
      }
    }
  }
  return edges
}

const edges = buildEdges(nodes)

function getNode(id: string) {
  return nodes.find((n) => n.id === id)!
}

function EdgeLine({
  source,
  target,
  active,
  hoveredNode,
}: {
  source: TechNode
  target: TechNode
  active: boolean
  hoveredNode: string | null
}) {
  const isHighlighted = hoveredNode === source.id || hoveredNode === target.id
  const isConnected =
    hoveredNode &&
    (source.connections.includes(hoveredNode) || target.connections.includes(hoveredNode) || source.id === hoveredNode || target.id === hoveredNode)

  const mx1 = source.x + (target.x - source.x) * 0.5
  const my1 = source.y
  const mx2 = source.x + (target.x - source.x) * 0.5
  const my2 = target.y

  const path = `M${source.x},${source.y} C${mx1},${my1} ${mx2},${my2} ${target.x},${target.y}`

  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
      />
      <motion.path
        d={path}
        fill="none"
        stroke={
          isHighlighted
            ? categoryColors[source.category] || '#8B5CF6'
            : isConnected
              ? 'rgba(139,92,246,0.3)'
              : 'transparent'
        }
        strokeWidth={isHighlighted ? 2 : isConnected ? 1.5 : 0}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: active ? 1 : 0,
          opacity: active ? (isHighlighted ? 1 : isConnected ? 0.5 : 0) : 0,
        }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
    </g>
  )
}

function NodeCard({
  node,
  index,
  hoveredNode,
  setHoveredNode,
  active,
}: {
  node: TechNode
  index: number
  hoveredNode: string | null
  setHoveredNode: (id: string | null) => void
  active: boolean
}) {
  const isHovered = hoveredNode === node.id
  const isConnected =
    hoveredNode && (node.connections.includes(hoveredNode) || node.id === hoveredNode)

  const connectedCount = node.connections.length

  return (
    <g
      transform={`translate(${node.x - 70}, ${node.y - 28})`}
      style={{ cursor: 'pointer' }}
    >
      <motion.foreignObject
        width={140}
        height={56}
        onMouseEnter={() => setHoveredNode(node.id)}
        onMouseLeave={() => setHoveredNode(null)}
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: active ? 1 : 0,
          y: active ? 0 : 10,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.4, delay: 0.2 + index * 0.06 }}
        style={{ overflow: 'visible' }}
      >
        <div
          className={`rounded-xl px-3 py-2.5 backdrop-blur-xl border transition-all duration-300 w-full h-full flex flex-col justify-center`}
          style={{
            background: isHovered
              ? `linear-gradient(135deg, ${categoryColors[node.category]}20, rgba(255,255,255,0.04))`
              : 'rgba(255,255,255,0.04)',
            borderColor: isHovered
              ? `${categoryColors[node.category]}50`
              : isConnected
                ? 'rgba(139,92,246,0.25)'
                : 'rgba(255,255,255,0.08)',
            boxShadow: isHovered
              ? `0 0 30px ${categoryColors[node.category]}20, 0 0 60px ${categoryColors[node.category]}10`
              : isConnected
                ? '0 0 20px rgba(139,92,246,0.1)'
                : 'none',
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: categoryColors[node.category] }}
            />
            <span className="text-xs font-display font-bold text-foreground tracking-tight truncate">
              {node.label}
            </span>
          </div>
          <span
            className="text-[9px] font-medium tracking-wider mt-0.5 ml-4"
            style={{ color: categoryColors[node.category] }}
          >
            {categoryLabels[node.category]}
          </span>
        </div>
      </motion.foreignObject>
    </g>
  )
}

function NetworkGraph({
  active,
  hoveredNode,
  setHoveredNode,
}: {
  active: boolean
  hoveredNode: string | null
  setHoveredNode: (id: string | null) => void
}) {
  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {nodes.map((node) => (
          <motion.filter
            key={node.id}
            id={`glow-${node.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredNode === node.id ? 1 : 0 }}
          >
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </motion.filter>
        ))}
      </defs>

      {edges.map(([s, t]) => (
        <EdgeLine
          key={`${s}--${t}`}
          source={getNode(s)}
          target={getNode(t)}
          active={active}
          hoveredNode={hoveredNode}
        />
      ))}

      {nodes.map((node, i) => (
        <NodeCard
          key={node.id}
          node={node}
          index={i}
          hoveredNode={hoveredNode}
          setHoveredNode={setHoveredNode}
          active={active}
        />
      ))}
    </svg>
  )
}

function MobileStack({ active }: { active: boolean }) {
  const categories = ['Frontend', 'Mobile', 'Backend', 'AI & Cloud'] as const
  const [expandedCat, setExpandedCat] = useState<string | null>(null)

  return (
    <div className="space-y-3 md:hidden">
      {categories.map((cat) => {
        const catNodes = nodes.filter((n) => n.category === cat)
        const isOpen = expandedCat === cat
        return (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setExpandedCat(isOpen ? null : cat)}
              className="w-full flex items-center gap-3 p-4 text-left"
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: categoryColors[cat] }}
              />
              <span className="text-sm font-display font-bold text-foreground flex-1">
                {cat}
              </span>
              <span className="text-[10px] font-medium text-muted">
                {catNodes.length}
              </span>
              <motion.svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ rotate: isOpen ? 180 : 0 }}
                className="text-muted"
              >
                <path d="M6 9l6 6 6-6" />
              </motion.svg>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-0 space-y-2">
                    {catNodes.map((node) => (
                      <div
                        key={node.id}
                        className="rounded-lg px-3 py-2.5"
                        style={{
                          background: `${categoryColors[cat]}08`,
                          border: `1px solid ${categoryColors[cat]}15`,
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: categoryColors[cat] }}
                          />
                          <span className="text-xs font-display font-bold text-foreground">
                            {node.label}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted mt-1 ml-3.5 leading-relaxed">
                          {node.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function TechStackSection() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [active, setActive] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-surface py-20 md:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[150px] animate-aurora-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-magenta/5 blur-[120px] animate-aurora" style={{ animationDelay: '-5s' }} />
      </div>

      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="inline-block text-xs text-accent font-semibold tracking-wider uppercase mb-3">
            Technology Ecosystem
          </span>
          <h2 className="text-heading-2 font-bold tracking-tight">
            The stack behind the work.
          </h2>
          <p className="text-muted text-sm mt-2 max-w-lg">
            An interconnected ecosystem of modern tools — each chosen to deliver speed, scale, and reliability.
          </p>
        </motion.div>

        <div className="hidden md:block relative">
          <div className="relative" style={{ width: '100%', aspectRatio: `${SVG_W}/${SVG_H}` }}>
            <NetworkGraph
              active={active}
              hoveredNode={hoveredNode}
              setHoveredNode={setHoveredNode}
            />
          </div>

          {hoveredNode && (
            <AnimatePresence>
              <motion.div
                key={hoveredNode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none"
              >
                <div className="glass-strong rounded-xl px-5 py-3 max-w-md mx-auto text-center">
                  <p className="text-xs text-muted leading-relaxed">
                    {getNode(hoveredNode).description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <MobileStack active={active} />
      </div>
    </section>
  )
}
