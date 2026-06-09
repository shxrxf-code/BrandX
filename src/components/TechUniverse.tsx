'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface NodeData {
  id: string
  label: string
  x: number
  y: number
  type: 'hub' | 'tech'
  category: 'frontend' | 'backend' | 'ai' | 'mobile'
}

const nodes: NodeData[] = [
  { id: 'fe', label: 'Frontend', x: 620, y: 270, type: 'hub', category: 'frontend' },
  { id: 'be', label: 'Backend & Infra', x: 480, y: 410, type: 'hub', category: 'backend' },
  { id: 'ai-hub', label: 'AI & Intelligence', x: 340, y: 270, type: 'hub', category: 'ai' },
  { id: 'mob', label: 'Mobile & 3D', x: 480, y: 130, type: 'hub', category: 'mobile' },
  { id: 'nextjs', label: 'Next.js', x: 680, y: 225, type: 'tech', category: 'frontend' },
  { id: 'react', label: 'React', x: 680, y: 315, type: 'tech', category: 'frontend' },
  { id: 'ts', label: 'TypeScript', x: 595, y: 210, type: 'tech', category: 'frontend' },
  { id: 'tw', label: 'Tailwind', x: 595, y: 330, type: 'tech', category: 'frontend' },
  { id: 'node', label: 'Node.js', x: 540, y: 365, type: 'tech', category: 'backend' },
  { id: 'pg', label: 'PostgreSQL', x: 540, y: 455, type: 'tech', category: 'backend' },
  { id: 'dkr', label: 'Docker', x: 450, y: 355, type: 'tech', category: 'backend' },
  { id: 'rds', label: 'Redis', x: 450, y: 465, type: 'tech', category: 'backend' },
  { id: 'py', label: 'Python', x: 280, y: 220, type: 'tech', category: 'ai' },
  { id: 'ai-node', label: 'AI', x: 280, y: 320, type: 'tech', category: 'ai' },
  { id: 'gql', label: 'GraphQL', x: 365, y: 215, type: 'tech', category: 'ai' },
  { id: 'flt', label: 'Flutter', x: 540, y: 85, type: 'tech', category: 'mobile' },
  { id: 'three', label: 'Three.js', x: 540, y: 175, type: 'tech', category: 'mobile' },
  { id: 'gsap-lib', label: 'GSAP', x: 450, y: 75, type: 'tech', category: 'mobile' },
  { id: 'cloud', label: 'Cloud', x: 450, y: 185, type: 'tech', category: 'mobile' },
]

const connections: [string, string][] = [
  ['fe', 'be'], ['be', 'ai-hub'], ['ai-hub', 'mob'], ['mob', 'fe'],
  ['fe', 'ai-hub'], ['be', 'mob'],
  ['fe', 'nextjs'], ['fe', 'react'], ['fe', 'ts'], ['fe', 'tw'],
  ['nextjs', 'react'], ['ts', 'tw'],
  ['be', 'node'], ['be', 'pg'], ['be', 'dkr'], ['be', 'rds'],
  ['node', 'pg'], ['dkr', 'rds'],
  ['ai-hub', 'py'], ['ai-hub', 'ai-node'], ['ai-hub', 'gql'],
  ['py', 'ai-node'],
  ['mob', 'flt'], ['mob', 'three'], ['mob', 'gsap-lib'], ['mob', 'cloud'],
  ['three', 'gsap-lib'],
  ['nextjs', 'node'], ['react', 'three'], ['ts', 'py'],
]

const categoryColor: Record<string, string> = {
  frontend: '#00E5FF',
  backend: '#7C3AED',
  ai: '#00E5FF',
  mobile: '#7C3AED',
}

export default function TechUniverse() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = svgRef.current?.querySelectorAll<SVGLineElement>('.conn-line')
      const groups = svgRef.current?.querySelectorAll('.node-group')

      lines?.forEach((line) => {
        const length = line.getTotalLength()
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        })
      })

      if (groups) {
        gsap.fromTo(groups,
          { opacity: 0, scale: 0.3 },
          {
            opacity: 1, scale: 1,
            duration: 0.7,
            ease: 'back.out(2.5)',
            stagger: 0.04,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 68%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      gsap.to('.hub-ring', {
        scale: 1.2,
        opacity: 0.25,
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      })

      gsap.to('.node-group', {
        y: -5,
        duration: 2.5 + Math.random() * 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.15, from: 'random' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const nodeMap = new Map(nodes.map(n => [n.id, n]))

  return (
    <section ref={sectionRef} className="relative bg-subtle py-24 md:py-32 overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <div className="mb-12 md:mb-16">
          <span className="scene-eyebrow">Technology Stack</span>
          <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">
            Engineered with
            <br />
            <span className="text-accent">precision.</span>
          </h2>
        </div>

        <div className="relative w-full aspect-[4/3] md:aspect-video">
          <svg
            ref={svgRef}
            viewBox="0 0 960 540"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.06} />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity={0} />
              </radialGradient>
              {['fe', 'be', 'ai-hub', 'mob'].map((id) => {
                const nd = nodeMap.get(id)
                if (!nd) return null
                return (
                  <radialGradient key={id} id={`glow-${id}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={categoryColor[nd.category]} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={categoryColor[nd.category]} stopOpacity={0} />
                  </radialGradient>
                )
              })}
            </defs>

            <rect width="960" height="540" fill="url(#bg-glow)" />

            {['fe', 'be', 'ai-hub', 'mob'].map((id) => {
              const nd = nodeMap.get(id)
              if (!nd) return null
              return <circle key={id} cx={nd.x} cy={nd.y} r={80} fill={`url(#glow-${id})`} />
            })}

            {connections.map(([from, to], i) => {
              const f = nodeMap.get(from)
              const t = nodeMap.get(to)
              if (!f || !t) return null
              return (
                <line
                  key={`conn-${i}`}
                  x1={f.x} y1={f.y}
                  x2={t.x} y2={t.y}
                  stroke={categoryColor[f.category]}
                  strokeOpacity={0.18}
                  strokeWidth={1}
                  className="conn-line"
                />
              )
            })}

            {nodes.map((n) => (
              <g key={n.id} className="node-group">
                {n.type === 'hub' ? (
                  <>
                    <circle
                      cx={n.x} cy={n.y} r={22}
                      fill={categoryColor[n.category]}
                      fillOpacity={0.1}
                      className="hub-ring"
                    />
                    <circle
                      cx={n.x} cy={n.y} r={6}
                      fill={categoryColor[n.category]}
                    />
                    <text
                      x={n.x} y={n.y + 32}
                      textAnchor="middle"
                      fill={categoryColor[n.category]}
                      className="text-[7px] md:text-[8px] font-mono tracking-[0.15em] uppercase fill-current"
                    >
                      {n.label}
                    </text>
                  </>
                ) : (
                  <>
                    <circle
                      cx={n.x} cy={n.y} r={3}
                      fill={categoryColor[n.category]}
                    />
                    <text
                      x={n.x + 10} y={n.y + 3.5}
                      textAnchor="start"
                      fill="#a0a0a8"
                      className="text-[6px] md:text-[7px] font-medium fill-current"
                    >
                      {n.label}
                    </text>
                  </>
                )}
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  )
}
